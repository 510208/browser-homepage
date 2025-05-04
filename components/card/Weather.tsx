import Image from "next/image";
import {
  fetchSunRiseSunSetData,
  fetchWeatherData,
} from "@/lib/weather/weather";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WeatherDetailCard } from "./w-compoments/WeatherDetailCard";
import {
  Angry,
  CloudRainWind,
  Compass,
  Droplet,
  Frown,
  Laugh,
  Meh,
  Smile,
  Sunrise,
  Sunset,
  Underline,
  Wind,
} from "lucide-react";
import WeatherSummary from "./w-compoments/WeatherSummary";

const isDayTime = new Date().getHours() >= 6 && new Date().getHours() < 18;
/* const weatherIconBaseUrl = isDayTime
    ? "https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/"
    : "https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/";  */

export default async function Weather() {
  // 假設的背景折線圖路徑，你需要提供實際的圖片
  // const lineChartBg = "/background/line-chart-placeholder.svg";
  const weatherData = await fetchWeatherData(); // 這裡可以傳入實際的地點參數
  const sunRiseSunSetData = await fetchSunRiseSunSetData(); // 這裡可以傳入實際的地點參數

  return (
    <Dialog>
      <DialogTrigger className="ui-card">
        <WeatherSummary weatherData={weatherData} />
      </DialogTrigger>
      {/* Pass both weatherData and sunRiseSunSetData as props */}
      <WeatherDialog
        weatherData={weatherData}
        sunRiseSunSet={sunRiseSunSetData}
      />
    </Dialog>
  );
}

// Define the props interface for WeatherDialog
interface WeatherDialogProps {
  weatherData: any; // Consider using a more specific type if available
  sunRiseSunSet: any; // Consider using a more specific type if available
}
// 彈出的詳細天氣資訊對話框
export function WeatherDialog({
  weatherData,
  sunRiseSunSet,
}: WeatherDialogProps) {
  // 檢查舒適度指數，並依照指數設定圖示
  let comfortIcon = <Smile className="text-3xl text-[#960000]" />; // 預設圖示
  if (weatherData?.comfortIndex) {
    const comfortIndex = parseInt(weatherData.comfortIndex, 10);
    if (comfortIndex < 25) {
      // 舒適
      comfortIcon = <Laugh className="text-3xl text-[#960000]" />; // 濕度圖示
    } else if (comfortIndex < 28) {
      // 稍熱
      comfortIcon = <Smile className="text-3xl text-[#960000]" />; // 風速圖示
    } else if (comfortIndex < 31) {
      // 熱
      comfortIcon = <Meh className="text-3xl text-[#960000]" />; // 舒適度圖示
    } else if (comfortIndex < 34) {
      // 非常熱
      comfortIcon = <Frown className="text-3xl text-[#960000]" />; // 舒適度圖示
    } else {
      // 危險
      comfortIcon = <Angry className="text-3xl text-[#960000]" />;
    }
  }
  return (
    <DialogContent className="ui-card border-none w-full max-w-2xl bg-[#f5f5f5] p-4">
      <DialogHeader className="bg-[#826558]/20 rounded-lg p-6">
        {/* 在這裡顯示詳細的天氣資訊 */}
        <DialogTitle className="text-2xl font-bold text-[#250505] ">
          <WeatherSummary weatherData={weatherData} />
          <DialogDescription className="text-sm font-light text-[#250505] mt-4">
            <a href="https://www.cwa.gov.tw/V8/C/">
              {weatherData?.locationName}
            </a>
            的詳細天氣資訊
            <br />
            <span className="text-sm font-light text-[#250505]">
              {weatherData?.WeatherDescription}
            </span>
          </DialogDescription>
        </DialogTitle>
      </DialogHeader>
      {/* 用Grid格式排版 */}
      <div className="grid grid-cols-3 gap-2 p-2">
        <WeatherDetailCard
          title="相對濕度"
          value={weatherData?.relativeHumidity}
          unit="%"
          icon={<Droplet />}
        />
        <WeatherDetailCard
          title="風速"
          value={`${weatherData?.bfScale} 級`}
          icon={<Wind />}
        />
        <WeatherDetailCard
          title="風向"
          value={weatherData?.windDirection}
          icon={<Compass />}
        />
        <WeatherDetailCard
          title="舒適度指數"
          value={weatherData?.comfortIndex}
          icon={comfortIcon} // 使用計算出的圖示
        />
        <WeatherDetailCard
          title="降雨機率"
          value={weatherData?.rainProbability}
          unit="%"
          icon={<CloudRainWind />}
        />
        <WeatherDetailCard
          title="日出時間"
          value={sunRiseSunSet?.sunRise}
          icon={<Sunrise />}
        />
        <WeatherDetailCard
          title="日落時間"
          value={sunRiseSunSet?.sunSet}
          icon={<Sunset />}
        />
        {/* You can add more details similarly */}
        {/* <WeatherDetailCard title="風速" value={weatherData?.windSpeed} unit=" m/s" /> */}
        {/* <WeatherDetailCard title="紫外線指數" value={weatherData?.uvIndex} /> */}
      </div>
      <DialogFooter className="flex justify-end p-1">
        <p className="text-sm font-light text-[#250505]">
          天氣資料來源：中央氣象署
        </p>
      </DialogFooter>
    </DialogContent>
  );
}
