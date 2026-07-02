import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Messages({ user }: any) {
  const navigate = useNavigate();

  const [chatUser, setChatUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [text, setText] = useState("");

  const location = useLocation();
  const selectedUser = location.state?.selectedUser;

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      if (user?._id) {
        socketRef.current?.emit("join", user._id);
      }
    });

    socketRef.current.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/message/conversation",
          {
            withCredentials: true,
          }
        );
        setConversations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchConversation();
  }, [user]);

  useEffect(() => {
    if (!user || !chatUser) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/message/${chatUser._id}`,
          {
            withCredentials: true,
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [user, chatUser]);

  useEffect(() => {
    if (selectedUser) {
      setChatUser(selectedUser);
    }
  }, [selectedUser]);

  const handleSend = () => {
    if (!socketRef.current || !chatUser || !text.trim()) return;

    socketRef.current.emit("send_message", {
      senderId: user._id,
      receiverId: chatUser._id,
      text,
    });

    setText("");
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-80px)] bg-white overflow-x-hidden">
      {/* Conversation box UI */}
      <div
        className={`${
          chatUser ? "hidden md:block" : "block"
        } w-full md:w-80 bg-white border-r border-gray-200 flex flex-col shrink-0`}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <p className="p-6 text-center text-gray-400 text-sm">
              No recent conversations
            </p>
          )}

          {conversations.map((person) => (
            <div
              key={person._id}
              onClick={() => setChatUser(person)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition hover:bg-gray-100 min-w-0
          
          ${chatUser?._id === person._id ? "bg-pink-50" : ""}
        `}
            >
              <img
                src={person.avatar}
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${person._id}`);
                }}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-800 truncate">
                  {person.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  Tap to chat
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chatting UI Start */}
      {chatUser ? (
        <div className="flex flex-col bg-[#f7f8fa] flex-1 min-w-0 h-[calc(100vh-80px)]">
          {/* Chat Header */}
          <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between shadow-sm min-w-0 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <img
                  src={chatUser?.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                  {chatUser?.name}
                </h2>

                <p className="text-xs sm:text-sm text-green-500">Online</p>
              </div>
            </div>

            <button
              onClick={() => setChatUser(null)}
              className="text-xl sm:text-2xl text-gray-400 hover:text-red-500 transition p-1"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-3 min-w-0">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.senderId === user._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl text-xs sm:text-sm break-words shadow-sm
              
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
          <div className="bg-white border-t border-gray-200 p-3 sm:p-4 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
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
                className="flex-1 px-4 sm:px-5 py-2 sm:py-3 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-pink-400 text-xs sm:text-sm min-w-0"
              />

              <button
                onClick={handleSend}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs sm:text-sm font-medium hover:opacity-90 transition shrink-0"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 bg-[#f7f8fa]">
          Select a conversation to start chatting
        </div>
      )}
      {/* Chatting UI End */}
    </div>
  );
}

export default Messages;