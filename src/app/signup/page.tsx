import { createUser } from "./action";

export default function Page(){
return(
    <form action={createUser}>
    <input type="email" className="text-gray-700" placeholder="email" name="email" id="" />
    <input type="text" className="text-gray-700" placeholder="name" name="name" id="" />
    <input type="password" className="text-gray-700" placeholder="password" name="password" id="" />
    <button type="submit">Kayit Ol</button>
</form>
)
}