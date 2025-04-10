// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BusTicket {
    address public owner;
    uint256 public ticketPrice;
    uint256 public totalTicketsSold;
    uint256 public constant MAX_TICKETS_PER_TRANSACTION = 10;
    
    struct Ticket {
        uint256 ticketId;
        address owner;
        uint256 purchaseTime;
        bool isValid;
    }
    
    mapping(address => Ticket[]) public userTickets;
    mapping(uint256 => Ticket) public tickets;
    mapping(address => bool) public hasPaid;
    
    event TicketPurchased(address indexed buyer, uint256 amount, uint256[] ticketIds);
    event PaymentReceived(address indexed payer, uint256 amount);
    event TicketRefunded(address indexed owner, uint256 ticketId);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor(uint256 _ticketPrice) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
    }
    
    function purchaseTicket(uint256 numberOfTickets) external payable {
        require(numberOfTickets > 0 && numberOfTickets <= MAX_TICKETS_PER_TRANSACTION, "Invalid number of tickets");
        require(msg.value >= ticketPrice * numberOfTickets, "Insufficient payment");
        
        uint256[] memory ticketIds = new uint256[](numberOfTickets);
        
        for(uint256 i = 0; i < numberOfTickets; i++) {
            uint256 ticketId = totalTicketsSold + i + 1;
            Ticket memory newTicket = Ticket({
                ticketId: ticketId,
                owner: msg.sender,
                purchaseTime: block.timestamp,
                isValid: true
            });
            
            tickets[ticketId] = newTicket;
            userTickets[msg.sender].push(newTicket);
            ticketIds[i] = ticketId;
        }
        
        totalTicketsSold += numberOfTickets;
        hasPaid[msg.sender] = true;
        
        emit TicketPurchased(msg.sender, numberOfTickets, ticketIds);
        emit PaymentReceived(msg.sender, msg.value);
    }
    
    function getUserTickets(address user) external view returns (Ticket[] memory) {
        return userTickets[user];
    }
    
    function getTicketDetails(uint256 ticketId) external view returns (Ticket memory) {
        return tickets[ticketId];
    }
    
    function refundTicket(uint256 ticketId) external {
        require(tickets[ticketId].owner == msg.sender, "Not the ticket owner");
        require(tickets[ticketId].isValid, "Ticket already refunded");
        require(block.timestamp - tickets[ticketId].purchaseTime <= 24 hours, "Refund period expired");
        
        tickets[ticketId].isValid = false;
        payable(msg.sender).transfer(ticketPrice);
        
        emit TicketRefunded(msg.sender, ticketId);
    }
    
    function setTicketPrice(uint256 newPrice) external onlyOwner {
        ticketPrice = newPrice;
    }
    
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
    
    receive() external payable {}
} 