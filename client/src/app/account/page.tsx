import "@/App.css"
import {ChatRooms} from "@/components/ChatRoom/ChatRooms";
import {ChatWindow} from "@/components/ChatWIndow/ChatWindow";
import {Axios} from "axios";
import {axiosPrivate} from "@/Services/ApiService";
import {use} from "react";
import {AddConversation} from "@/components/AddConversation";

export async function fetchChatRooms ()  {
    
    const response = await axiosPrivate("http://localhost:5279/api/chatroom")
    return response.data   
}

export async function fetchMessages (roomId: string)  {
    
    const response = await axiosPrivate(`http://localhost:5279/api/messages/${roomId}` )
    
    return response.data
}

export default async  function account() {

    const chatRooms:UserChatRoomType[] = await fetchChatRooms()
    
  
    
    return (
        
        
        <div className="app-container">
            
            <button className="mobile-menu-button" >
                {"☰"}
            </button>

           
            <div className={`sidebar`}>
                <ChatRooms chatRooms={chatRooms}/>
            </div>
        
            <div className="sidebar-overlay">
                <AddConversation/>
            </div>
            
            <div className="main-content">
                <ChatWindow/>
            </div>
        </div>

    )
}
