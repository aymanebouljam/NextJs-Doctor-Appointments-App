"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Header() {
  const menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explore",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/contactUs",
    },
  ];

  const { user } = useKindeBrowserClient();


  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <img
          src={"/assets/images/logo.png"}
          width={50}
          height={50}
          alt="logo"
        />

        <ul className="hidden md:flex gap-8">
          {menu.map((item) => (
            <li
              className="hover:text-cyan-500 hover:scale-105 transition-all  cursor-pointer"
              key={item.id}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {user ? (
        <Popover>
          <PopoverTrigger>
            <div className="rounded-full overflow-hidden w-10 h-10">
              <img
                src={"/assets/images/profile.jpg"}
                width={40}
                height={40}
                alt="user photo"
                style={{ objectFit: "cover" }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <ul className="flex flex-col gap-2">
              <li className="hover:bg-cyan-100 font-medium rounded-md px-4 py-2 transition-all ease-in-out cursor-pointer">
                My profile
              </li>
              <li className="hover:bg-cyan-100 font-medium rounded-md px-4 py-2 transition-all ease-in-out cursor-pointer">
                My bookings
              </li>
              <li className="hover:bg-cyan-100 font-bold hover:scale-105 rounded-md px-4 py-2 transition-all ease-in-out cursor-pointer">
                <LogoutLink>Log out</LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <Button>
          <LoginLink>Get started</LoginLink>
        </Button>
      )}
    </div>
  );
}

export default Header;
