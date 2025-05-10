"use client";


import "./ChatRoom.css"
import {useEffect, useState} from "react"
import UseRoom from "@/Stores/StoreUses/UseRoom";
import {axiosPrivate} from "@/Services/ApiService";
import {UseUser} from "@/Stores/StoreUses/UseUser";
import {user} from "@/components/AddConversation";

export const ChatRoom = ({
                             roomId,
                             isActive,
                             setActiveChatRoomAction,
                         }: {
    
    roomId: string
    isActive: boolean
    setActiveChatRoomAction: (roomId: string) => void
}) => {
    const {setRoomId,setRoomName} = UseRoom()
    const {user} = UseUser()
    const [OtherUser, setOtherUser] = useState<user>()
    useEffect(() => {
        
      async  function  getUser(){
          
          const users:user[]= await axiosPrivate.get(`/api/userChatRoom/${roomId}`).then(res => {
              return res.data
          })
      
          const   userss =users.filter(User=>User.username!==user.username)[0]
             const User:user =   await  axiosPrivate.get(`/api/user/${userss}`)
                 .then(res => {
                return res.data
            })
          setOtherUser(User)
          
        }
        
        getUser().then(r => r)
        
        
    }, []);
    useEffect( () => {
        
        if (isActive) {
            setRoomId(roomId)
        }
        
    }, [isActive, roomId,  setRoomId, setRoomName])

    const handleClick = async () => {
        
       
        
        setActiveChatRoomAction(roomId)
        setRoomId(roomId)
    }

    return (
        <div className={`chat-room ${isActive ? "active" : ""}`} onClick={handleClick}>
            <div className="chat-room-icon">{OtherUser?.username.charAt(0).toUpperCase()}</div>
            <div className="chat-room-details">
                <div className="chat-room-name">{OtherUser?.username}</div>
                <div className="chat-room-preview">{isActive ? "Active" : "Click to join"}</div>
            </div>
        </div>
    )
}
