"use client"
import {useEffect, useRef, useState} from "react"
import {Message} from "./Message"

import {GetMessage} from "@/Services/MessageApiService"
import {socket} from "@/Socket/socket"

import "./Messages.css"
import {useRoom} from "@/Stores/Providers/RoomStoreProvider";
import {useUser} from "@/Stores/Providers/UserStoreProvider";
import {api, axiosPrivate} from "@/Services/ApiService";

type MessageType = {
    messageId: string
    roomId: string
    content: string
    userId: string,
    senderId: string,
    recieverId: string,
    timestamp: string
    
}

export const Messages = () => {
    const {roomId} = useRoom()
    const {user} = useUser()
    const [messages, setMessages] = useState<MessageType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
      
        if (roomId) {
      
            setIsLoading(true)
           
            GetMessage(roomId)
                .then((response) => {
                        // @ts-ignore
                    console.log(response.data)
                    if (response && response.data) {
                        setMessages(response.data)
                    }
                })
                .catch((err) => {
                    console.error("Error fetching messages:", err)
                })
                .finally(() => {
                    setIsLoading(false)
                })

        }

        function handleNewMessage(message: MessageType[]) {
            console.log("Received message:", message)
            const roomMessages = message.filter((msg) => msg.roomId === roomId)
            if (roomMessages.length > 0) {
                setMessages((prevMessages) => [...prevMessages, ...roomMessages])
            }
           
        }

        socket.on("messageSend", handleNewMessage)

        // Add cleanup function to remove event listener when component unmounts or roomId changes
        return () => {
            socket.off("messageSend", handleNewMessage)
        }

    }, [roomId])

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
                             isOwnMessage={message.userId === user.id}/>
                ))
            )}
            <div ref={messagesEndRef}/>
        </div>
    )
}
