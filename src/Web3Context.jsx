import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

// Create the context
const Web3Context = createContext();

// Create a provider component
export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [balance, setBalance] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // Initialize provider
    useEffect(() => {
        const initializeProvider = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    setProvider(provider);

                    // Check if already connected
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        const signer = await provider.getSigner();
                        const network = await provider.getNetwork();
                        setSigner(signer);
                        setAccount(accounts[0]);
                        setChainId(network.chainId);
                        setIsConnected(true);
                        await updateBalance(accounts[0]);
                    }

                    // Listen for account changes
                    window.ethereum.on('accountsChanged', handleAccountsChanged);
                    // Listen for chain changes
                    window.ethereum.on('chainChanged', handleChainChanged);
                    // Listen for disconnect
                    window.ethereum.on('disconnect', handleDisconnect);

                    return () => {
                        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                        window.ethereum.removeListener('chainChanged', handleChainChanged);
                        window.ethereum.removeListener('disconnect', handleDisconnect);
                    };
                } catch (err) {
                    console.error('Error initializing provider:', err);
                    setError(err.message);
                }
            }
        };

        initializeProvider();
    }, []);

    const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
            setAccount(null);
            setIsConnected(false);
            toast.error('Please connect your wallet');
        } else {
            try {
                const signer = await provider.getSigner();
                setSigner(signer);
                setAccount(accounts[0]);
                setIsConnected(true);
                await updateBalance(accounts[0]);
                toast.success('Wallet connected successfully');
            } catch (err) {
                console.error('Error handling account change:', err);
                setError(err.message);
                toast.error('Failed to connect wallet');
            }
        }
    };

    const handleChainChanged = (chainId) => {
        setChainId(chainId);
        window.location.reload();
    };

    const handleDisconnect = () => {
        setAccount(null);
        setSigner(null);
        setIsConnected(false);
        toast.error('Wallet disconnected');
    };

    const updateBalance = async (address) => {
        if (provider && address) {
            try {
                const balance = await provider.getBalance(address);
                setBalance(ethers.formatEther(balance));
            } catch (err) {
                console.error('Error fetching balance:', err);
                setError(err.message);
            }
        }
    };

    const connectWallet = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed');
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();

            setProvider(provider);
            setSigner(signer);
            setAccount(accounts[0]);
            setChainId(network.chainId);
            setIsConnected(true);
            await updateBalance(accounts[0]);

            toast.success('Wallet connected successfully');
        } catch (err) {
            console.error('Error connecting wallet:', err);
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
        setSigner(null);
        setBalance(null);
        setIsConnected(false);
        toast.success('Wallet disconnected');
    };

    const sendTransaction = async (to, value) => {
        if (!signer) {
            throw new Error('No signer available');
        }

        try {
            const tx = await signer.sendTransaction({
                to,
                value: ethers.parseEther(value)
            });
            await tx.wait();
            return tx;
        } catch (err) {
            console.error('Error sending transaction:', err);
            throw err;
        }
    };

    const value = {
        account,
        provider,
        signer,
        loading,
        error,
        balance,
        chainId,
        isConnected,
        connectWallet,
        disconnectWallet,
        sendTransaction
    };

    return (
        <Web3Context.Provider value={value}>
            {children}
        </Web3Context.Provider>
    );
};

// Create a custom hook to use the context
export const useWeb3 = () => {
    const context = useContext(Web3Context);
    if (context === undefined) {
        throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
};

// Export the context and provider
export default Web3Context;
