import React from "react";

export default function Usercard(props){
    return(
        <div className={"user-card"}>
            <p>{props.username}</p>
        </div>
    )
}