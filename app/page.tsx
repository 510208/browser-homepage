// import { useState, useEffect } from "react";

import Image from "next/image";
import Clock from "@/components/card/Clock";
import Quote from "@/components/card/Quote";
import SearchBox from "@/components/card/SearchBox";
import Weather from "@/components/card/Weather";
import ShortCuts from "@/components/card/ShortCuts";

export default function HomePage() {
  return (
    <>
      <div className="relative min-h-screen bg-[#e8c8bb] flex flex-col items-center pt-20 px-4 text-black pb-[180px]">
        {" "}
        <Clock />
        {/* Added relative and pb padding to prevent overlap */}
        {/* Chinese Quote */}
        <Quote />
        {/* Search Bar */}
        <SearchBox />
        {/* Weather Widget */}
        <Weather />
        {/* Google Shortcuts */}
        <ShortCuts />
        {/* Anime Characters Image */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center -z-1">
          {" "}
          {/* Changed classes for positioning */}
          <Image
            src="/background/background.png"
            alt="Anime Characters"
            width={700}
            height={150}
            className="object-contain"
            priority={true} // Optional: Load this image with high priority
          />
        </div>
      </div>
    </>
  );
}
