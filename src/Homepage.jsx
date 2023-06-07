import React from "react";
import Home from "./Home";
import Sidebar from "./Sidebar";
import './sidehome.css'
export default function Homepage(users){
    return(

            <>
                <Sidebar users={users}/>
                <Home/>
            </>

    )
}