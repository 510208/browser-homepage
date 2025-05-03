import Image from "next/image";
import { fetchWeatherData } from "@/lib/weather/weather";

export default async function Weather() {
  // 假設的背景折線圖路徑，你需要提供實際的圖片
  // const lineChartBg = "/background/line-chart-placeholder.svg";
  const weatherData = await fetchWeatherData(); // 這裡可以傳入實際的地點參數
  const isDayTime = new Date().getHours() >= 6 && new Date().getHours() < 18;
  const weatherIconBaseUrl = isDayTime
    ? "https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/"
    : "https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/";

  return (
    // 移除 relative 和 overflow-hidden，因為不再需要背景圖定位
    <div className="ui-card">
      <div className="flex items-center justify-between">
        {/* 左欄：天氣圖標 */}
        <div className="flex items-center z-10">
          {" "}
          {/* z-10 確保內容在背景圖之上 */}
          <div className="mr-4">
            <Image
              src={
                weatherData
                  ? `${weatherIconBaseUrl}${weatherData.weatherPhenomenonCode}.svg`
                  : "/placeholder.svg?height=50&width=50"
              } // 假設的天氣圖標路徑，你需要提供實際的圖片
              alt={weatherData ? weatherData.weatherPhenomenon : "天氣圖示"}
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>
        {/* 中間欄：天氣狀態概述 */}
        <div className="text-left text-[#250505] text-4xl font-black z-10 w-5/12">
          <p className="w-full">
            {weatherData ? weatherData.weatherPhenomenon : "暫時未知"}
          </p>
        </div>
        {/* 右欄：溫度 */}
        <div className="flex items-baseline text-right z-10 w-5/12 justify-end">
          <span className="text-[#960000] text-4xl font-bold" title="最高溫度">
            32°C
          </span>
          <span className="text-black mx-2">/</span>
          <span className="text-black text-2xl">22°C</span>
        </div>
      </div>
    </div>
  );
}
