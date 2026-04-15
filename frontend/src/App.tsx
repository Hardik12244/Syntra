import { useEffect, useState } from 'react'
import './App.css'
import Feed from './pages/Feed'
import Navbar from './components/Navbar';
import axios from 'axios';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Matches from "./pages/Matches";
import Messages from "./pages/Messages";
import Settings from "./pages/Setting";

function App() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    axios.get("http://localhost:3000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUser(res.data);
    });

  }, []);

  return (
    <>
      
      {user ? (
        <div className="h-screen flex flex-col overflow-hidden">
          <Navbar user={user} setUser={setUser} />

          <div className="flex flex-1 min-h-0">
            
            <Sidebar />

            <div className="flex-1 overflow-y-auto min-h-0">
              <Routes>
                <Route path="/" element={<Feed userId={user._id} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>

          </div>
        </div>
      ) : (
        <LandingPage />
      )}
    </>
  )
}

export default App
