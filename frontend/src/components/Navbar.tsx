import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

type Props = {
  user: any;
  setUser: (user: any) => void;
  onToggleMenu?: () => void;
};

export default function Navbar({ user, setUser, onToggleMenu }: Props) {
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <div className="w-full px-3 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center bg-white shadow-sm border-b border-gray-200 text-pink-500 hover:text-pink-600 sticky top-0 z-40">
      <div className="flex items-center gap-2 sm:gap-3">
        {user && user.isProfileComplete && onToggleMenu && (
          <button
            onClick={onToggleMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-pink-500 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div className="bg-white rounded-md flex items-center">
          <img src="/ff.png" className="h-10 sm:h-14 lg:h-20 w-auto object-contain" alt="Syntra" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {user ? (
          <div className="flex gap-2 sm:gap-4 items-center justify-center">
            <img src={user.avatar} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 object-cover" alt="" />
            <div className="text-gray-700 font-medium text-xs sm:text-base truncate max-w-[90px] sm:max-w-[150px] md:max-w-none">{user.name}</div>
            <button onClick={handleLogout} className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm md:text-base bg-pink-500 text-white rounded-md hover:bg-pink-600 transition shrink-0">
              Logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = credentialResponse.credential;
              axios
                .post("http://localhost:3000/auth/google", {
                  token,
                })
                .then((res) => {
                  localStorage.setItem("token", res.data.token);
                  setUser(res.data.user);
                });
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </div>
    </div>
  );
}