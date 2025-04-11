// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BusTicket is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Ticket {
        uint256 busId;
        uint256 seatNumber;
        uint256 price;
        uint256 departureTime;
        string fromCity;
        string toCity;
        bool isUsed;
    }

    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => bool) public busExists;
    mapping(uint256 => mapping(uint256 => bool)) public seatTaken;

    event TicketMinted(
        uint256 indexed ticketId,
        address indexed owner,
        uint256 busId,
        uint256 seatNumber
    );
    event TicketUsed(uint256 indexed ticketId);
    event TicketTransferred(uint256 indexed ticketId, address from, address to);

    constructor() ERC721("BusTicket", "BTK") {}

    function mintTicket(
        address to,
        uint256 busId,
        uint256 seatNumber,
        uint256 price,
        uint256 departureTime,
        string memory fromCity,
        string memory toCity
    ) external onlyOwner returns (uint256) {
        require(!seatTaken[busId][seatNumber], "Seat already taken");
        require(busExists[busId], "Bus does not exist");

        _tokenIds.increment();
        uint256 newTicketId = _tokenIds.current();

        _mint(to, newTicketId);
        
        tickets[newTicketId] = Ticket({
            busId: busId,
            seatNumber: seatNumber,
            price: price,
            departureTime: departureTime,
            fromCity: fromCity,
            toCity: toCity,
            isUsed: false
        });

        seatTaken[busId][seatNumber] = true;

        emit TicketMinted(newTicketId, to, busId, seatNumber);
        return newTicketId;
    }

    function useTicket(uint256 ticketId) external {
        require(_isApprovedOrOwner(_msgSender(), ticketId), "Not owner or approved");
        require(!tickets[ticketId].isUsed, "Ticket already used");
        
        tickets[ticketId].isUsed = true;
        emit TicketUsed(ticketId);
    }

    function registerBus(uint256 busId) external onlyOwner {
        busExists[busId] = true;
    }

    function getTicket(uint256 ticketId) external view returns (Ticket memory) {
        require(_exists(ticketId), "Ticket does not exist");
        return tickets[ticketId];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);
        require(!tickets[tokenId].isUsed, "Ticket already used");
        emit TicketTransferred(tokenId, from, to);
    }
} 