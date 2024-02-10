import { loginUser } from "./action";

export default function Page(){
    return(
        <form action={loginUser}>
            <input type="email" className="text-gray-700" name="email"/>
            <input type="password" className="text-gray-700" name="password"/>
            <button type="submit">Giris Yap</button>
        </form>
    )
}