import { useEffect, useState } from 'react'
import './App.css'
import Feed from './pages/Feed'
import CreateUser from './components/CreateUser';

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
    {userId ? <Feed/> : <CreateUser setUserId={setUserId}/>}
    </div>
    </>
  )
}

export default App
