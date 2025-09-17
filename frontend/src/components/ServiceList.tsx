import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../hooks/useWeb3';
import { SERVICE_EXCHANGE_ADDRESS, SERVICE_EXCHANGE_ABI } from '../contracts/config';
import { ServiceCard } from './ServiceCard';

interface Service {
  id: bigint;
  description: string;
  reward: bigint;
  requester: string;
  provider: string;
  status: number;
}

export function ServiceList() {
  const { provider } = useWeb3();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      if (!provider) return;

      setIsLoading(true);
      setError('');
      try {
        if (!SERVICE_EXCHANGE_ADDRESS) {
          throw new Error('SERVICE_EXCHANGE_ADDRESS is not defined');
        }
        const contract = new ethers.Contract(SERVICE_EXCHANGE_ADDRESS, SERVICE_EXCHANGE_ABI, provider);
        // I vårt kontrakt finns ingen funktion för att få totala antalet, så vi måste hämta det från `nextServiceId`
        const nextId = await contract.nextServiceId(); 
        const serviceCount = Number(nextId);
        
        const fetchedServices: Service[] = [];
        // Hämta varje tjänst individuellt. För en stor app kan detta optimeras.
        for (let i = 0; i < serviceCount; i++) {
          const serviceData = await contract.services(i);
          // Vi filtrerar bort avbrutna/slutförda för att bara visa relevanta
          if (serviceData.status < 2) { // 0=Open, 1=Accepted
             fetchedServices.push({
                id: serviceData.id,
                description: serviceData.description,
                reward: serviceData.reward,
                requester: serviceData.requester,
                provider: serviceData.provider,
                status: Number(serviceData.status)
            });
          }
        }
        setServices(fetchedServices.reverse()); // Visa de nyaste först
      } catch (e) {
        console.error("Failed to fetch services:", e);
        setError('Could not load services from the blockchain.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [provider]);

  if (isLoading) {
    return <p>Loading services from the blockchain...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Available Services</h2>
      {services.length === 0 ? (
        <p>No open service requests right now. Why not create one?</p>
      ) : (
        <div className="service-list">
          {services.map((service) => (
            <ServiceCard key={service.id.toString()} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}