import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [wallet, setWallet] = useState({
    connected: false,
    address: '',
    signer: null
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWallet({
        connected: true,
        address,
        signer
      });

      console.log('Connected:', address);
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  return (
    <Web3Context.Provider value={{ wallet, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
