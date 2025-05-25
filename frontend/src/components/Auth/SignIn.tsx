"use client"


import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useUser} from "@/Stores/Providers/UserStoreProvider";
import {useState} from "react";
import {UserProfileToken} from "@/Models/User";
import {api, axiosPrivate} from "@/Services/ApiService";
import useSWR from "swr";

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
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const [values,setValues] = useState<Values>()
    
    
    
    const onSubmit = async (values: Values) => {
        setIsLoading(true)
        setError("")
        

        try {
            
            setValues(values)
          const user =  await axiosPrivate.post<UserProfileToken>(`${api}/user/login`, {
                username: values?.username,
                password: values?.password
            }).then(res => res.data)
            
            if (user && user.id) {
                setUser(user)
                router.push(`/account/${user.username}`)
                
            } else {
                setError("Login failed. Please check your credentials.")
                console.error("Login failed: Invalid response")
            }
        } catch (error) {
            setError("Network error. Please try again later.")
            console.error("Login error:", error)
        } finally {
            setIsLoading(false)
        }
       
    };
    const {data:user}=useSWR(`${api}/user`, async ()=>{
        return  await axiosPrivate.post<UserProfileToken>(`${api}/user/login`, {
            username: values?.username,
            password: values?.password
        }).then(res => res.data)
    })

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Login to your account</p>

                {error && (
                    <div className="error-message">
                        {error}
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