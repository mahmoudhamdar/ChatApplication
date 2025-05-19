"use client"
import {api, axiosPrivate} from "@/Services/ApiService";
import {UserProfileToken} from "@/Models/User";
import {useUser} from "@/Stores/Providers/UserStoreProvider";


export const User = (props:UserProfileToken)=>{
    
    const {user} = useUser()
    
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
