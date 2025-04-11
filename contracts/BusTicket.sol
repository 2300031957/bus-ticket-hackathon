// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BusTicket {
    struct Ticket {
        uint256 busId;
        uint256[] seatNumbers;
        uint256 price;
        address owner;
        bool isValid;
    }

    mapping(address => Ticket[]) public userTickets;
    mapping(uint256 => mapping(uint256 => bool)) public seatAvailability;
    address public owner;
    uint256 public ticketCounter;

    event TicketPurchased(address indexed buyer, uint256 ticketId, uint256 busId, uint256[] seatNumbers);
    event TicketCancelled(address indexed owner, uint256 ticketId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function purchaseTicket(uint256[] memory seatNumbers, uint256 busId) external payable {
        require(seatNumbers.length > 0, "Must select at least one seat");
        require(msg.value > 0, "Must send ETH to purchase ticket");

        // Check seat availability
        for (uint256 i = 0; i < seatNumbers.length; i++) {
            require(!seatAvailability[busId][seatNumbers[i]], "Seat already taken");
            seatAvailability[busId][seatNumbers[i]] = true;
        }

        // Create new ticket
        Ticket memory newTicket = Ticket({
            busId: busId,
            seatNumbers: seatNumbers,
            price: msg.value,
            owner: msg.sender,
            isValid: true
        });

        userTickets[msg.sender].push(newTicket);
        ticketCounter++;

        emit TicketPurchased(msg.sender, ticketCounter, busId, seatNumbers);
    }

    function cancelTicket(uint256 ticketIndex) external {
        require(ticketIndex < userTickets[msg.sender].length, "Invalid ticket index");
        Ticket storage ticket = userTickets[msg.sender][ticketIndex];
        require(ticket.isValid, "Ticket already cancelled");

        // Mark seats as available
        for (uint256 i = 0; i < ticket.seatNumbers.length; i++) {
            seatAvailability[ticket.busId][ticket.seatNumbers[i]] = false;
        }

        // Refund the ticket price
        payable(msg.sender).transfer(ticket.price);

        // Mark ticket as invalid
        ticket.isValid = false;

        emit TicketCancelled(msg.sender, ticketIndex);
    }

    function getTicketBalance(address user) external view returns (uint256) {
        uint256 validTickets = 0;
        for (uint256 i = 0; i < userTickets[user].length; i++) {
            if (userTickets[user][i].isValid) {
                validTickets++;
            }
        }
        return validTickets;
    }

    function getUserTickets(address user) external view returns (Ticket[] memory) {
        return userTickets[user];
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
} 