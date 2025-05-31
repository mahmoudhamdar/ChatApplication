"use client"
import { useEffect, useState} from "react"
import "./ChatRooms.css"
import "./ChatRoom.css"
import {ChatRoom} from "@/components/ChatRoom/ChatRoom";
import {api, axiosPrivate} from "@/Services/ApiService";
import useSWR, {mutate} from "swr";
import {cache} from "swr/_internal";
import {UserProfileToken} from "@/Models/User";
import { useRouter } from "next/navigation";
import {socket} from "@/Socket/socket";


interface ChatRoomsProps {
    chatRooms: ChatRoomType[];
}



export const ChatRooms = (props: ChatRoomsProps ) => {
    const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([])
    const [activeChatRoomId, setActiveChatRoomId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const { data: user } = useSWR(`${api}/user/login`, null, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        refreshInterval: 0
    })

    const router = useRouter()
    
    useEffect(() => {
        setIsLoading(true)
        
            setChatRooms(props.chatRooms)
            if (props.chatRooms.length > 0 && !activeChatRoomId) {
                // @ts-ignore
                setActiveChatRoomId(props.chatRooms[0].roomId)
            }
            setIsLoading(false)
    }, [])
    
    useEffect(() => {
        // Listen for new conversations and refresh the page to get server data
        const handleNewConversation = () => {
            router.refresh()
        }

        socket.on("conversationAdded", handleNewConversation)

        return () => {
            socket.off("conversationAdded", handleNewConversation)
        }
    }, [router])

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
                    {props.chatRooms.map((chatroom) => (
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
