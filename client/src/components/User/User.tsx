"use client"
import {UseUser} from "@/Stores/StoreUses/UseUser";
import {api, axiosPrivate} from "@/Services/ApiService";
import {UserProfileToken} from "@/Models/User";


export const User = (props:UserProfileToken)=>{
    
    const {user} = UseUser()
    
    async function handleClick(){
        
      const room:string =  await axiosPrivate.post(`${api}/chatroom`, {roomName: `${user.username} and ${props.username}`})
          .then(res => {return res.data.roomId})
        console.log(room)
        await axiosPrivate.post(`${api}/userChatRoom`, {roomId: room,userId: props.id})
        
        await axiosPrivate.post(`${api}/userChatRoom`, {roomId: room,userId: user.id})
        
    }
    
    return (
        <div onClick={handleClick}>
            <h1>{props.username}</h1>
        </div>
    )
           
}
