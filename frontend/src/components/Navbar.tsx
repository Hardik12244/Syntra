import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

type Props = {
  user: any;
  setUser: (user: any) => void;
};

export default function Navbar({ user, setUser }:Props) {
    console.log(user);

    return (
        <div className="flex justify-between items-center m-4">
            <div>Syntra</div>
            <div>
                {user? <h1>{user.name}</h1> :(
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