"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import API from "@/app/_utils/API";

export default function DoctorsSuggestion() {
  const [doctors, setDoctors] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getDoctors()
      .then((res) => {
        setDoctors(res.data.data);
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-8 lg:px-2 flex flex-col col-span-full xl:col-span-1">
      <h2 className="font-bold text-lg my-4">Suggestions</h2>

      <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-3 xl:grid-cols-1">
        {doctors.slice(0, 5).map((doc) => (
          <Link
            key={doc.id}
            href={`/details/${doc?.documentId}`}
            className="flex flex-col gap-3  xl:flex-row border rounded-lg items-center lg:hover:scale-105 transition-all ease-in-out w-full pt-2 lg:justify-center xl:p-4 xl:gap-3"
          >
            <Image
              src={baseURL + doc?.image?.url}
              alt={doc.name}
              width={500}
              height={300}
              className="h-28 w-28 object-contain"
            />

            {/* Content fills remaining space */}
            <div className="flex flex-col py-3  gap-2">
              <h2 className="text-cyan-500 bg-cyan-100 rounded-full self-start px-3 py-2 font-semiBold text-sm">
                {doc?.category?.name}
              </h2>

              <h4 className="font-bold text-sm">{doc?.name}</h4>
              <p className="font-medium text-sm text-gray-600 mt-2">
                {doc?.years_of_experience} Years of experience
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
