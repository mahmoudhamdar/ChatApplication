"use client"

import {useState} from "react"
import {useRoomStoreContext} from "@/Stores/Providers/RoomStoreProvider"
import {useUserStoreContext} from "@/Stores/Providers/UserStoreProvider"
import {socket} from "@/Socket/socket"
import {api, axiosPrivate} from "@/Services/ApiService"
import "./MessageInput.css"
import {UseUser} from "@/Stores/StoreUses/UseUser";

export const MessageInput = () => {
    const [message, setMessage] = useState<string>("")
    const [isSending, setIsSending] = useState(false)
    const {user} = UseUser()
    const {roomId} = useRoomStoreContext()

    const sendMessage = (messageContent: string) => {
        if (!user?.id || !roomId || !messageContent.trim()) {
            return
        }

        setIsSending(true)

        const messageData = {
            roomId: roomId,
            content: messageContent,
            userId: user.id,
        }


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
