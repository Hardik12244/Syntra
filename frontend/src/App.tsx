import { useEffect, useState } from 'react'
import './App.css'
import Feed from './pages/Feed'

function App() {

  const[userId,setUserId] = useState<string|null>(null);

  useEffect(()=>{
    const savedUser = localStorage.getItem("userId");
    if(savedUser){
      setUserId(savedUser);
    }
  },[]);

  return (
    <>
    <div>
    {userId ? "User exists" : "No user"}
    </div>
    <Feed/>
    </>
  )
}

export default App
