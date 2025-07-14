"use client";
import API from "@/app/_utils/API";
import React, { useEffect, useState, use } from "react";
import DoctorDetails from "./_components/DoctorDetails";
import DoctorsSuggestion from "./_components/DoctorsSuggestion";

export default function Details({ params }) {
  const [doctor, setDoctor] = useState(null);
  const { id } = use(params);

  useEffect(() => {
    if (id) {
      API.getDoctorDetails(id)
        .then((res) => {
          setDoctor(res.data?.data);
        })
        .catch((err) => console.error(err.message));
    }
  }, [id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 ">
      <DoctorDetails doctor={doctor} />
      <DoctorsSuggestion />
    </div>
  );
}
