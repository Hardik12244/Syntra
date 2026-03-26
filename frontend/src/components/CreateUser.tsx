import axios from "axios";
import { useState } from "react";

type Props = {
    setUserId: (id: string) => void;
};

export default function CreateUser({ setUserId }: Props) {

    const [name, setName] = useState<string>("")
    const [phoneNo, setPhoneNo] = useState<string>("")
    const [college, setCollege] = useState<string>("")
    const [intent, setIntent] = useState<string>("")
    const [interestsInput, setInterestsInput] = useState<string>("");

    function addUser() {
        const interests = interestsInput
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i.length > 0);
        axios.post("http://localhost:3000/user", {
            name,
            phoneNo,
            college,
            interests,
            intent
        })
            .then((res) => {
                console.log(res.data);
                const id = res.data._id
                localStorage.setItem("userId", id);
                setUserId(id);
            })
    }

    return <div>Create User Screen

        <div>
            <h1>Login</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="enter name" />
            <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} type="text" placeholder="enter phoneNo" />
            <input value={college} onChange={(e) => setCollege(e.target.value)} type="text" placeholder="enter College" />
            <input value={intent} onChange={(e) => setIntent(e.target.value)} type="text" placeholder="enter Intent" />
            <input value={interestsInput} onChange={(e) => setInterestsInput(e.target.value)} type="text" placeholder="coding, gym, music"
            />
            <button onClick={addUser}>Done</button>
        </div>

    </div>;
}