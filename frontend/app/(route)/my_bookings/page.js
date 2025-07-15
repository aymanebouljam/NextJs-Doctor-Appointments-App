"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyBookingList from "./_components/MyBookingList";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import API from "@/app/_utils/API";

export default function MyBooking() {
  const [myBookings, setMyBookings] = useState(null);

  const { user } = useKindeBrowserClient();

  const fetchMyBookings = () => {
    if (user) {
      API.myBookingList(user?.email)
        .then((res) => {
          setMyBookings(res.data?.data);
        })
        .catch((err) => console.error(err.message));
    }
  };

  useEffect(() => {
    fetchMyBookings()
  }, [user]);

  return (
    <div className="px-4 mt-4 min-h-screen">
      <h2 className="font-bold text-2xl">My Bookings</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-8">
        <TabsList className="w-full">
          <TabsTrigger value="upcoming">UpComing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {myBookings && (
            <MyBookingList myBookings={myBookings} status="upcoming" fetchMyBookings={fetchMyBookings} />
          )}
        </TabsContent>
        <TabsContent value="past">
          {myBookings && (
            <MyBookingList myBookings={myBookings} status="past" fetchMyBookings={fetchMyBookings}/>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
