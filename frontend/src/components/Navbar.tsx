import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

type Props = {
    user: any;
    setUser: (user: any) => void;
};



export default function Navbar({ user, setUser }: Props) {
    console.log(user);

    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <div className="w-full px-6 py-3 flex justify-between items-center 
bg-white shadow-sm border-b border-gray-200 text-pink-500 hover:text-pink-600 sticky top-0 z-50">

            <div className="flex items-center">
                <div className=" bg-white rounded-md">
                    <img src="ff.png" className="h-20 w-50" />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {user ? <div className="flex gap-4 items-center justify-center">
                    <div className="text-gray-700 font-medium mr-4 ">{user.name}</div>
                    <button onClick={handleLogout} className="px-3 py-1.5 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition">
                        Logout
                    </button>
                </div> : (
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const token = credentialResponse.credential;
                            axios.post("http://localhost:3000/auth/google", {
                                token,
                            })
                                .then((res) => {
                                    console.log("LOGIN SUCCESS:", res.data);
                                    localStorage.setItem("token", res.data.token);
                                    setUser(res.data.user);
                                });
                            console.log("GOOGLE TOKEN:", credentialResponse);
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                    />
                )}


            </div>
        </div>
    )
}