import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image
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

      <Button>Get started</Button>
    </div>
  );
}

export default Header;
