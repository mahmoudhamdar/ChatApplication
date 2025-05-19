"use client"
import {Messages} from "../Messages/Messages"
import {MessageInput} from "../Messages/MessageInput"
import "./Window.css"
import {useRoom} from "@/Stores/Providers/RoomStoreProvider";


export const ChatWindow = () => {
    const {roomName, roomId} = useRoom()

    if (!roomId) {
        return (
            <div className="empty-chat-window">
                <div className="empty-chat-message">
                    <h3>No chat room selected</h3>
                    <p>Please select a chat room from the sidebar to start messaging</p>
                </div>
            </div>
        )
    }

    return (
        <div className="chat-window">
            <div className="chat-window-header">
                <h2>{roomName}</h2>
            </div>

            <div className="chat-window-messages">
                <Messages/>
            </div>

            <div className="chat-window-input">
                <MessageInput/>
            </div>
        </div>
    )
}
