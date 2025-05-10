"use client"
import {useEffect, useState} from "react"
import "./ChatRooms.css"
import "./ChatRoom.css"
import {ChatRoom} from "@/components/ChatRoom/ChatRoom";
import {UseUser} from "@/Stores/StoreUses/UseUser";






export const ChatRooms = (props) => {
    const [chatRooms, setChatRooms] = useState<UserChatRoomType[]>([])
    const [activeChatRoomId, setActiveChatRoomId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const {user} = UseUser()

    useEffect(() => {


        setIsLoading(true)

        try {
            console.log(props.chatRooms)    
          //  const userChatrooms = props.chatRooms.filter((chatroom) => chatroom.userId !== user.id)
            console.log(props.chatRooms)
            setChatRooms(props.chatRooms)
            if (props.length > 0 && !activeChatRoomId) {
                // @ts-ignore
                setActiveChatRoomId(props[0].roomId)
            }
        } finally {
            setIsLoading(false)
        }


    }, [])

    return (
        <div className="chat-rooms-container">
            <div className="user-header">
                <h2>{user?.username || "Chat App"}</h2>
                <span className="status-indicator">Online</span>
            </div>

            <h3 className="chat-rooms-title">CHAT ROOMS</h3>

            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : chatRooms.length === 0 ? (
                <div className="no-rooms-message">No chat rooms available</div>
            ) : (
                <div className="chat-rooms-list">
                    {chatRooms.map((chatroom) => (
                        <ChatRoom
                            key={chatroom.roomId}
                            roomId={chatroom.roomId}
                            isActive={activeChatRoomId === chatroom.roomId}
                            setActiveChatRoomAction={setActiveChatRoomId}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
