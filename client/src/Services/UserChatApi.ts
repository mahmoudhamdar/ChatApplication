"use server"
import {api, axiosPrivate} from "./ApiService";
import {handleError} from "@/Handlers/handleError";

export const GetAllUserChatrooms = async () => {
    try {
        const data = await axiosPrivate.get(api + "/UserChatRoomApi")
        return data
    } catch (error) {
        handleError(error)
    }


}
export const GetChatRoom = async (id: string) => {
    try {
        const data = await axiosPrivate.get(api + `/UserChatRoomApi${id}`)
        return data
    } catch
        (error) {
        handleError(error)
    }
}

export const ChatUserRoomPost = async (roomId: string, userId: string) => {

    try {
        const data = await axiosPrivate.post(api + "/UserChatRoomApi", {
            RoomId: roomId,
            UserId: userId,
        })
        return data.data
    } catch (error) {
        handleError(error)
    }

}