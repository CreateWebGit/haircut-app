"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [isUserNav, setUserNav] = useState();

  const { data: session } = useSession(false);

  const role = session?.user?.role;

  console.log("me session: ", session?.user);

  return (
    <div className="flex items-center justify-between m-0 py-8 w-full border-b border-slate-200 relative">
      <div className="flex">
        <Link href="/">
          <div className="ml-8 mr-64">Logo</div>
        </Link>
        <div className="flex gap-2">
          <Link href="/haha">link1</Link>
          <Link href="/haha">link2</Link>
          <Link href="/haha">link3</Link>
        </div>
      </div>

      {session ? (
        <div className="mr-8 cursor-pointer underline">
          <div onClick={() => setUserNav(!isUserNav)}>{session?.user.name}</div>
        </div>
      ) : (
        <div className="flex mr-4 gap-2">
          <Link
            className="bg-red-800 text-fuchsia-50 px-4 py-2 rounded-2xl"
            href="/registrera"
          >
            Skapa konto
          </Link>
          <Link className="px-4 py-2" href="/login">
            Logga in
          </Link>
        </div>
      )}

      {isUserNav ? (
        <div className="absolute bottom-0 right-0 border mb-[-30px] mr-4 py-2 px-2 bg-slate-100">
          {role === "admin" ? (
            <div>
              <Link href="/users">Användare</Link>
            </div>
          ) : (
            <div>
              <Link href="/profile">Profil</Link>
            </div>
          )}
          <button onClick={() => signOut()}>Logga ut</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
