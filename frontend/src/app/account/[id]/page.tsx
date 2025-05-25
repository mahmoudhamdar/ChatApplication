
import "@/App.css"
import {ChatRooms} from "@/components/ChatRoom/ChatRooms";
import {ChatWindow} from "@/components/ChatWIndow/ChatWindow";
import {api, axiosPrivate} from "@/Services/ApiService";
import {AddConversation} from "@/components/AddConversation";
import {use} from "react";
import {UserProfileToken} from "@/Models/User";




export  async function fetchChatRooms (id: string): Promise<ChatRoomType[]> {
    
    const response:ChatRoomType[] = await fetch(`${api}/chatroom/${id}`,{method: "GET"})
        .then(res => res.json())
        .then(res => res.data)
   
    return response

}

export async function fetchMessages (id: string) {

    const response:MessageType[] = await fetch(`${api}/messagesUser/${id}`,{method:"GET"})
    .then(res=>res.json()).then(res => res.data)

    return response
}

export async function fetchId (name: string) {

   const user:UserProfileToken = await fetch(`${api}/username/${name}`,{method:"GET"})
        .then(res=>res.json())
        .then(res => res)
    return user
}

export default async  function account({params}: {params: { name: string }}) {

    console.log(params.name)
    const username = params.name
    const id:string = await fetchId(username).then(res=>res.id)

    const chatRooms:ChatRoomType[] = await fetchChatRooms(id)
    
    const Messages:MessageType[] = await fetchMessages(id)

    console.log(chatRooms)

    return (


        <div className="app-container">

            <button className="mobile-menu-button" >
                {"☰"}
            </button>


            <div className={`sidebar`}>
                <ChatRooms  chatRooms={chatRooms} />
            </div>

            <div className="sidebar-overlay">
                <AddConversation/>
            </div>

            <div className="main-content">
                <ChatWindow Messages={Messages}/>
            </div>
        </div>

    )
}
