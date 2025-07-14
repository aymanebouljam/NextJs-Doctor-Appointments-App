"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import API from "@/app/_utils/API";
import { toast } from "sonner";

export default function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const { user, getToken } = useKindeBrowserClient();
  const token = getToken();

  const generateTimeSlot = (start, end, period) => {
    const slots = [];
    for (let i = start; i <= end; i++) {
      const hour = i < 10 ? `0${i}` : i;

      slots.push(`${hour}:00 ${period}`, `${hour}:30 ${period}`);
    }

    return slots;
  };

  useEffect(() => {
    setTimeSlot([
      ...generateTimeSlot(9, 12, "am"),
      ...generateTimeSlot(2, 5, "pm"),
    ]);
  }, []);

  const book = () => {
    if (user && doctor && date && selectedTime) {
      API.bookAppointment({
        data: {
          user_name: `${user?.given_name} ${user?.family_name}`,
          email: user?.email,
          date: date,
          time: selectedTime,
          doctor: doctor?.documentId,
        },
      })
        .then((res) => {
          if (res) {
            toast("Appoitment has been booked.");
          }
        })
        .catch((err) => console.error(err.message));
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <h3 className="mt-auto py-2.5 px-4 rounded-full  cursor-pointer  bg-cyan-700 text-white transition-all ease-in-out font-medium hover:bg-cyan-600  self-start tex-center text-sm">
          Book Appointment
        </h3>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="p-3">Book Appointment</DialogTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
            <div className="mx-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ before: new Date() }}
                className="rounded-lg border cursor-pointer h-full"
              />
            </div>
            <div>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                {timeSlot.map((time, index) => (
                  <span
                    key={index}
                    className={`border rounded-full p-2 text-center text-sm cursor-pointer hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-700 ${
                      selectedTime === time &&
                      "bg-cyan-50 text-cyan-700 border-cyan-700 "
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Button
            disabled={!(date && selectedTime)}
            className="bg-white border border-cyan-500 text-cyan-600 hover:text-white mt-3 w-full xl:w-1/2 mx-auto"
            onClick={book}
          >
            Book Now
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
