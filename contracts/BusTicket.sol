// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BusTicket {
    address public owner;
    uint256 public ticketPrice;
    mapping(address => uint256) public tickets;

    event TicketPurchased(address buyer, uint256 amount);
    event PriceChanged(uint256 newPrice);

    constructor(uint256 _ticketPrice) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
    }

    function buyTicket() public payable {
        require(msg.value >= ticketPrice, "Insufficient payment");
        tickets[msg.sender] += 1;
        emit TicketPurchased(msg.sender, 1);
    }

    function setTicketPrice(uint256 _newPrice) public {
        require(msg.sender == owner, "Only owner can change price");
        ticketPrice = _newPrice;
        emit PriceChanged(_newPrice);
    }

    function getTicketBalance(address _user) public view returns (uint256) {
        return tickets[_user];
    }
} 