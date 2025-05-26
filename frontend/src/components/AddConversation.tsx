"use client"
import {api, axiosPrivate} from "@/Services/ApiService";
import {User} from "@/components/User/User";
import {useState} from "react";
import {UserProfileToken} from "@/Models/User";
import {useRouter} from "next/navigation";
import {useUser} from "@/Stores/Providers/UserStoreProvider";
import useSWR from "swr";


export interface user {
    
    userId: string,
    username: string
    
}
interface AddConversationProps{
    users: UserProfileToken[]
}
 
export const AddConversation = (props: AddConversationProps) => {


    const {data:user} = useSWR(`${api}/user/login`,null,{
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        revalidateOnMount: false

    })
    const [users,setUsers] = useState<UserProfileToken[]>([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState<boolean>(true)
    async function fetchUsers() {
        
        const users:UserProfileToken[]= await axiosPrivate.get(`${api}/user/noChatRoomUsers/${user.id}`)
            .then(response => response.data);
        return users
        
        
    }
    
    
    const router= useRouter()
    
  async  function handleClick() {
      try {
        setLoading(true)
       
        console.log("Users fetched:", users)

        
        setUsers(props.users)
        console.log("Filtered users:", users)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
          setShow(true)
         
      }
  } 
     
    
    return (
        <div >
            
            <button onClick={handleClick}>Add Conversation</button>
            <div>
            {loading ? (
              <p>Loading users...</p>
            ) : (show && users.map((user:UserProfileToken) => {
                return <User id={user.id} username={user.username} key={user.id} email={""} token={""} show={show} setShow={setShow} />}
            )
            )}
               
            </div>
        
        </div>
    );
};