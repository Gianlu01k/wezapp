import React from "react";
import Chat from "./Chat";
import Usercard from "./usercomponents/Usercard";
export default function Sidebar(userarray){
    return(
        <>
            {userarray.users.map((u) =>{console.log(u);<Usercard username={u.username} index={u._id}/>})}
        </>
    )
}