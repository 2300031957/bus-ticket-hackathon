import { toast } from 'react-hot-toast';

export const upiService = {
    async validateUPI(upiId) {
        try {
            // Basic UPI ID format validation
            if (!this.isValidUPIFormat(upiId)) {
                throw new Error('Invalid UPI ID format');
            }

            // Simulate API call to validate UPI ID and get account holder name
            // In a real implementation, you would call the NPCI UPI API here
            const response = await this.simulateUPIValidation(upiId);
            
            return {
                isValid: true,
                accountHolderName: response.accountHolderName
            };
        } catch (error) {
            console.error('UPI validation error:', error);
            throw error;
        }
    },

    isValidUPIFormat(upiId) {
        // UPI ID format: username@bankname or username@upi
        const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/;
        return upiRegex.test(upiId);
    },

    async simulateUPIValidation(upiId) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate different responses based on UPI ID
        const testAccounts = {
            'test@upi': { accountHolderName: 'Test User' },
            'demo@upi': { accountHolderName: 'Demo User' },
            'user@upi': { accountHolderName: 'John Doe' }
        };

        if (testAccounts[upiId]) {
            return testAccounts[upiId];
        }

        // For any other UPI ID, simulate a random name
        const names = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Neha Gupta', 'Vikram Singh'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        return {
            accountHolderName: randomName
        };
    }
}; 