import { useEffect, useState } from 'react'
import './App.css'
import Feed from './pages/Feed'
import CreateUser from './components/CreateUser';
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {
  const[userId,setUserId] = useState<string|null>(null);
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const savedUser = localStorage.getItem("userId");
    if(savedUser){
      setUserId(savedUser);
    }
  },[]);

    useEffect(() => { 
        if (!userId) return;
      axios.get(`http://localhost:3000/user/${userId}`)
      .then((res)=>{
        console.log("USER API RESPONSE:", res.data);
        setUser(res.data);
      });
    }, [userId])

  return (
    <>
    <div>
      <Navbar userId={userId} user={user}/>
    {userId ? <Feed userId={userId}/> : <CreateUser setUserId={setUserId}/>}
    </div>
    </>
  )
}

export default App
