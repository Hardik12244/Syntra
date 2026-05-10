import { io, Socket } from "socket.io-client";
import {useEffect, useRef, useState } from "react";
import axios from "axios";

function Messages({ user }: any) {

  const [chatUser, setChatUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
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

  // useEffect(() => {
  //   if (!user?._id) return;
  //   const otherUserId =
  //     user._id === "69f9704933edf07c6883a663"
  //       ? "69e220e294308ce395a12a04"
  //       : "69f9704933edf07c6883a663";

  //   setChatUser({
  //     _id: otherUserId,
  //     name: user.name
  //   });

  // }, [user]);

  useEffect(() => {
    const fetchConversation = async () => {
      const response = await axios.get("http://localhost:3000/message/conversation", {
        withCredentials: true,
      })
      setConversations(response.data);
    }
    fetchConversation();
  }, [user])



  useEffect(() => {
    if (!user || !chatUser) return;

    const fetchMessages = async () => {
      const response = await axios.get(`http://localhost:3000/message/${chatUser._id}`, {
        withCredentials: true,
      })
      setMessages(response.data)
    }
    fetchMessages()
  }, [user, chatUser])




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
<div className="flex">

{/* Conversation box UI */}
<div>
<div className="w-80 bg-white border-r border-gray-200 flex flex-col">

  <div className="p-4 border-b border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800">
      Messages
    </h2>
  </div>

  <div className="flex-1 overflow-y-auto">

    {conversations.map((person) => (
      <div
        key={person._id}
        onClick={() => setChatUser(person)}
        className={`flex items-center gap-3 p-4 cursor-pointer transition hover:bg-gray-100
          
          ${chatUser?._id === person._id
            ? "bg-pink-50"
            : ""
          }
        `}
      >

        <img
          src={person.avatar}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h3 className="font-medium text-gray-800">
            {person.name}
          </h3>

          <p className="text-sm text-gray-500">
            Tap to chat
          </p>
        </div>

      </div>
    ))}

  </div>
</div>
</div>

{/* Chatting UI Start */}
{chatUser && (
  <div className="flex flex-col bg-[#f7f8fa] h-screen flex-1">

    {/* Chat Header */}
    <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between shadow-sm">

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200">
          <img
            src={chatUser?.avatar}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="font-semibold text-gray-800">
            {chatUser?.name}
          </h2>

          <p className="text-sm text-green-500">
            Online
          </p>
        </div>
      </div>

      <button
        onClick={() => setChatUser(null)}
        className="text-2xl text-gray-400 hover:text-red-500 transition"
      >
        ✕
      </button>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">

      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.senderId === user._id
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <div
            className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm break-words shadow-sm
              
              ${
                msg.senderId === user._id
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-md"
                  : "bg-white text-gray-800 rounded-bl-md"
              }
            `}
          >
            {msg.text}
          </div>

        </div>
      ))}

    </div>

    {/* Input Area */}
    <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">

      <div className="flex items-center gap-3">

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 px-5 py-3 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={handleSend}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
        >
          Send
        </button>

      </div>

    </div>

  </div>
)}
{/* Chatting UI End */}


</div>


  );
}

export default Messages;