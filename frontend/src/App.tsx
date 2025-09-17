import { Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ServiceExchange } from './pages/ServiceExchange';
import { CreateRequest } from './pages/CreateRequest';
import { Profile } from './pages/Profile';
import { CommunityPosts } from './pages/CommunityPosts';

function App() {
  return (
    <Web3Provider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<ServiceExchange />} />
          <Route path="posts" element={<CommunityPosts />} />
          <Route path="create" element={<CreateRequest />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Web3Provider>
  );
}

export default App;