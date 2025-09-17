import { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

export function Profile() {
  const { account, profileName, updateProfileName } = useWeb3();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(profileName || '');

  useEffect(() => {
    if (profileName) {
      setTempName(profileName);
    }
  }, [profileName]);

  const handleSave = () => {
    updateProfileName(tempName);
    setIsEditing(false);
  };

  if (!account) {
    return (
      <div className="card">
        <h2>My Profile</h2>
        <p>Please connect your wallet to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>My Profile</h2>
      <p className="profile-address">Wallet Address: <span>{account}</span></p>
      
      {isEditing ? (
        <div className="profile-edit">
          <input 
            type="text" 
            value={tempName}
            onChange={(e) => setTempName(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
          <button className="secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="profile-view">
          <p className="profile-name">Display Name: <strong>{profileName}</strong></p>
          <button onClick={() => setIsEditing(true)}>Edit Name</button>
        </div>
      )}

      <div className="profile-reputation">
        <h3>My Reputation</h3>
        <p style={{color: 'var(--text-color-secondary)'}}>
            Your reputation NFTs will be displayed here soon.
        </p>
      </div>
    </div>
  );
}