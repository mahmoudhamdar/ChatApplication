"use server"

import {handleError} from "@/Handlers/handleError";
import {api, axiosPrivate} from "./ApiService";

export const GetAllChatrooms = async () => {
    
        let callCount = 0; // Debugging variable
            try {
                callCount++;
                console.log("GetAllChatrooms called: ", callCount);
                const data = await axiosPrivate.get(api + "/chatroom");
                return data;
            } catch (error) {
                handleError(error);
            }
}
export const GetChatRoom = async (id: string) => {
    try {
        const data = await axiosPrivate.get(api + `/chatroom/${id}`)
        return data
    } catch
        (error) {
        handleError(error)
    }
}

export const ChatRoomPost = async (chatRoomName: string) => {

    try {
        const data = await axiosPrivate.post(api + "/chatroom", {
            RoomName: chatRoomName,
            CreatedAt: new Date().toISOString(),
        })
        return data.data
    } catch (error) {
        handleError(error)
    }

}