import { useEffect, useState } from 'react';
import './App.css';
import Feed from './pages/Feed';
import Navbar from './components/Navbar';
import axios from 'axios';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import OnBoarding from './pages/OnBoarding';
import PublicProfile from './pages/PublicProfile';
import Connections from './pages/Connections';
import CrushesPage from './pages/CrushesPage';

function App() {
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <>
      {user ? (
        user.isProfileComplete ? (
          <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
            <Navbar
              user={user}
              setUser={setUser}
              onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            />

            <div className="flex flex-1 min-h-0 relative">
              <Sidebar
                mobileOpen={mobileMenuOpen}
                onCloseMobile={() => setMobileMenuOpen(false)}
              />

              <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 w-full">
                <Routes>
                  <Route path="/" element={<Feed userId={user._id} />} />
                  <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/matches" element={<Connections />} />
                  <Route path="/messages" element={<Messages user={user} />} />
                  <Route path="/profile/:id" element={<PublicProfile currentUserId={user?._id || ""} />} />
                  <Route path="/messages/:receiverId" element={<Messages user={user} />} />
                  <Route path="/crushes" element={<CrushesPage />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <OnBoarding user={user} setUser={setUser} />
        )
      ) : (
        <LandingPage />
      )}
    </>
  );
}

export default App;

