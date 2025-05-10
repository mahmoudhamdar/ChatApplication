import {useEffect, useState} from "react"
import {useUserStoreContext} from "../../Stores/Providers/UserStoreProvider"
import "..//ChatRoom/ChatRooms.css"
import {GetAllUsers} from "../../Services/UserApiService.ts";
import {User} from "./User.tsx";

type User = {
    userId: string,
    userName: string


}
export const Users = () => {
    const [users, setUsers] = useState<User[]>([])
    const [activeChatRoomId, setActiveChatRoomId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const {user} = useUserStoreContext()

    useEffect(() => {
        setIsLoading(true)
        GetAllUsers()
            .then((response) => {
                // @ts-ignore
                setUsers(response.data)
                // @ts-ignore
                if (response.data.length > 0 && !activeChatRoomId) {
                    // @ts-ignore
                    setActiveChatRoomId(response.data[0].roomId)
                }
            })
            .catch((error) => {
                console.error("Error fetching chat rooms:", error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <div className="chat-rooms-container">
            <div className="user-header">
                <h2>{user?.username || "Chat App"}</h2>
                <span className="status-indicator">Online</span>
            </div>

            <h3 className="chat-rooms-title">USERS </h3>

            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : users.length === 0 ? (
                <div className="no-rooms-message">No chat rooms available</div>
            ) : (
                <div className="chat-rooms-list">
                    {users.map((user) => (
                        <User
                            key={user.userId}
                            userId={user.userId}
                            userName={user.userName}
                            isActive={activeChatRoomId === user.userId}
                            setActiveChatRoom={setActiveChatRoomId}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
