import React, { useEffect, useState } from 'react'
import TrendingPosts from '../components/TrendingPosts';
import PeopleYouMayLike from '../components/PeopleYouMayLike';
import SearchResults from '../components/SearchResults';
import axios from 'axios';

function Search() {

  const [query, setQuery] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/me", {
      withCredentials: true
    })
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='h-full w-full flex flex-col'>

      <div className="flex justify-center mt-4 mb-8">
        <div className="relative w-4xl">

          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 pr-10 text-center bg-gray-200 rounded-2xl outline-none"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          )}

        </div>
      </div>


      {query === "" ? (
        <>
          {user && <TrendingPosts userId={user._id} />}
          <PeopleYouMayLike />
        </>
      ) : (
        <>
          <SearchResults query={query} userId={user._id} />
        </>
      )}


    </div>
  )
}

export default Search