"use client";

import React, { useEffect, useState } from "react";
import api from "../_utils/API";
import Image from "next/image";
import Link from "next/link";

export default function SearchCategories() {
  const [categories, setCategories] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    api
      .getCategories()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="px-8 mb-10 flex flex-col">
      <h2 className="font-bold text-center text-3xl mb-2">
        <span className="text-cyan-500 text-center">Search </span> Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 mt-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col text-center items-center gap-3 p-5 bg-cyan-50 m-2 rounded-lg hover:scale-110 transition-all ease-in-out hover:shadow-sm cursor-pointer"
          >
            <Link href={`/search/${cat?.name}`}>
              <Image
                src={baseURL + cat?.icon[0]?.url}
                alt={cat.name}
                width={70}
                height={70}
              />
              <span>{cat?.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
