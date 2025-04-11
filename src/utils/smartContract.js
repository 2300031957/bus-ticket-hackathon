import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contractConfig';

// Smart contract ABI (Application Binary Interface)
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "seatNumbers",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "busId",
                "type": "uint256"
            }
        ],
        "name": "purchaseTicket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "ticketIndex",
                "type": "uint256"
            }
        ],
        "name": "cancelTicket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getTicketBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserTickets",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "busId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "seatNumbers",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "isValid",
                        "type": "bool"
                    }
                ],
                "internalType": "struct BusTicket.Ticket[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Contract address (replace with your deployed contract address)
const contractAddress = "YOUR_CONTRACT_ADDRESS";

export const purchaseTicket = async (seatNumbers, busId, price) => {
    try {
        if (!window.ethereum) {
            throw new Error("Please install MetaMask to use this feature");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const priceInWei = ethers.parseEther(price.toString());
        const totalPrice = priceInWei * BigInt(seatNumbers.length);

        const tx = await contract.purchaseTicket(seatNumbers, busId, {
            value: totalPrice
        });

        const receipt = await tx.wait();
        
        if (receipt.status === 1) {
            return true;
        } else {
            throw new Error("Transaction failed");
        }
    } catch (error) {
        console.error("Error purchasing ticket:", error);
        if (error.message.includes("insufficient funds")) {
            throw new Error("Insufficient balance in your wallet");
        } else if (error.message.includes("user denied")) {
            throw new Error("Transaction was rejected");
        } else if (error.message.includes("Seat already taken")) {
            throw new Error("One or more seats are already taken");
        } else {
            throw new Error("Payment failed. Please try again.");
        }
    }
};

export const cancelTicket = async (ticketIndex) => {
    try {
        if (!window.ethereum) {
            throw new Error("Please install MetaMask to use this feature");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const tx = await contract.cancelTicket(ticketIndex);
        const receipt = await tx.wait();

        if (receipt.status === 1) {
            return true;
        } else {
            throw new Error("Transaction failed");
        }
    } catch (error) {
        console.error("Error cancelling ticket:", error);
        if (error.message.includes("Invalid ticket index")) {
            throw new Error("Invalid ticket");
        } else if (error.message.includes("Ticket already cancelled")) {
            throw new Error("Ticket is already cancelled");
        } else {
            throw new Error("Failed to cancel ticket");
        }
    }
};

export const getTicketBalance = async (address) => {
    try {
        if (!window.ethereum) {
            throw new Error("Please install MetaMask to use this feature");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        const balance = await contract.getTicketBalance(address);
        return balance.toString();
    } catch (error) {
        console.error("Error getting ticket balance:", error);
        throw error;
    }
};

export const getUserTickets = async (address) => {
    try {
        if (!window.ethereum) {
            throw new Error("Please install MetaMask to use this feature");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        const tickets = await contract.getUserTickets(address);
        return tickets.map(ticket => ({
            busId: ticket.busId.toString(),
            seatNumbers: ticket.seatNumbers.map(num => num.toString()),
            price: ethers.formatEther(ticket.price),
            isValid: ticket.isValid
        }));
    } catch (error) {
        console.error("Error getting user tickets:", error);
        throw error;
    }
}; 