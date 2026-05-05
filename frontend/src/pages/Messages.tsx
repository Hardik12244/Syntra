import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { div } from "framer-motion/client";

function Messages({ user }: any) {

  const [chatUser, setChatUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const [text, setText] = useState("");

  
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {

    socketRef.current = io("http://localhost:3000");


    socketRef.current.on("connect", () => {
      console.log("Connected with id:", socketRef.current?.id);

      socketRef.current?.emit("join", user._id);
      console.log(user._id)
    })

    socketRef.current.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });


    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!user?._id) return;
    const otherUserId =
      user._id === "69f9704933edf07c6883a663"
        ? "69e220e294308ce395a12a04"
        : "69f9704933edf07c6883a663";

    setChatUser({
      _id: otherUserId,
      name: user.name
    });

  }, [user]);

  const handleSend = () => {
    if (!socketRef.current || !chatUser) return;

    socketRef.current.emit("send_message", {
      senderId: user._id,
      receiverId: chatUser._id,
      text
    });

    setText("");
  };



  return (
  <div className=" flex flex-col  bg-[#f7f8fa] h-full pt-4">

    <div className="p-4 rounded-tl-2xl rounded-tr-2xl bg-white shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-300 rounded-full"> 
            <img src={user.avatar} alt="" />

      </div>
      <div className="font-semibold text-gray-800">
        {chatUser?.name || "Chat"}
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.senderId === user._id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl max-w-xs text-sm break-words ${
              msg.senderId === user._id
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                : "bg-white text-gray-800 shadow-sm"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}


    </div>

    <div className="p-3 bg-white flex gap-2 border-t">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-pink-400"
      />
      <button
        onClick={handleSend}
        className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
      >
        Send
      </button>
    </div>

  </div>
);


}

export default Messages;