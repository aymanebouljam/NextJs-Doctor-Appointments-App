import { GraduationCap, MapPin } from "lucide-react";
import React from "react";
import { GridLoader, PulseLoader } from "react-spinners";
import BookAppointment from "./BookAppointment";

export default function DoctorDetails({ doctor }) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <>
      <h1 className="font-bold text-xl col-span-full lg:mx-3 mx-auto p-4">
        Details
      </h1>
      {doctor ? (
        <div
          key={doctor?.id}
          href={`/details/${doctor?.doctorumentId}`}
          className="col-span-full flex flex-col mx-8 border rounded-lg p-8 gap-2 lg:flex-row lg:mx-3 xl:col-span-2 xl:h-max  hover:shadow-md"
        >
          <img
            src={baseURL + doctor?.image?.url}
            alt={doctor?.name}
            className=" h-40 w-72 xl:h-56 object-contain"
          />

          {/* Content fills remaining space */}
          <div className="flex flex-col px-4 py-3 gap-3">
            <h4 className="font-bold text-xl mt-2">{doctor?.name}</h4>
            <p className=" text-gray-500 mt-2 flex gap-2">
              <GraduationCap /> {doctor?.years_of_experience} Years of
              Experience
            </p>
            <p className=" text-gray-500 mt-2 flex gap-2">
              <MapPin />
              {doctor?.address}
            </p>
            <h2 className="text-cyan-500 bg-cyan-50 rounded-full self-start py-2 px-2 font-medium my-2 text-sm">
              {doctor?.category?.name}
            </h2>

            <BookAppointment doctor={doctor} />

            <h2 className="font-bold text-xl mt-3">About</h2>
            <p className="text-gray-500">
              Specializing in {doctor?.category?.name}
            </p>
          </div>
        </div>
      ) : (
        <div className="col-span-full flex flex-col mx-8 border rounded-lg p-8 gap-2 lg:flex-row lg:mx-3 xl:col-span-2 xl:h-max  hover:shadow-md animate-pulse">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto" />
          <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto" />
          <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto" />
        </div>
      )}
    </>
  );
}
