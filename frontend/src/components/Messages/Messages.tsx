"use client"
import {use, useEffect, useRef, useState} from "react"
import {Message} from "./Message"

import {GetMessage} from "@/Services/MessageApiService"
import {socket} from "@/Socket/socket"

import "./Messages.css"
import {useRoom} from "@/Stores/Providers/RoomStoreProvider";
import {useUser} from "@/Stores/Providers/UserStoreProvider";
import {api, axiosPrivate} from "@/Services/ApiService";

type MessageType = {
    messageId: string
    RoomId: string
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
            axiosPrivate.get(`${api}/message/${roomId}`)
                .then((response) => {
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
            console.log(" messages:", message)
            console.log("room" + roomId)
            const roomMessages: MessageType[] = message.filter((msg: MessageType) => {
                console.log(msg.RoomId===roomId)
               return  msg.RoomId === roomId
            })
            console.log("Room messages:", roomMessages)
           console.log(messages)
            setMessages(prevMessages => [...prevMessages, ...roomMessages])
            console.log("Room messages:", messages)
        }

        socket.on("messageSend", handleNewMessage)
        // Add cleanup function
        return () => {
            socket.off("messageSend", handleNewMessage);
        };

        // Add cleanup function to remove event listener when component unmounts or roomId changes
        
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
