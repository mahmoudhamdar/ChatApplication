import "@/App.css"
import {ChatRooms} from "@/components/ChatRoom/ChatRooms";
import {ChatWindow} from "@/components/ChatWIndow/ChatWindow";
import {api, axiosPrivate} from "@/Services/ApiService";
import {AddConversation} from "@/components/AddConversation";
import {UseUser} from "@/Stores/StoreUses/UseUser";

export async function fetchChatRooms ()  {
    const {user} =UseUser()
    
    
    const response = await axiosPrivate(`${api}/chatroom/${user.id}`)
    return response.data   
}

export async function fetchMessages (roomId: string)  {
    
    const response = await axiosPrivate(`${api}/messages/${roomId}` )
    
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
