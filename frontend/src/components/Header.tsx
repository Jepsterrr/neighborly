import { useWeb3 } from '../hooks/useWeb3';
import { ConnectWallet } from './ConnectWallet';

export function Header() {
  const { account, profileName } = useWeb3();

  return (
    <header>
      <div className="container">
        {account ? (
          <h1>Welcome, {profileName}!</h1>
        ) : (
          <h1>🤝 Neighborly App</h1>
        )}
        <ConnectWallet />
      </div>
    </header>
  );
}