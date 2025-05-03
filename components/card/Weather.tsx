import Image from "next/image";

export default function Weather() {
  return (
    <div className="w-full max-w-lg bg-linear rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <Image
              src="/placeholder.svg?height=50&width=50"
              alt="Weather"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
          <div className="flex items-baseline">
            <span className="text-[#960000] text-4xl font-bold">32°C</span>
            <span className="text-black mx-2">/</span>
            <span className="text-black text-2xl">22°C</span>
          </div>
        </div>
        <div className="text-right text-black text-sm">
          <p>鋒面北部海面過水氣略增，</p>
          <p>多雲，溫暖宜人</p>
        </div>
      </div>
    </div>
  );
}
