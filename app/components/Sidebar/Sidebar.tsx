"use client"

import React from 'react'
import { useSession } from "next-auth/react";


import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_ITEMS } from "../../constants";
import { SidebarItem } from "../../types";

//@ts-ignore
const Sidebar = () => {

    const { data: session, status } = useSession()

    return (
        <div className="md:w-60 bg-primary-300 h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex z-50">
        <div className="flex flex-col space-y-6 w-full">
            <div
            className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
            >
            <span className="font-bold text-xl hidden md:flex text-white">Garage Web Portal</span>
            </div>
            {(status === "authenticated") &&
                <div className="flex flex-col space-y-2  md:px-6 ">
                {SIDEBAR_ITEMS.map((item, idx) => {
                  return <MenuItem key={idx} item={item} />
                })}
              </div>
            }
        </div>
        </div>


    )
}

export default Sidebar

const MenuItem = ({ item }: { item: SidebarItem }) => {
    const pathname = usePathname();
  
    return (
      <div className="">
          <Link
            //@ts-ignore
            href={item.path}
            className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-primary-200 text-white ${
              item.path === pathname ? 'bg-primary-200 text-black' : ''
            }`}
          >
            {item.icon}
            <span className="font-semibold text-xl flex text-white">{item.title}</span>
          </Link>
      </div>
    );
  };