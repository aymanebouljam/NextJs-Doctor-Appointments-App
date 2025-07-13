import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Newsletter() {
  return (
    <div className="mb-10 items-center flex flex-col px-3">
       <h2 className="font-bold text-center text-3xl mb-7">
          <span className="text-cyan-500 text-center">Our </span> Newsletter
        </h2>
      <div className="flex w-full items-center max-w-sm gap-2">
        <Input type="email" placeholder="Email" />
        <Button>Subscribe</Button>
      </div>
    </div>
  );
}

export default Newsletter;
