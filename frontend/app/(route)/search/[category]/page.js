"use client";
import API from "@/app/_utils/API";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, use, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function Search({ params }) {
  const { category } = use(params);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    if (category) {
      API.getDoctorsByCategory(category)
        .then((res) => {
          setDoctors(res.data?.data);
        })
        .catch((err) => console.error(err.message))
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 300);
        });
    }
  }, [category]);

  return (
    <>
    <h1 className=" col-span-full font-bold text-cyan-500 text-lg px-3">{category}</h1>
      {loading ? (
        <div className="text-center col-span-3 flex items-center justify-center">
          <BeatLoader />
        </div>
      ) : (
        doctors.map((doc) => (
          <Link
            key={doc.id}
            href={`/details/${doc.documentId}`}
            className="max-w-xs sm:max-w-sm md:max-w-md border rounded-lg m-3 overflow-hidden 
                 cursor-pointer 
                 hover:scale-105 transition-all ease-out mx-auto"
          >
            <Image
              src={baseURL + doc?.image?.url}
              alt={doc.name}
              width={500}
              height={300}
              className="w-full h-48 object-contain"
            />

            <div className="px-4 py-3 flex flex-col items-baseline text-sm">
              <h2 className="text-cyan-500 bg-cyan-100 rounded-full p-2 font-bold my-2 text-sm">
                {doc?.category?.name}
              </h2>
              <h4 className="font-semibold mt-2">
                <span className="text-cyan-500">Name: </span>
                {doc?.name}
              </h4>
              <p className="font-semibold mt-2">
                <span className="text-cyan-500">Years of experience: </span>
                {doc?.years_of_experience}
              </p>
              <p className="font-semibold mt-2">
                <span className="text-cyan-500">Phone: </span>
                {doc?.phone}
              </p>
              <p className="font-semibold mt-2">
                <span className="text-cyan-500">Address: </span>
                {doc?.address}
              </p>

              <h3 className="border p-2 mt-3 cursor-pointer border-cyan-600 hover:bg-cyan-50 transition-all ease-in-out font-semibold text-center w-full">
                Book Now
              </h3>
            </div>
          </Link>
        ))
      )}
    </>
  );
}
