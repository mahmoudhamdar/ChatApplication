"use client"

import {useState} from "react"
import {useRoom} from "@/Stores/Providers/RoomStoreProvider"
import {socket} from "@/Socket/socket"
import {api, axiosPrivate} from "@/Services/ApiService"
import "./MessageInput.css"
import {useUser} from "@/Stores/Providers/UserStoreProvider";

import {user} from "@/components/AddConversation";
import {UserProfileToken} from "@/Models/User";
import useSWR from "swr";
export const MessageInput = () => {
    const [message, setMessage] = useState<string>("")
    const [isSending, setIsSending] = useState(false)
    
    const {roomId} = useRoom()

    const {data:user} = useSWR(`${api}/user`,null)
    
    const  sendMessage = async (messageContent: string) => {
        if (!user?.id || !roomId || !messageContent.trim()) {
            return
        }
        const otherUsers:UserProfileToken[] = await axiosPrivate.get(`${api}/user/otherUser/${roomId}`)
            .then(res => res.data)

        const  otherUser =otherUsers.filter(User=>User.username!==user.username)[0]
       console.log("otherUser", otherUser)
        setIsSending(true)

        const messageData = {
            RoomId: roomId,
            content: messageContent,
            userId: user.id,
            senderId: user.id,
            recieverId: otherUser.id,
            
        }

        console.log("input" +messageData)
        axiosPrivate.post(`${api}/message`, messageData).catch(e => console.error(e))
        socket.emit("messageReceive", messageData)
        setMessage("")

        setIsSending(false)

    }

    return (
        <div className="message-input-container">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!user?.id || isSending}
                placeholder={user?.id ? "Type a message..." : "Please sign in to chat"}
                className="message-input"
                onKeyPress={(e) => {
                    if (e.key === "Enter" && message.trim() && !isSending) {
                        sendMessage(message)
                    }
                }}
            />

            <button
                onClick={() => sendMessage(message)}
                disabled={!user?.id || !message.trim() || isSending}
                className="send-button"
            >
                {isSending ? "Sending..." : "Send"}
            </button>
        </div>
    )
}
