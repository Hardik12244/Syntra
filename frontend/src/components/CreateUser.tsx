import axios from "axios";
import { useState } from "react";

type Props = {
    setUserId: (id: string) => void;
};

export default function CreateUser({ setUserId }: Props) {

    const [name, setName] = useState<string>("")
    const [phoneNo, setPhoneNo] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [college, setCollege] = useState<string>("")
    const [interestsInput, setInterestsInput] = useState<string>("");

    function addUser() {
        const interests = interestsInput
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i.length > 0);
        axios.post("http://localhost:3000/user", {
            name,
            phoneNo,
            email,
            college,
            interests,
            
        })
            .then((res) => {
                console.log(res.data);
                const id = res.data._id
                localStorage.setItem("userId", id);
                setUserId(id);
            })
            .catch(async (err) => {
                if (err.response?.status === 409) {
                    console.log("User exists, logging in...");
                    
                    const res = await axios.get(`http://localhost:3000/user/phone/${phoneNo}`);

                    const id = res.data._id;
                    localStorage.setItem("userId", id);
                    setUserId(id);
                }
            })
    }

    return <div>

        <div className="flex flex-col gap-3 justify-center items-center mt-14">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="enter name" />
            <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} type="text" placeholder="enter phoneNo" />
            <input value={college} onChange={(e) => setCollege(e.target.value)} type="text" placeholder="enter College" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="enter email" />
            <input value={interestsInput} onChange={(e) => setInterestsInput(e.target.value)} type="text" placeholder="coding, gym, music"
            />
            <button className="bg-blue-400" onClick={addUser}>Done</button>
        </div>

    </div>;
}