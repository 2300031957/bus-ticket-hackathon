import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contractConfig";

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
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

  useEffect(() => {
    checkIfWalletIsConnected();
    setupEventListeners();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connectWallet();
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
        setError('Failed to check wallet connection');
      }
    }
  };

  const setupEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
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
    } else {
      connectWallet();
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask!');
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

      console.log('Connected:', address);
    } catch (err) {
      console.error('Wallet connection failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const purchaseTicket = async (numberOfTickets, ticketPrice) => {
    if (!contract || !wallet.connected) {
      setError('Please connect your wallet first');
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
      console.log('Ticket purchase successful!');
      return true;
    } catch (err) {
      console.error('Purchase failed:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getTicketBalance = async () => {
    if (!contract || !wallet.connected) {
      setError('Please connect your wallet first');
      return 0;
    }

    try {
      setLoading(true);
      setError(null);
      
      const balance = await contract.getTicketBalance(wallet.address);
      return balance.toNumber();
    } catch (err) {
      console.error('Failed to get ticket balance:', err);
      setError(err.message);
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
        network
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
