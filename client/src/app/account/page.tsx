
import "@/App.css"
import {ChatRooms} from "@/components/ChatRoom/ChatRooms";
import {ChatWindow} from "@/components/ChatWIndow/ChatWindow";
import {api, axiosPrivate} from "@/Services/ApiService";
import {AddConversation} from "@/components/AddConversation";
import {use} from "react";




export  function fetchChatRooms (){
    
    const response = use (axiosPrivate(`${api}/chatroom`))
    return response.data   
}


export async function fetchMessages (roomId: string) {

    const response = await axiosPrivate(`${api}/messages/${roomId}`)

    return response.data
}



export default async  function account() {

    const chatRooms:ChatRoomType[] = fetchChatRooms()
    
  
    
    return (
        
        
        <div className="app-container">
            
            <button className="mobile-menu-button" >
                {"☰"}
            </button>

           
            <div className={`sidebar`}>
                <ChatRooms />
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
