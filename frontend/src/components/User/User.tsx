"use client"
import {api, axiosPrivate} from "@/Services/ApiService";
import {UserProfileToken} from "@/Models/User";
import {useUser} from "@/Stores/Providers/UserStoreProvider";
import useSWR from "swr";
import {socket} from "@/Socket/socket";
import {useRouter} from "next/navigation";

interface UserProps {
    id: string,
    username: string,
    email: string,
    token: string,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export const User = (props:UserProps)=>{

    const {data:user} = useSWR(`${api}/user/login`,null,{ 
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        revalidateOnMount: false

    })
    
    const router = useRouter()
    const handleConversationAdded = () => {
        props.setShow(false)
        
        // Emit socket event and refresh page to get updated server data
        socket.emit("conversationAdded")
        router.refresh()
    }
    async function handleClick(){
        
      const room:string =  await axiosPrivate.post(`${api}/chatroom`, {roomName: `${user.username} and ${props.username}`})
          .then(res => {return res.data.roomId})
        
        await axiosPrivate.post(`${api}/userChatRoom`, {roomId: room,userId: props.id})
        
        await axiosPrivate.post(`${api}/userChatRoom`, {roomId: room,userId: user.id})
        
        //props.setShow(false)
        handleConversationAdded()
        
    }
    
    return (
        <div onClick={handleClick}>
            <h1>{props.username}</h1>
        </div>
    )
           
}
