
import "@/App.css"
import {ChatRooms} from "@/components/ChatRoom/ChatRooms";
import {ChatWindow} from "@/components/ChatWIndow/ChatWindow";
import {api, axiosPrivate} from "@/Services/ApiService";
import {AddConversation} from "@/components/AddConversation";
import { unstable_noStore as noStore } from 'next/cache';
import {UserProfileToken} from "@/Models/User";

export const revalidate=1
 

export  async function fetchChatRooms (id: string): Promise<ChatRoomType[]> {
    
    
   const response =await fetch(`${api}/chatroom/${id}`, { next: { revalidate: 4 }, method: "GET",credentials: 'include' })
       .then(response => response.json()).then(responseJson => {return responseJson as ChatRoomType[]})
  //  const response = await axiosPrivate.get(`${api}/chatroom/${id}`, { next: { revalidate: 3600 } }).then(res => res.data)
    return response

}

export async function fetchMessages (id: string):Promise<MessageType[]> {

    const response =await fetch(`${api}/messagesUser/${id}`, { next: { revalidate: 4 }, method: "GET",credentials: 'include' })
        .then(response => response.json()).then(responseJson => {return responseJson as MessageType[]})
    
  //  const response:MessageType[] = await axiosPrivate.get(`${api}/messagesUser/${id}`)
    //.then(res => res.data)

    return response
}

export async function fetchId (name: string):Promise<UserProfileToken> {

   const user:UserProfileToken = await axiosPrivate.get(`${api}/username/${name}`)
        .then(res => res.data)
    return user
}
async function fetchUsers(id:string) {

    const users:UserProfileToken[]= await axiosPrivate.get(`${api}/user/noChatRoomUsers/${id}`)
        .then(response => response.data);
    return users


}
export default async  function account({params}: {params: { id: string }}) {

  
    const username = params.id
    
    
    const user:UserProfileToken = await fetchId(username)
    
    const chatRooms:ChatRoomType[] = await fetchChatRooms(user.id)
    
    const Messages:MessageType[] = await fetchMessages(user.id)

    const users:UserProfileToken[] = await  fetchUsers(user.id)
        .then(res=> res.filter((User:UserProfileToken) => User.username !== user.username))

    return (


        <div className="app-container">

            <button className="mobile-menu-button" >
                {"☰"}
            </button>


            <div className={`sidebar`}>
                <ChatRooms  chatRooms={chatRooms} />
            </div>

            <div className="sidebar-overlay">
                <AddConversation users={users}/>
            </div>

            <div className="main-content">
                <ChatWindow Messages={Messages}/>
            </div>
        </div>

    )
}
