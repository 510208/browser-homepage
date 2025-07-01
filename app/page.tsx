// import { useState, useEffect } from "react";

import Image from "next/image";
import Clock from "@/components/card/Clock";
import Quote from "@/components/card/Quote";
import SearchBox from "@/components/card/SearchBox";
import Weather from "@/components/card/Weather";
// import ShortCutsOld from "@/components/card/ShortCuts";
import Shortcuts from "../components/card/shortcuts";
import config from "@/config";
import DynamicStyles from "@/components/DynamicStyles";

export default function HomePage() {
  return (
    <>
      <DynamicStyles />
      <div
        className="relative min-h-screen flex flex-col items-center pt-20 px-4 text-black pb-[180px]"
        style={{ backgroundColor: config.background.main }}
      >
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
        <Shortcuts />
        {/* Anime Characters Image */}
        {config.background.footerImage.enabled && (
          <div className="absolute bottom-0 left-0 w-full flex justify-center -z-1">
            {" "}
            {/* Changed classes for positioning */}
            <Image
              src={config.background.footerImage.src}
              alt={config.background.footerImage.alt}
              width={config.background.footerImage.width}
              height={config.background.footerImage.height}
              className="object-contain"
              priority={true} // Optional: Load this image with high priority
            />
          </div>
        )}
      </div>
    </>
  );
}
