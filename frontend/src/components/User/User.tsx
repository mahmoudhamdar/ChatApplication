"use client"
import {api, axiosPrivate} from "@/Services/ApiService";
import {UserProfileToken} from "@/Models/User";
import {useUser} from "@/Stores/Providers/UserStoreProvider";

interface UserProps {
    id: string,
    username: string,
    email: string,
    token: string,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export const User = (props:UserProps)=>{
    
    const {user} = useUser()
    
    async function handleClick(){
        
      const room:string =  await axiosPrivate.post(`${api}/chatroom`, {roomName: `${user.username} and ${props.username}`})
          .then(res => {return res.data.roomId})
        console.log(room)
        await axiosPrivate.post(`${api}/userChatRoom`, {roomId: room,userId: props.id})
        
        await axiosPrivate.post(`${api}/userChatRoom`, {roomId: room,userId: user.id})
        
        props.setShow(false)
        
    }
    
    return (
        <div onClick={handleClick}>
            <h1>{props.username}</h1>
        </div>
    )
           
}
