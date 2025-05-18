"use client"
import {api, axiosPrivate} from "@/Services/ApiService";
import {User} from "@/components/User/User";
import {useState} from "react";
import {UserProfileToken} from "@/Models/User";
import {useRouter} from "next/navigation";
import {useUser} from "@/Stores/Providers/UserStoreProvider";


export interface user {
    
    userId: string,
    username: string
    
}

 
export const AddConversation = () => {
    
   const [show,setShow] = useState(false)
    const {user} = useUser()
    
    async function fetchUsers() {
        
        const users:UserProfileToken[]= await axiosPrivate.get(`${api}/user/noChatRoomUsers/${user.id}`)
            .then(response => response.data);
        return users
        
        
    }
    
   const [users,setUsers] = useState<UserProfileToken[]>([])
  async  function handleClick() {
      
        const users:UserProfileToken[] = await fetchUsers()
        console.log(users)
       console.log(user)
        const userd:UserProfileToken[]=users.filter((User:UserProfileToken) => User.username !== user.username)
        setUsers(userd)
        setShow(!show)
       
  } 
    
    
    return (
        <div >
            
            <button onClick={handleClick}>Add Conversation</button>

            {users.map(user => <User id={user.id} username={user.username} key={user.id} email={""} token={""} />
            )} 
           
        
        </div>
    );
};