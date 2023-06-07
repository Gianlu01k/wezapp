import React, {useState} from "react";
import Usercard from "./usercomponents/Usercard";
export default function Sidebar({userarray}){

    const list = userarray.map((el) => <Usercard username={el.username} key={el._id}/>)
    return(
          <div className={"card-container"}>
              {list}
          </div>

    )
}