import { ServiceList } from '../components/ServiceList';

export function ServiceExchange() {
  return (
    <div>
      <div className="page-header">
          <h2>Service Exchange</h2>
          <p>Here you can find active requests for help or services.</p>
      </div>
      <ServiceList />
    </div>
  );
}