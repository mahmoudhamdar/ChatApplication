"use client"


import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useUser} from "@/Stores/Providers/UserStoreProvider"; 
import {UserProfileToken} from "@/Models/User";
import {api, axiosPrivate} from "@/Services/ApiService";

import useSWRMutation from 'swr/mutation'
import {useSWRConfig} from "swr";

export const SignIn = () => {

    type Values = {
        username: string
        password: string
    }
    const {setUser}=useUser()
    const router =useRouter()
    const schema = z.object({
        username: z.string(),
        password: z.string().min(7).max(30),
    }).required()

    const {register, handleSubmit, formState: {errors}} = useForm<Values>({
        resolver: zodResolver(schema),
    });

    // Add loading and error states
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState("")

    

    // Use useSWRMutation for POST requests triggered manually
    const { trigger: loginUser, isMutating: isLoading, error } = useSWRMutation(
        `${api}/user/login`,
        async (url: string, { arg }: { arg: Values }) => {
            const response = await axiosPrivate.post<UserProfileToken>(url, {
                username: arg.username,
                password: arg.password
            })
            return response.data
        }
    )

    const {mutate} = useSWRConfig()
    const onSubmit = async (values: Values) => {
        try {
            
            
            const user = await loginUser(values)

            if (user && user.id) {
                await mutate(`${api}/user/login`, user, { revalidate: false })
                
                router.push(`/account/${user.username}`)
                
            } else {
                console.error("Login failed: Invalid response")
            }
        } catch (error) {
            console.error("Login error:", error)
        }
       
    };

    // Remove the automatic SWR call since we're using useSWRMutation
    // const {data:user}=useSWR(`${api}/user/login`, async ()=>{
    //     return  await axiosPrivate.post<UserProfileToken>(`${api}/user/login`, {
    //         username: values.username,
    //         password: values.password
    //     }) .then(res => res.data);
    // },{
    //     revalidateIfStale: false,
    //     dedupingInterval: 10000
    // })
       
            
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Login to your account</p>

                {error && (
                    <div className="error-message">
                        {error.message || "Login failed. Please try again."}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>username</label>
                        <input type="text" placeholder={"enter your username"} {...register("username")} />
                        {errors.username && <p>{errors.username?.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>password</label>
                        <input placeholder={"enter your password"} {...register("password")} type="password"/>
                        {errors.password && <p>{errors.password?.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    <div className="auth-footer">
                        <span>Don't have an account? </span>
                        <Link href="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};