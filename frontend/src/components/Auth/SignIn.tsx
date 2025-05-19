"use client"


import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {loginApi} from "@/Services/UserApiService";
import {useUser} from "@/Stores/Providers/UserStoreProvider";
import {useState} from "react";

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

    const onSubmit = async (values: Values) => {
        setIsLoading(true)
        setError("")

        try {
            const response = await loginApi(values.username, values.password)

            if (response?.data && response.data.id) {
                setUser(response.data)
                router.push("/account")
                
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