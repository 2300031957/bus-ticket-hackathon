import { ethers } from 'ethers';
import BusTicketABI from '../contracts/BusTicket.json';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export const ticketService = {
    async mintTicket(signer, busId, seatNumber, price, departureTime, fromCity, toCity) {
        try {
            if (!signer) {
                throw new Error('No signer available');
            }

            const contract = new ethers.Contract(CONTRACT_ADDRESS, BusTicketABI.abi, signer);
            const tx = await contract.mintTicket(
                await signer.getAddress(),
                busId,
                seatNumber,
                ethers.parseEther(price.toString()),
                departureTime,
                fromCity,
                toCity
            );
            await tx.wait();
            return tx;
        } catch (error) {
            console.error('Error minting ticket:', error);
            if (error.message.includes('insufficient funds')) {
                throw new Error('Insufficient balance in your wallet');
            } else if (error.message.includes('user denied')) {
                throw new Error('Transaction was rejected');
            } else if (error.message.includes('Seat already taken')) {
                throw new Error('One or more seats are already taken');
            } else {
                throw new Error('Failed to mint ticket. Please try again.');
            }
        }
    },

    async getTicket(provider, ticketId) {
        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, BusTicketABI.abi, provider);
            return await contract.getTicket(ticketId);
        } catch (error) {
            console.error('Error getting ticket:', error);
            throw error;
        }
    },

    async useTicket(signer, ticketId) {
        try {
            if (!signer) {
                throw new Error('No signer available');
            }

            const contract = new ethers.Contract(CONTRACT_ADDRESS, BusTicketABI.abi, signer);
            const tx = await contract.useTicket(ticketId);
            await tx.wait();
            return tx;
        } catch (error) {
            console.error('Error using ticket:', error);
            if (error.message.includes('Invalid ticket')) {
                throw new Error('Invalid ticket ID');
            } else if (error.message.includes('Ticket already used')) {
                throw new Error('Ticket has already been used');
            } else {
                throw new Error('Failed to use ticket. Please try again.');
            }
        }
    },

    async registerBus(signer, busId) {
        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, BusTicketABI.abi, signer);
            const tx = await contract.registerBus(busId);
            await tx.wait();
            return tx;
        } catch (error) {
            console.error('Error registering bus:', error);
            throw error;
        }
    }
}; 