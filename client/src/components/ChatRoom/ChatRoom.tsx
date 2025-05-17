"use client";


import "./ChatRoom.css"
import {useEffect, useState} from "react"
import UseRoom from "@/Stores/StoreUses/UseRoom";
import {api, axiosPrivate} from "@/Services/ApiService";
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
          
         const otherUsers:user[] = await axiosPrivate.get(`${api}/user/otherUser/${roomId}`)
             .then(res => res.data)
      
             const  otherUser =otherUsers.filter(User=>User.username!==user.username)[0]
            
          setOtherUser(otherUser)
          console.log(otherUser);
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
