"use client";
import React from "react";
import { SidebarRoutes } from "./sidebar-routes";
import { Logo } from "./Logo";
import {
  Compass,
  Layout,
  Building2,
  Scissors,
  Clock4,
  LandPlot,
  LogOut,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const Sidebar = () => {
  return (
    <div className="flex border-white flex-col h-screen justify-between bg-red-500">
      <div className="p-6 bg-red-500">
        <Logo />
      </div>
      <div className="">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
