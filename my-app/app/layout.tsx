import type { Metadata } from "next";
import "./globals.css";
import SignUp from "./components/connection/SignUp";
import SignIn from "./components/connection/SignIn";
import SignOutButton from "./components/connection/SignOutButton";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import UserSession from "./components/connection/UserSession";


export const metadata: Metadata = {
  title: "Adaverse",
  description: "Group project by Guigui, Ursula, Flo et Xinzhu",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawSession = await auth.api.getSession({headers: await headers()});

  const session = rawSession?.user 
? {id:rawSession.user.id,name:rawSession.user.name, email:rawSession.user.email}
: null;
  return (
    <html lang="en">
      <body
      > 
      <nav className= "flex flex-row justify-end gap-4 p-4">
           <UserSession session={session}/>
      </nav>
        {children}
      </body>
    </html>
  );
}
