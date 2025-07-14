"use client";

import React, { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import API from "@/app/_utils/API";
import Link from "next/link";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    API.getCategories()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full px-3 lg:w-[250px] lg:p-0 ">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories">
            {loading ? (
              <div className="text-center">
                <ClipLoader />
              </div>
            ) : (
              categories.map((cat) => (
                <CommandItem key={cat?.id}>
                  <Link
                    href={`/search/${cat?.name}`}
                    className="flex items-center gap-3 w-full h-full hover:bg-cyan-"
                  >
                    <Image
                      src={baseURL + cat?.icon[0]?.url}
                      alt={cat?.name}
                      width={30}
                      height={30}
                    />
                    <span>{cat?.name}</span>
                  </Link>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
