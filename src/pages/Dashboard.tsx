import { Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import DashboardHome from '@/components/DashboardHome';
import ComplaintsView from '@/components/ComplaintsView';
import AnalyticsView from '@/components/AnalyticsView';
import ProfileView from '@/components/ProfileView';
import NotificationsView from '@/components/NotificationsView';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Sidebar />
      
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/complaints" element={<ComplaintsView />} />
            <Route path="/analytics" element={<AnalyticsView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/notifications" element={<NotificationsView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;