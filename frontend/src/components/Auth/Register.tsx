
"use client"

import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


import Link from "next/link";
import {api, axiosPrivate} from "@/Services/ApiService";
import {UserProfileToken} from "@/Models/User";
import {useUser} from "@/Stores/Providers/UserStoreProvider";

export const Register = () => {
    type Values = {
        username: string
        email: string
        password: string
        confirmPassword: string
    }
    const {setUser} = useUser()
    const router =useRouter()
    const schema = z.object({
        username: z.coerce.string(),
        email: z.coerce.string().email(),
        password: z.coerce.string().min(7).max(30),
        confirmPassword: z.coerce.string().min(7).max(30),
    }).required().refine((data: { password: string; confirmPassword: string; }) => data.password === data.confirmPassword,
        {
            message: "Passwords don't match",
            path: ["confirmPassword"],
        }
    )


    const {register, handleSubmit, formState: {errors}} = useForm<Values>({
        resolver: zodResolver(schema)
    });


    const onSubmit = async (value: Values) => {
        console.log(value);

        const response:UserProfileToken = await axiosPrivate.post<UserProfileToken>(`${api}/user/register`, {
            username: value.username,
            password: value.password,
            email: value.email,
        })        
        .then(res => {
            setUser(res.data)
            return res.data;
        });
        console.log(response);
      
        
        router.push(`/account/${response.id}`)

    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join our community</p>

                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type={"text"} placeholder={"UserName"} {...register("username")}  />
                        <p>{errors.username?.message}</p>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type={"text"} placeholder={"Email"} {...register("email")}  />
                        <p>{errors.email?.message}</p>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type={"password"} placeholder={"Password"} {...register("password")}  />
                        <p>{errors.password?.message}</p>
                    </div>

                    <div className="form-group">
                        <label>ConfirmPassword</label>
                        <input type={"password"} placeholder={"ConfirmPassword"} {...register("confirmPassword")}  />
                        <p>{errors.confirmPassword?.message}</p>
                    </div>


                    <button type="submit" className="auth-button">Register</button>

                    <div className="auth-footer">
                        <span>Already have an account? </span>
                        <Link href="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};