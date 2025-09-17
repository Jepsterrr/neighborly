import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../hooks/useWeb3';
import { SERVICE_EXCHANGE_ADDRESS, SERVICE_EXCHANGE_ABI } from '../contracts/config';

export function ServiceRequestForm() {
  const { signer, account } = useWeb3();
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer || !description || !reward || !SERVICE_EXCHANGE_ADDRESS) {
      setMessage('Please fill in all fields and connect your wallet.');
      return;
    }

    setIsLoading(true);
    setMessage('Preparing transaction...');

    try {
      const contract = new ethers.Contract(SERVICE_EXCHANGE_ADDRESS, SERVICE_EXCHANGE_ABI, signer);
      const rewardAmount = ethers.parseUnits(reward, 18); // Vårt token har 18 decimaler
      
      setMessage('Please approve the transaction in your wallet...');
      const tx = await contract.createServiceRequest(description, rewardAmount);
      
      setMessage('Transaction sent! Waiting for confirmation...');
      await tx.wait();

      setMessage('Service request created successfully! 🎉');
      setDescription('');
      setReward('');
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. See console for details.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(''), 5000); // Rensa meddelande efter 5s
    }
  };

  if (!account) {
    return (
      <div className="card form-card">
        <p>Please connect your wallet to create a service request.</p>
      </div>
    );
  }

  return (
    <div className="card form-card">
      <h2>Create a New Service Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What do you need help with? (e.g., 'Borrow a drill')"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Reward in NLYT (e.g., 10)"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Create Request'}
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}