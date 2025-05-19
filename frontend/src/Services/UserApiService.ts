import {handleError} from "@/Handlers/handleError";
import {api, axiosPrivate} from "./ApiService";
import {UserProfileToken} from "@/Models/User";


export const loginApi = async (username: string, password: string) => {


    try {
        const data = await axiosPrivate.post<UserProfileToken>(`${api}/user/login`, {
            username: username,
            password: password,
        })


        return data
    } catch (error) {
        handleError(error)
        throw error; // Re-throw the error so it can be caught by the caller
    }
}
export const registerApi = async (email: string, username: string, password: string) => {

    try {

        const data = await axiosPrivate.post<UserProfileToken>(`${api}/user/register`, {
            username: username,
            password: password,
            email: email,
        })


        return data
    } catch (error) {

        handleError(error)
    }
}


export const GetAllUsers = async () => {
    try {
        const data = await axiosPrivate.get(api + "/user", {
            withCredentials: true,
        })
        return data
    } catch (error) {
        handleError(error)
    }


}