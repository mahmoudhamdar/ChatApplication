
import "@/App.css"
import {ChatRooms} from "@/components/ChatRoom/ChatRooms";
import {ChatWindow} from "@/components/ChatWIndow/ChatWindow";
import {api, axiosPrivate} from "@/Services/ApiService";
import {AddConversation} from "@/components/AddConversation";
import {use} from "react";
import {UserProfileToken} from "@/Models/User";




export  async function fetchChatRooms (id: string): Promise<ChatRoomType[]> {
    
    
   
    const response = await axiosPrivate.get(`${api}/chatroom/${id}`).then(res => res.data)
    return response

}

export async function fetchMessages (id: string):Promise<MessageType[]> {

    const response:MessageType[] = await axiosPrivate.get(`${api}/messagesUser/${id}`)
    .then(res => res.data)

    return response
}

export async function fetchId (name: string):Promise<UserProfileToken> {

   const user:UserProfileToken = await axiosPrivate.get(`${api}/username/${name}`)
        .then(res => res.data)
    return user
}

export default async  function account({params}: {params: { id: string }}) {

    console.log(params.id)
    const username = params.id
    const user:UserProfileToken = await fetchId(username)

    console.log(user.id)
    
    const chatRooms:ChatRoomType[] = await fetchChatRooms(user.id)
    
    const Messages:MessageType[] = await fetchMessages(user.id)

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
