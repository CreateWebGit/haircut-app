"use client";
import {
  Compass,
  Layout,
  Building2,
  Scissors,
  Clock4,
  LandPlot,
  LogOut,
  LogOutIcon,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname, useRouter } from "next/navigation";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  console.log(pathname);
  const t = pathname.split("/");
  const id = t[2];
  console.log(t[2]);

  const guestRoutes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: `/dashboard/${id}`,
    },
    {
      icon: Building2,
      label: "Salong",
      href: `/dashboard/${id}/salong`,
    },
    {
      icon: Scissors,
      label: "Behandlingar",
      href: `/dashboard/${id}/behandlingar`,
    },
    {
      icon: Clock4,
      label: "Öppettider",
      href: `/dashboard/${id}/oppettider`,
    },
    {
      icon: LandPlot,
      label: "Adress",
      href: `/dashboard/${id}/kontakt`,
    },
  ];

  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full items-stretch justify-between h-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
