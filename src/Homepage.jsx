import React from "react";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import Home from "./Home";
import Sidebar from "./Sidebar";
export default function Homepage(){
    return(

            <>
            <Home/><Sidebar/>
            </>

    )
}