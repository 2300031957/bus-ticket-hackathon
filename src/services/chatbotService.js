import { ethers } from 'ethers';
import { ticketService } from './ticketService';
import { upiService } from './upiService';

export const chatbotService = {
    async getResponse(userInput, context = {}) {
        const input = userInput.toLowerCase();
        
        // Enhanced knowledge base
        const knowledgeBase = {
            // Project Overview
            'project': {
                description: 'This is a modern bus ticket booking system with blockchain integration. Key features include:\n' +
                    '- NFT-based ticket system\n' +
                    '- Multiple payment methods (UPI, Card, Ethereum)\n' +
                    '- Real-time seat booking\n' +
                    '- Smart contract integration\n' +
                    '- Web3 wallet support'
            },

            // Blockchain Features
            'blockchain': {
                description: 'The system uses blockchain technology for:\n' +
                    '- NFT ticket minting\n' +
                    '- Secure transactions\n' +
                    '- Immutable ticket records\n' +
                    '- Smart contract automation'
            },

            // Payment Methods
            'payment': {
                description: 'We support multiple payment methods:\n' +
                    '1. Ethereum (Web3):\n' +
                    '   - Connect your wallet\n' +
                    '   - Pay in ETH\n' +
                    '   - Receive NFT ticket\n\n' +
                    '2. UPI:\n' +
                    '   - Support for PhonePe, Google Pay, Paytm\n' +
                    '   - Instant payment verification\n' +
                    '   - Secure transactions\n\n' +
                    '3. Cards:\n' +
                    '   - Credit/Debit card support\n' +
                    '   - Secure payment processing\n' +
                    '   - Instant confirmation'
            },

            // Smart Contract
            'contract': {
                description: 'Our smart contract features:\n' +
                    '- Ticket minting\n' +
                    '- Price management\n' +
                    '- Seat allocation\n' +
                    '- Ticket validation\n' +
                    '- Refund processing'
            },

            // Technical Details
            'technical': {
                description: 'Technical stack:\n' +
                    '- Frontend: React with Tailwind CSS\n' +
                    '- Blockchain: Ethereum (Sepolia Testnet)\n' +
                    '- Smart Contracts: Solidity\n' +
                    '- Web3: ethers.js\n' +
                    '- Payment Integration: UPI, Cards, Web3'
            },

            // Booking Process
            'booking': {
                description: 'Booking process:\n' +
                    '1. Select route and date\n' +
                    '2. Choose bus and seats\n' +
                    '3. Enter passenger details\n' +
                    '4. Select payment method\n' +
                    '5. Complete payment\n' +
                    '6. Receive ticket (NFT for ETH payments)'
            },

            // Ticket Management
            'ticket': {
                description: 'Ticket features:\n' +
                    '- Digital ticket storage\n' +
                    '- NFT tickets for ETH payments\n' +
                    '- Easy cancellation\n' +
                    '- Transferable tickets\n' +
                    '- QR code validation'
            },

            // Security
            'security': {
                description: 'Security features:\n' +
                    '- Web3 wallet integration\n' +
                    '- Secure payment processing\n' +
                    '- Smart contract security\n' +
                    '- Data encryption\n' +
                    '- Regular security audits'
            }
        };

        // Context-aware responses
        if (context.currentPage === 'checkout') {
            if (input.includes('payment') || input.includes('pay')) {
                return this.getPaymentDetails(input);
            }
            if (input.includes('upi')) {
                return this.getUPIDetails(input);
            }
            if (input.includes('ethereum') || input.includes('eth') || input.includes('wallet')) {
                return this.getEthereumDetails(input);
            }
        }

        // General responses
        for (const [key, value] of Object.entries(knowledgeBase)) {
            if (input.includes(key)) {
                return value.description;
            }
        }

        // Default response with suggestions
        return 'I can help you with:\n' +
            '- Project overview\n' +
            '- Blockchain features\n' +
            '- Payment methods\n' +
            '- Smart contract details\n' +
            '- Technical stack\n' +
            '- Booking process\n' +
            '- Ticket management\n' +
            '- Security features\n\n' +
            'What would you like to know more about?';
    },

    getPaymentDetails(input) {
        if (input.includes('upi')) {
            return 'For UPI payments:\n' +
                '1. Enter your UPI ID\n' +
                '2. Select your preferred UPI app\n' +
                '3. Complete the payment on your UPI app\n' +
                '4. You\'ll receive a confirmation once payment is successful\n\n' +
                'Supported apps:\n' +
                '- PhonePe\n' +
                '- Google Pay\n' +
                '- Paytm';
        } else if (input.includes('ethereum') || input.includes('eth')) {
            return 'For Ethereum payments:\n' +
                '1. Connect your Web3 wallet\n' +
                '2. Ensure you have enough ETH\n' +
                '3. Confirm the transaction\n' +
                '4. Wait for blockchain confirmation\n' +
                '5. You\'ll receive your NFT ticket';
        } else if (input.includes('card')) {
            return 'For card payments:\n' +
                '1. Enter card details\n' +
                '2. Provide CVV\n' +
                '3. Complete 3D Secure if required\n' +
                '4. Receive instant confirmation';
        }
        return 'We support multiple payment methods:\n' +
            '- UPI (PhonePe, Google Pay, Paytm)\n' +
            '- Credit/Debit Cards\n' +
            '- Ethereum (Web3)\n\n' +
            'Which payment method would you like to know more about?';
    },

    getUPIDetails(input) {
        return 'UPI Payment Details:\n' +
            '1. Enter your UPI ID (format: username@bankname)\n' +
            '2. The system will validate your UPI ID\n' +
            '3. Select your preferred UPI app\n' +
            '4. Complete the payment on your app\n' +
            '5. Receive instant confirmation\n\n' +
            'Benefits:\n' +
            '- Instant payment\n' +
            '- Secure transactions\n' +
            '- Multiple app support\n' +
            '- Easy refund process';
    },

    getEthereumDetails(input) {
        return 'Ethereum Payment Details:\n' +
            '1. Connect your Web3 wallet (MetaMask)\n' +
            '2. Ensure you\'re on Sepolia Testnet\n' +
            '3. Have sufficient ETH balance\n' +
            '4. Confirm the transaction\n' +
            '5. Receive NFT ticket\n\n' +
            'Benefits:\n' +
            '- NFT-based tickets\n' +
            '- Secure blockchain transactions\n' +
            '- Transferable tickets\n' +
            '- Immutable records';
    }
}; 