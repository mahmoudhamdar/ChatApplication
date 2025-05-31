"use client"
import {useEffect, useRef, useState} from "react"
import {Message} from "./Message"
import {socket} from "@/Socket/socket"
import "./Messages.css"
import {useRoom} from "@/Stores/Providers/RoomStoreProvider";
import {api} from "@/Services/ApiService";
import useSWR from "swr";
import {useRouter} from "next/navigation";



interface MessagesProps {
    Messages: MessageType[]
}

export const Messages = (props:MessagesProps) => {
    const {roomId} = useRoom()
    
    const [messages, setMessages] = useState<MessageType[]>([])
    const [isLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    const {data:user} = useSWR(`${api}/user/login`,null,{
            shouldRetryOnError: false,
            revalidateOnFocus: false,
            revalidateOnMount: false
    })

    
    

const router =useRouter()

    useEffect(() => {
        // Filter messages for current room from server data
        if (roomId && props.Messages) {
            const roomMessages = props.Messages.filter((msg: MessageType) => msg.RoomId === roomId)
            setMessages(roomMessages)
        } else {
            setMessages([])
        }
    }, [roomId, props.Messages])
    useEffect(() => {
      
        if (roomId) {
          
            setMessages(props.Messages)

        }

        function handleNewMessage(message: MessageType[]) {
            
            const roomMessages: MessageType[] = message.filter((msg: MessageType) => msg.RoomId === roomId)
            setMessages((prevMessages) => [...prevMessages, ...roomMessages])
          
        }

        socket.on("messageSend", handleNewMessage)

        // Add cleanup function to remove event listener when component unmounts or roomId changes
        
    }, [roomId])
    /*useEffect(() => {
        function handleNewMessage(newMessages: MessageType[]) {
            // Just refresh the page to get updated server data
            router.refresh()
        }

        socket.on("messageSend", handleNewMessage)

        return () => {
            socket.off("messageSend", handleNewMessage)
        }
    }, [router])*/
    
    
    
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    if (isLoading) {
        return (
            <div className="messages-loading">
                <div className="loading-spinner">Loading messages...</div>
            </div>
        )
    }

    return (
        <div className="messages-container">
            {messages.length === 0 ? (
                <div className="no-messages">No messages yet. Start the conversation!</div>
            ) : (
                messages.map((message: MessageType) => (
                    <Message key={message.messageId} content={message.content}
                             isOwnMessage={user?.id ? message.userId === user.id : false}/>
                ))
            )}
            <div ref={messagesEndRef}/>
        </div>
    )
}
