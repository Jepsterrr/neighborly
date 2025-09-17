import { ethers } from 'ethers';

// Definierar typen för ett service-objekt
interface Service {
  id: bigint;
  description: string;
  reward: bigint;
  requester: string;
  provider: string;
  status: number;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const rewardAmount = ethers.formatUnits(service.reward, 18);
  const statusText = ['Open', 'Accepted', 'Completed', 'Cancelled'][service.status];

  const handleAccept = () => {
    // TODO: Implementera logik för att acceptera en tjänst
    alert(`TODO: Accept service with ID ${service.id}`);
  };

  return (
    <div className="card service-card">
      <div>
        <p><strong>{service.description}</strong></p>
        <p>Requester: {`${service.requester.substring(0, 6)}...`}</p>
        <p>Status: {statusText}</p>
      </div>
      <div className="service-card-footer">
        <span className="service-card-reward">{rewardAmount} NLYT</span>
        {service.status === 0 && ( // Visa bara om status är 'Open'
          <button onClick={handleAccept}>Accept</button>
        )}
      </div>
    </div>
  );
}