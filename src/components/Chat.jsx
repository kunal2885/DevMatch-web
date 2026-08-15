import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {
  const {targetUserId} = useParams()
  const [messages , setMessages] = useState([])
  const [newMessage , setNewMessage] = useState("")
  const user = useSelector(store => store.user)
  const userId = user?._id


  //function to fetch the chat messages 

  const fetchChatMessages = async ()=>{
    try{
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId , {withCredentials : true})
    const messages = chat?.data?.messages
    

    const chats = messages.map((msg)=>{
      return {firstname : msg?.senderId?.firstname , lastname : msg?.senderId?.lastname , text : msg.text}
    })

    setMessages(chats)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchChatMessages()
  },[])

  useEffect(()=>{
    if(!user){ return }

    const socket = createSocketConnection()
    socket.emit("joinChat",{firstname: user.firstname , userId , targetUserId})

    socket.on("messageReceived",({firstname , lastname , text})=>{
      console.log(firstname + " "+ text)
      setMessages(messages => [...messages , {firstname , lastname , text}])

    })


    return ()=>{
       socket.disconnect()
    }
  },[userId , targetUserId])


  const sendMessage = ()=>{
    const socket = createSocketConnection()
    socket.emit("sendMessage",{firstname : user.firstname , lastname : user.lastname , userId , targetUserId , text : newMessage})

    setNewMessage("")

  }
 

  return (
    <div className="min-h-[calc(100vh-80px)] bg-base-200 px-4 py-6 md:px-8">
      <div className="mx-auto flex h-[75vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-2xl">

        
        <div className="flex items-center justify-between border-b border-base-300 bg-base-100 px-5 py-4">
          <div>
            <h1 className="text-xl font-bold md:text-2xl">
              Chat
            </h1>
            <p className="text-xs text-base-content/50">
              Start a conversation
            </p>
          </div>

          <div className="avatar placeholder">
            <div className="w-10 rounded-full bg-primary text-primary-content">
              <span>💬</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-base-200/50 p-4 md:p-6">
  {messages.map((msg, index) => {
    return (
      <div
        className={"chat " + (user.firstname === msg.firstname ? "chat-end" : "chat-start")}
        key={index}
      >
        <div className="chat-header">
          {msg.firstname + " " + msg.lastname}
          
        </div>

        <div className="chat-bubble">
          {msg.text}
        </div>

        
      </div>
    );
  })}
</div>

        {/* Message Input */}
        <div className="border-t border-base-300 bg-base-100 p-3 md:p-4">
          <div className="flex items-center gap-2 rounded-xl bg-base-200 p-2">

            <input
              className="input input-ghost flex-1 bg-transparent text-base focus:outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e)=> setNewMessage(e.target.value)}
            />

            <button className="btn btn-primary rounded-xl px-5 shadow-md hover:scale-105 transition-all duration-200" onClick={sendMessage}>
              Send
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
