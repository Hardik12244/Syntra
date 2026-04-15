import { useEffect, useState } from 'react'
import './App.css'
import Feed from './pages/Feed'
import Navbar from './components/Navbar';
import axios from 'axios';
import LandingPage from './pages/LandingPage';

function App() {
  const [user, setUser] = useState(null)

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
        <>
          <Navbar user={user} setUser={setUser} />
          <Feed userId={user._id} />
        </>
      ) : (
        <>
          <LandingPage />
        </>
      )}
    </>
  )
}

export default App
