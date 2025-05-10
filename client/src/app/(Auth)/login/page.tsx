
import "@/homeAuthCSS/Auth.css"

import {SignIn} from "@/components/Auth/SignIn";
import {UseUser} from "@/Stores/StoreUses/UseUser";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginApi} from "@/Services/UserApiService";
import Link from "next/link";
import {api, axiosPrivate} from "@/Services/ApiService";
import {UserProfileToken} from "@/Models/User";
import {handleError} from "@/Handlers/handleError";


export default   function login () {
  

  

    return (
        <SignIn/>
    );
};





