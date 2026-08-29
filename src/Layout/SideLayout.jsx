import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "../Components/Shared/Sidebar/Sidebar";
import { Outlet } from "react-router";

export default function SideLayout() {
  
  return (
    <>
      <div className="flex relative pb-15">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
