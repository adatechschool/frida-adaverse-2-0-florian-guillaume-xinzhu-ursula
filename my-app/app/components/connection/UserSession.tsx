"use client"
import SignIn from "./SignIn";
import SignOutButton from "./SignOutButton";
import SignUp from "./SignUp";
import { User } from "lucide-react";

export default function UserSession({session}){
     if(!session){
        return (
            <div className="flex gap-4">
                <SignIn/>
                <SignUp/>
            </div>
        )
     }
     return(
        <div className="flex items-center gap-2">
            <User  className="w-6 h-6 text-ada-red" />
            <span>{session.name}</span>
            <SignOutButton/>
        </div>
     )
}