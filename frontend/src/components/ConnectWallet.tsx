import { useWeb3 } from '../hooks/useWeb3';

export function ConnectWallet() {
  const { account, connectWallet } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <button className="wallet-button" onClick={connectWallet}>
      {account ? formatAddress(account) : 'Connect Wallet'}
    </button>
  );
}