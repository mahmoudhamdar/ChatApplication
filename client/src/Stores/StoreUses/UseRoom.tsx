

import {useRoomStoreContext} from "@/Stores/Providers/RoomStoreProvider";


export default function UseRoom() {


    const {roomId,roomName,setRoomId,setRoomName} = useRoomStoreContext()
    return {roomId,roomName,setRoomId,setRoomName}
}
