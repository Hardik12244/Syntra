import { useEffect, useState } from 'react'
import './App.css'
import Feed from './pages/Feed'
import Navbar from './components/Navbar';
import axios from 'axios';

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
      <div>
        <Navbar user={user} setUser={setUser} />
        {user ? <Feed userId={user._id} /> : <div className='flex justify-center items-center text-2xl'>Please login</div>}      
        </div>
    </>
  )
}

export default App
