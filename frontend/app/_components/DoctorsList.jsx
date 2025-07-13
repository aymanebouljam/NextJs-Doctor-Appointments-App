"use client";

import React, { useEffect, useState } from "react";
import api from "../_utils/API";
import Image from "next/image";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    api
      .getDoctors()
      .then((res) => {
        setDoctors(res.data.data);
        console.log(res.data?.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="px-8 mb-10 flex flex-col">
      <h2 className="font-bold text-center text-3xl mb-2">
        <span className="text-cyan-500 text-center">Popular </span> Doctors
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  mt-10">
        {doctors.map((doc) => (
          <div key={doc.id} className="border rounded-lg m-3 overflow-hidden hover:shadow-xl hover-shadow-cyan-300 cursor-pointer hover:scale-105 transition-all ease-out ">
            <Image
              src={baseURL + doc?.image?.url}
              alt={doc.name}
              width={500}
              height={200}
              className="w-full h-[400px] object-cover object-top"
            />
            <div className="px-4 py-3 flex flex-col items-baseline">
              <h2 className="text-cyan-500 bg-cyan-100 rounded-full p-3 font-bold my-2">
                {doc?.category?.name}
              </h2>
              <h4 className="font-semibold mt-2">
                <span className="text-cyan-500 text-md">Name: </span>
                {doc?.name}
              </h4>
              <p className="font-semibold mt-2">
                <span className="text-cyan-500 text-md">
                  Years of experience:{" "}
                </span>
                <span>{doc?.years_of_experience}</span>
              </p>
              <p className="font-semibold mt-2">
                <span className="text-cyan-500 text-md">Phone: </span>
                <span>{doc?.phone}</span>
              </p>
              <p className="font-semibold mt-2">
                <span className="text-cyan-500 text-md">Address: </span>
                <span>{doc?.address}</span>
              </p>

              <h3 className="border-[1px] p-3 mt-3 cursor-pointer border-cyan-600 hover:bg-cyan-100 hover:scale-105 transition-all ease-in-out font-semibold">
                Book Now
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
