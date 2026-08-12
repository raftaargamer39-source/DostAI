import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AiChatPage from './pages/AiChatPage';
import DiscoverPage from './pages/DiscoverPage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import MyBookingsPage from './pages/MyBookingsPage';
import OffersPage from './pages/OffersPage';
import UserProfilePage from './pages/UserProfilePage';
import BusinessDashboardPage from './pages/BusinessDashboardPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/ai-chat" element={<AiChatPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/business/:id" element={<BusinessDetailPage />} />
                <Route path="/bookings" element={<MyBookingsPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/business-dashboard" element={<BusinessDashboardPage />} />
              </Routes>
            </main>
            <MobileNav />
          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
