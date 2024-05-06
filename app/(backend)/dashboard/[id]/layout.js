"use client";
import Sidebar from "@/components/Test";
import { SidebarItem } from "@/components/sidebar-item";
import { LogOut, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const session = useSession();
  const { status } = session;
  if (status === "unauthenticated") {
    console.log("hahah");
    redirect("/login");
  }
  console.log(status);
  return (
    <div className="flex h-screen flex-col md:flex-row md_overflow-hidden">
      <div className="hidden md:flex h-screen w-56 flex-col fixed  z-50 justify-between border-r">
        <Sidebar />

        <button
          onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
          type="button"
          className="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-500 hover:bg-slate-300/20"
        >
          <div className="flex items-center gap-x-2 py-4">
            <LogOutIcon size={22} className="text-slate-500" />
            Logga ut
          </div>
          <div className="ml-auto opacity-0 border-2 border-sky-700 h-full transition-all" />
        </button>
      </div>
      <div className="flex-grow ml-56 md:overflow-y-auto">{children}</div>
    </div>
  );
}
