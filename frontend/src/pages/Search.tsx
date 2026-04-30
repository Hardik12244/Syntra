import React, { useEffect, useState } from 'react'
import TrendingPosts from '../components/TrendingPosts';
import PeopleYouMayLike from '../components/PeopleYouMayLike';
import SearchResults from '../components/SearchResults';
import axios from 'axios';

function Search() {

  const [query, setQuery] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/me",{
      withCredentials: true
    }) 
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='h-full w-full flex flex-col'>

      <div className='flex justify-center'>
        <input type="text" placeholder='Search...' value={query}
          onChange={(e) => setQuery(e.target.value)} className='w-4xl mr-20 mb-10 text-center p-2 justify-center items-center m-5 bg-gray-200 rounded-2xl' />
      </div>


      {query === "" ? (
        <>
          {user && <TrendingPosts userId={user._id} />}    
                <PeopleYouMayLike />
        </>
      ) : (
        <>
          <SearchResults query={query} userId={user._id}/>
        </>
      )}


    </div>
  )
}

export default Search