"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ConfirmDeletion from "./ConfirmDeletion";
import API from "@/app/_utils/API";
import { toast } from "sonner";

export default function MyBookingList({ myBookings, status, fetchMyBookings }) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [filteredBookings, setFilteredBookings] = useState(null);

  useEffect(() => {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    setFilteredBookings(
      myBookings?.filter((booking) => {
        if (!booking?.date) return false;

        if (status === "upcoming") return booking?.date >= currentDate;

        if (status === "past") return booking?.date < currentDate;
      })
    );
  }, [myBookings, status]);

  const cancelBooking = (id) => {
    API.deleteAppointment(id)
      .then((res) => {
        if (res) {
          toast("Appoitment has been canceled.");
          fetchMyBookings();
        }
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div className="max-w-lg space-y-4">
      {filteredBookings?.map((booking) => (
        <div
          key={booking?.id}
          className="flex items-center gap-4 p-4 rounded-xl shadow-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700"
        >
          <img
            src={baseURL + booking?.doctor?.image?.url}
            alt="Doctor"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {booking?.doctor?.name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {booking?.doctor?.phone}
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
              {booking?.date} at {booking?.time}
            </span>
          </div>
          {status === "upcoming" && (
            <div className="ml-auto self-baseline">
              <ConfirmDeletion
                id={booking?.documentId}
                cancelBooking={cancelBooking}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
