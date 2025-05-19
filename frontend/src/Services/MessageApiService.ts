"use server"
import {handleError} from "@/Handlers/handleError";
import {api, axiosPrivate} from "./ApiService";

export const GetAllMesseges = async () => {
    try {
        const data = await axiosPrivate.get(api + "/message")
        return data
    } catch (error) {
        handleError(error)
    }
}

export const GetMessage = async (id: string) => {
    try {
        const data = await axiosPrivate.get(api + `/message/${id}`)
        return data
    } catch
        (error) {
        handleError(error)
    }
}