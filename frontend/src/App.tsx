import { useEffect, useState } from 'react'
import './App.css'
import Feed from './pages/Feed'
import Navbar from './components/Navbar';
import axios from 'axios';
import LandingPage from './pages/LandingPage';
import { Routes, Route, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import OnBoarding from './pages/OnBoarding';
import PublicProfile from './pages/PublicProfile';
import Connections from './pages/Connections';


function App() {
  const [user, setUser] = useState<any>(null)
    const { currentUserId } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/me", {
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
          <div className="h-screen flex flex-col overflow-hidden">
            <Navbar user={user} setUser={setUser} />

            <div className="flex flex-1 min-h-0">

              <Sidebar />

              <div className="flex-1 overflow-y-auto min-h-0">
                <Routes>
                  <Route path="/" element={<Feed userId={user._id} />} />
                  <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/matches" element={<Connections />} />
                  <Route path="/messages" element={<Messages user={user}/>} />
                  <Route path="/profile/:id" element={<PublicProfile currentUserId={currentUserId}/>} />
                  <Route path="/messages/:receiverId" element={<Messages />}/>
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
  )
}

export default App
