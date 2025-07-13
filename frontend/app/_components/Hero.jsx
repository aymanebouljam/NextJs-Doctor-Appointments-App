import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-32">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                Skip the Wait. Book Care Instantly.
              </h2>

              <p className="my-6 text-gray-700">
                Find trusted healthcare professionals, schedule
                appointments in just a few clicks, manage your health
                effortlessly from anywhere.
              </p>
              <Button><Link href='/explore'>Explore Now</Link></Button>
            </div>
          </div>

          <div>
            <img
              src="assets/images/hero.jpg"
              className="rounded-md border-2 border-cyan-700"
              alt="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
