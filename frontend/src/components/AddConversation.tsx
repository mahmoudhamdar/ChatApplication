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
    
  // const [show,setShow] = useState(true)
    const {user} = useUser()
    const [users,setUsers] = useState<UserProfileToken[]>([])
    const [loading, setLoading] = useState(false)

    async function fetchUsers() {
        
        const users:UserProfileToken[]= await axiosPrivate.get(`${api}/user/noChatRoomUsers/${user.id}`)
            .then(response => response.data);
        return users
        
        
    }
    
    
    const router= useRouter()
    
  async  function handleClick() {
      try {
        setLoading(true)
        const users:UserProfileToken[] = await fetchUsers()
        console.log("Users fetched:", users)

        const userd:UserProfileToken[] = users.filter((User:UserProfileToken) => User.username !== user.username)
        console.log("Filtered users:", userd)
        setUsers(userd)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
  } 
     
    
    return (
        <div >
            
            <button onClick={handleClick}>Add Conversation</button>
            <div>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              users.map((user:UserProfileToken) => {
                return <User id={user.id} username={user.username} key={user.id} email={""} token={""} />}
              )
            )}
               
            </div>
        
        </div>
    );
};