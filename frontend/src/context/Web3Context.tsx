import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  account: string | null;
  profileName: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  updateProfileName: (newName: string) => void;
}

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  account: null,
  profileName: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  updateProfileName: () => {},
});

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);

  // NYTT: Funktion för att ladda profilnamn från localStorage
  const loadProfileName = useCallback((address: string) => {
    const savedProfile = localStorage.getItem(`profile_${address}`);
    if (savedProfile) {
      setProfileName(JSON.parse(savedProfile).name);
    } else {
      setProfileName('Anonymous Neighbor'); // Sätt ett standardnamn om inget finns
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const userSigner = await browserProvider.getSigner();
        const userAccount = await userSigner.getAddress();
        
        setProvider(browserProvider);
        setSigner(userSigner);
        setAccount(userAccount);
        loadProfileName(userAccount);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }, [loadProfileName]);

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setProfileName(null);
  };
  
  const updateProfileName = (newName: string) => {
    if (account) {
        const profile = { name: newName };
        localStorage.setItem(`profile_${account}`, JSON.stringify(profile));
        setProfileName(newName);
    }
  }

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        connectWallet(); 
      } else {
        disconnectWallet();
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [connectWallet]);

  return (
    <Web3Context.Provider value={{ provider, signer, account, profileName, connectWallet, disconnectWallet, updateProfileName }}>
      {children}
    </Web3Context.Provider>
  );
};