"use client";

import React, { useEffect, useState } from "react";
import api from "../_utils/API";
import Image from "next/image";
import { BeatLoader } from "react-spinners";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDoctors()
      .then((res) => {
        setDoctors(res.data.data);
        console.log(res.data?.data);
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-8 mb-10 flex flex-col">
      <h2 className="font-bold text-center text-3xl mb-2">
        <span className="text-cyan-500 text-center">Popular </span> Doctors
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-10 gap-4 items-stretch">
        {loading ? (
          <div className="text-center col-span-3">
            <BeatLoader />
          </div>
        ) : (
          doctors.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col border rounded-lg mx-auto w-full max-w-sm h-full"
            >
              <Image
                src={baseURL + doc?.image?.url}
                alt={doc.name}
                width={500}
                height={300}
                className="w-full h-48 object-contain"
              />

              {/* Content fills remaining space */}
              <div className="flex flex-col px-4 py-3 flex-1">
                <h2 className="text-cyan-500 bg-cyan-100 rounded-full self-start px-3 py-2 font-bold my-2 text-sm">
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

                <h3 className="mt-auto border p-2  cursor-pointer border-cyan-600 hover:bg-cyan-50 transition-all ease-in-out font-semibold text-center w-full">
                  Book Now
                </h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
