'use client'
export default function SignoutButton(){
    const handleSignout = async()=>{
        await fetch('/api/signout')
       }
    return(
        <button onClick={handleSignout}>Signout</button>
    )
}