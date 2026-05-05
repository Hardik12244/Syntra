import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

function Messages({ user }: any) {

  const [chatUser, setChatUser] = useState<any>(null);

  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {

    socketRef.current = io("http://localhost:3000");


    socketRef.current.on("connect", () => {
      console.log("Connected with id:", socketRef.current?.id);

      socketRef.current?.emit("join", user._id);
      console.log(user._id)
    })

    socketRef.current.on("receive_message", (message) => {
      console.log(message);
    })

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
    name: "Test User"
  });

}, [user]);

  const handleSend = () => {
    if (!socketRef.current || !chatUser) return;

    socketRef.current.emit("send_message", {
      senderId: user._id,
      receiverId: chatUser._id,
      text: "hello from button"
    });
    console.log("SENDING:", {
  sender: user._id,
  receiver: chatUser?._id
});
  };



  return <div>Test

    <div>
      <button onClick={handleSend} className="bg-red-50">
        Send
      </button>
    </div>
  </div>;
}

export default Messages;