import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contractConfig";
import { toast } from 'react-hot-toast';

export const Web3Context = createContext();

export const useWeb3 = () => {
    const context = useContext(Web3Context);
    if (!context) {
        throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
};

export const Web3Provider = ({ children }) => {
    const [wallet, setWallet] = useState({
        connected: false,
        address: '',
        signer: null,
        balance: '0'
    });

    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [network, setNetwork] = useState(null);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    useEffect(() => {
        checkIfWalletIsConnected();
        setupEventListeners();
        checkMetaMaskInstallation();
    }, []);

    const checkMetaMaskInstallation = () => {
        setIsMetaMaskInstalled(!!window.ethereum);
    };

    const checkIfWalletIsConnected = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    await connectWallet();
                }
            } catch (err) {
                console.error('Error checking wallet connection:', err);
                toast.error('Failed to check wallet connection');
            }
        }
    };

    const setupEventListeners = () => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
            window.ethereum.on('disconnect', handleDisconnect);
        }
    };

    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            setWallet({
                connected: false,
                address: '',
                signer: null,
                balance: '0'
            });
            setContract(null);
            toast.info('Wallet disconnected');
        } else {
            connectWallet();
        }
    };

    const handleChainChanged = () => {
        window.location.reload();
    };

    const handleDisconnect = () => {
        setWallet({
            connected: false,
            address: '',
            signer: null,
            balance: '0'
        });
        setContract(null);
        toast.info('Wallet disconnected');
    };

    const connectWallet = async () => {
        if (!window.ethereum) {
            toast.error('Please install MetaMask!');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            const network = await provider.getNetwork();

            const busTicketContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );

            setWallet({
                connected: true,
                address,
                signer,
                balance: ethers.formatEther(balance)
            });
            setContract(busTicketContract);
            setNetwork(network.name);

            toast.success('Wallet connected successfully!');
        } catch (err) {
            console.error('Wallet connection failed:', err);
            toast.error(err.message || 'Failed to connect wallet');
        } finally {
            setLoading(false);
        }
    };

    const purchaseTicket = async (numberOfTickets, ticketPrice) => {
        if (!contract || !wallet.connected) {
            toast.error('Please connect your wallet first');
            return false;
        }

        try {
            setLoading(true);
            setError(null);
            
            const totalPrice = ethers.parseEther((ticketPrice * numberOfTickets).toString());
            
            const tx = await contract.buyTicket({
                value: totalPrice
            });
            
            await tx.wait();
            toast.success('Ticket purchase successful!');
            return true;
        } catch (err) {
            console.error('Purchase failed:', err);
            toast.error(err.message || 'Failed to purchase ticket');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getTicketBalance = async () => {
        if (!contract || !wallet.connected) {
            toast.error('Please connect your wallet first');
            return 0;
        }

        try {
            setLoading(true);
            setError(null);
            
            const balance = await contract.getTicketBalance(wallet.address);
            return balance.toNumber();
        } catch (err) {
            console.error('Failed to get ticket balance:', err);
            toast.error(err.message || 'Failed to get ticket balance');
            return 0;
        } finally {
            setLoading(false);
        }
    };

    return (
        <Web3Context.Provider 
            value={{ 
                wallet, 
                connectWallet, 
                purchaseTicket,
                getTicketBalance,
                loading,
                error,
                network,
                isMetaMaskInstalled
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export default Web3Provider;
