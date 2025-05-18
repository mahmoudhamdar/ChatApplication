"use client"


import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {loginApi} from "@/Services/UserApiService";
import {useUser} from "@/Stores/Providers/UserStoreProvider";
import {api, axiosPrivate} from "@/Services/ApiService";
import {UserProfileToken} from "@/Models/User";

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

    const onSubmit = async (values: Values) => {
        try {
           
            const response:UserProfileToken = await axiosPrivate.post<UserProfileToken>(`${api}/user/login`, {
                username: values.username,
                password: values.password,})
            .then((re:any) => re.data)
            if (response && response && response.id) {
                setUser(response);
                router.push("/account")
                
            } else {
                console.error("Login failed: Response or ID is undefined");
                // You might want to show an error message to the user here
            }
        } catch (error) {
            console.error("Login error:", error);
            // Handle login error (show message to user)
        }
       
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Login to your account</p>

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

                    <button  type="submit" className="auth-button">Login</button>

                    <div className="auth-footer">
                        <span>Don't have an account? </span>
                        <Link href="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};