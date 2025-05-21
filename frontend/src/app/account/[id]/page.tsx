
import "@/App.css"
import {ChatRooms} from "@/components/ChatRoom/ChatRooms";
import {ChatWindow} from "@/components/ChatWIndow/ChatWindow";
import {api, axiosPrivate} from "@/Services/ApiService";
import {AddConversation} from "@/components/AddConversation";
import {use} from "react";




export  async function fetchChatRooms (id: string): Promise<ChatRoomType[]> {


    const response = await axiosPrivate.get<ChatRoomType[]>(`${api}/chatroom/${id}`)
        .then(res => res.data)
    console.log(response)
    return response

}

export async function fetchMessages (roomId: string) {

    const response = await axiosPrivate(`${api}/messages/${roomId}`)

    return response.data
}



export default async  function account({params}: {params: { id: string }}) {

    const userId = params.id

    const chatRooms:ChatRoomType[] = await fetchChatRooms(userId)

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
                <ChatWindow/>
            </div>
        </div>

    )
}
