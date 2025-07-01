// lib/weather/weather.ts

import { notDeepEqual } from "assert";
import config from "@/config";

// 1. 定義預期的天氣資料結構 (根據你的 API 調整)
export interface WeatherData {
  locationName: string; // 地點名稱
  weatherPhenomenon: string; // 天氣現象
  weatherPhenomenonCode: string; // 天氣現象代碼 (用於顯示圖示)
  temperature: string; // 溫度
  apparentTemperature: string; // 體感溫度
  relativeHumidity: string; // 相對濕度
  windSpeed: string; // 風速
  bfScale: string; // 風速（蒲福風級）
  windDirection: string; // 風向
  comfortIndex: string; // 舒適度指數
  rainProbability: string; // 降雨機率
  WeatherDescription: string; // 天氣預報綜合描述
}

export interface SunRiseSunSetData {
  locationName: string; // 地點名稱
  sunRise: string; // 日出時間
  sunSet: string; // 日落時間
}

export interface AqiData {
  locationName: string; // 地點名稱
  aqi: string; // 空氣品質指標 (AQI)
  aqiLevel: string; // AQI 等級
}

// 2. 從環境變數讀取敏感資訊 (更安全)
//    你需要在專案根目錄建立 .env.local 檔案來定義這些變數
//    例如：
//    WEATHER_API_ENDPOINT="https://opendata.cwa.gov.tw/api/v1/rest/datastore/..."
//    WEATHER_API_KEY="YOUR_CWA_API_KEY"
const API_ENDPOINT = process.env.CWA_OPENAPI_ENDPOINT;
const API_KEY = process.env.CWA_OPENAPI_AUTHCODE; // 中央氣象署 API 通常需要授權碼

const MOE_API_ENDPOINT = process.env.MOE_DATA_ENDPOINT;
const MOE_API_KEY = process.env.MOE_DATA_APIKEY; // 教育部 API 通常需要授權碼

// 3. 使用 fetch 發送請求
export const fetchWeatherData = async (
  location: string = "大里區" // 允許傳入地點參數，並設定預設值
): Promise<WeatherData> => {
  if (!API_ENDPOINT || !API_KEY) {
    throw new Error(
      "Weather API endpoint or key is not configured in environment variables."
    );
  }

  console.log("Fetching weather data for location:", location); // 確認傳入的地點參數

  let weatherDataCode = config.weatherLocation?.weatherDataCode;
  if (!weatherDataCode) {
    // 如果沒有設定 weatherDataCode，則使用預設值
    weatherDataCode = "F-D0047-073"; // 這是中央氣象署的天氣資料代碼
  }

  // 4. 構建 API URL (根據中央氣象署 API 文件調整參數)
  const apiUrl = `${API_ENDPOINT}/${weatherDataCode}?Authorization=${API_KEY}&LocationName=${encodeURIComponent(
    location
  )}`; // 範例：請求天氣現象、最低溫、最高溫、溫度

  try {
    // 5. 使用 fetch 並設定 Next.js 快取策略 (例如：每小時重新驗證)
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
    // console.log("API URL:", apiUrl); // 確認 API URL 是否正確
    // console.log("API Response:", response); // 確認 API 回應狀態

    if (!response.ok) {
      // 處理 API 回應錯誤
      throw new Error(
        `Failed to fetch weather data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    // console.log("API Data:", data); // 確認 API 回應資料結構

    // 6. 解析和轉換 API 回應資料 (這部分高度依賴 API 的實際結構)
    //    你需要根據中央氣象署回傳的 JSON 結構來提取所需欄位
    //    以下是一個 *假設性* 的轉換範例，你需要替換成實際邏輯
    if (!data.success) {
      throw new Error("API response indicates failure");
    }

    if (data.records && data.records.Locations && data.records.Locations[0]) {
      // 提取地點名稱
      const locationName = `${data.records.Locations[0].LocationsName} ${data.records.Locations[0].Location[0].LocationName}`;
      console.log("Location Name:", locationName); // 確認地點名稱是否正確

      // 提取weatherElement陣列
      const weatherElement =
        data.records.Locations[0].Location[0].WeatherElement;

      // 提取天氣現象，直接取用第一個時間點的資料
      const weatherPhenomenonData = weatherElement.find(
        (element: any) => element.ElementName === "天氣現象"
      ).Time[0].ElementValue[0].Weather;
      console.log("Weather Phenomenon Data:", weatherPhenomenonData); // 確認天氣現象是否正確

      // 提取天氣現象代碼，以便取得對應的圖示
      const weatherPhenomenonCode = weatherElement.find(
        (element: any) => element.ElementName === "天氣現象"
      ).Time[0].ElementValue[0].WeatherCode;
      console.log("Weather Phenomenon Code:", weatherPhenomenonCode); // 確認天氣現象代碼是否正確

      // 提取溫度，直接取用第一個時間點的資料
      const temperatureData = weatherElement.find(
        (element: any) => element.ElementName === "溫度"
      ).Time[0].ElementValue[0].Temperature;
      console.log("Temperature Data:", temperatureData); // 確認溫度資料是否正確

      // 提取體感溫度，直接取用第一個時間點的資料
      const apparentTemperatureData = weatherElement.find(
        (element: any) => element.ElementName === "體感溫度"
      ).Time[0].ElementValue[0].ApparentTemperature;
      console.log("Apparent Temperature Data:", apparentTemperatureData); // 確認體感溫度資料是否正確

      // 提取相對溼度，直接取用第一個時間點的資料
      const relativeHumidityData = weatherElement.find(
        (element: any) => element.ElementName === "相對濕度"
      ).Time[0].ElementValue[0].RelativeHumidity;
      console.log("Relative Humidity Data:", relativeHumidityData); // 確認相對濕度資料是否正確

      // 提取風速，直接取用第一個時間點的資料
      const windSpeedData = weatherElement.find(
        (element: any) => element.ElementName === "風速"
      ).Time[0].ElementValue[0].WindSpeed;
      console.log("Wind Speed Data:", windSpeedData); // 確認風速資料是否正確

      // 提取風速（蒲福風級），直接取用第一個時間點的資料
      const bfScaleData = weatherElement.find(
        (element: any) => element.ElementName === "風速"
      ).Time[0].ElementValue[0].BeaufortScale;
      console.log("Wind Scale Data:", bfScaleData); // 確認風速（蒲福風級）資料是否正確

      // 提取風向，直接取用第一個時間點的資料
      const windDirectionData = weatherElement.find(
        (element: any) => element.ElementName === "風向"
      ).Time[0].ElementValue[0].WindDirection;
      console.log("Wind Direction Data:", windDirectionData); // 確認風向資料是否正確

      // 提取舒適度指數，直接取用第一個時間點的資料
      const comfortIndexData = weatherElement.find(
        (element: any) => element.ElementName === "舒適度指數"
      ).Time[0].ElementValue[0].ComfortIndex;
      console.log("Comfort Index Data:", comfortIndexData); // 確認舒適度指數資料是否正確

      // 提取降雨機率，直接取用第一個時間點的資料
      const rainProbabilityData = weatherElement.find(
        (element: any) => element.ElementName === "3小時降雨機率"
      ).Time[0].ElementValue[0].ProbabilityOfPrecipitation;
      console.log("Rain Probability Data:", rainProbabilityData); // 確認降雨機率資料是否正確

      // 提取天氣預報綜合描述，直接取用第一個時間點的資料
      const WeatherDescriptionData = weatherElement.find(
        (element: any) => element.ElementName === "天氣預報綜合描述"
      ).Time[0].ElementValue[0].WeatherDescription;
      console.log("Weather Description Data:", WeatherDescriptionData); // 確認天氣預報綜合描述資料是否正確

      // 將提取的資料組合成 WeatherData 物件
      const weatherData: WeatherData = {
        locationName,
        weatherPhenomenon: weatherPhenomenonData, // 天氣現象
        weatherPhenomenonCode, // 天氣現象代碼
        temperature: temperatureData, // 溫度
        apparentTemperature: apparentTemperatureData, // 體感溫度
        relativeHumidity: relativeHumidityData, // 相對濕度
        windSpeed: windSpeedData, // 風速
        bfScale: bfScaleData, // 風速（蒲福風級）
        windDirection: windDirectionData, // 風向
        comfortIndex: comfortIndexData, // 舒適度指數
        rainProbability: rainProbabilityData, // 降雨機率
        WeatherDescription: WeatherDescriptionData, // 天氣預報綜合描述
      };
      return weatherData; // 返回組合好的資料
    } else if (data.records && data.records.Locations) {
      // 處理沒有 Location 的情況
      throw new Error("No location data found in API response");
    } else if (data.success === false) {
      // 處理 API 回應失敗的情況
      throw new Error("API response indicates failure");
    } else if (data.records && data.records.success === false) {
      // 處理 API 回應失敗的情況
      throw new Error("API response indicates failure");
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // 重新拋出錯誤或回傳一個錯誤狀態，讓呼叫者知道出錯了
    throw error;
  }
};

export const fetchSunRiseSunSetData = async (
  location: string = "臺中市" // 允許傳入地點參數，並設定預設值
): Promise<SunRiseSunSetData> => {
  if (!API_ENDPOINT || !API_KEY) {
    throw new Error(
      "Weather API endpoint or key is not configured in environment variables."
    );
  }

  // 4. 構建 API URL (根據中央氣象署 API 文件調整參數)
  const apiUrl = `${API_ENDPOINT}/A-B0062-001?Authorization=${API_KEY}&CountyName=${encodeURIComponent(
    location
  )}&parameter=SunRiseTime,SunSetTime`; // 範例：請求日出和日落時間

  // try {
  // 5. 使用 fetch 並設定 Next.js 快取策略 (例如：每小時重新驗證)
  const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
  console.log("API URL:", apiUrl); // 確認 API URL 是否正確
  console.log("API Response:", response); // 確認 API 回應狀態

  if (!response.ok) {
    // 處理 API 回應錯誤
    throw new Error(
      `Failed to fetch sun rise and set data: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  // console.log("API Data:", data); // 確認 API 回應資料結構

  // 6. 解析和轉換 API 回應資料 (這部分高度依賴 API 的實際結構)
  //    以下是一個 *假設性* 的轉換範例，你需要替換成實際邏輯
  if (!data.success) {
    throw new Error("API response indicates failure");
  }

  if (
    data.records &&
    data.records.locations &&
    data.records.locations.location[0]
  ) {
    // 提取地點名稱
    const locationName = data.records.locations.location[0].CountyName;
    console.log("Location Name:", locationName); // 確認地點名稱是否正確

    // 提取time陣列
    const time = data.records.locations.location[0].time[0];

    // 提取日出時間，直接取用第一個時間點的資料
    const sunRiseTime = time.SunRiseTime;
    console.log("Sun Rise Time:", sunRiseTime); // 確認日出時間是否正確
    // 提取日落時間，直接取用第一個時間點的資料
    const sunSetTime = time.SunSetTime;
    console.log("Sun Set Time:", sunSetTime); // 確認日落時間是否正確
    // 將提取的資料組合成 SunRiseSunSetData 物件
    const sunRiseSunSetData: SunRiseSunSetData = {
      locationName,
      sunRise: sunRiseTime, // 日出時間
      sunSet: sunSetTime, // 日落時間
    };
    return sunRiseSunSetData;
  } else {
    const sunRiseSunSetData: SunRiseSunSetData = {
      locationName: "",
      sunRise: "N/A",
      sunSet: "N/A",
    };
    return sunRiseSunSetData;
  }
};

export const fetchAqiData = async (
  location: string = "大里" // 允許傳入測站參數，並設定預設值
): Promise<AqiData> => {
  if (!MOE_API_ENDPOINT || !MOE_API_KEY) {
    throw new Error(
      "Weather API endpoint or key is not configured in environment variables."
    );
  }

  // 4. 構建 API URL (根據中央氣象署 API 文件調整參數)
  const apiUrl = `${MOE_API_ENDPOINT}/aqx_p_432?format=json&limit=5&filters=SiteName,EQ,${encodeURIComponent(
    location
  )}&api_key=${MOE_API_KEY}`; // 範例：請求 AQI 資料

  try {
    // 5. 使用 fetch 並設定 Next.js 快取策略 (例如：每小時重新驗證)
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
    // console.log("API URL:", apiUrl); // 確認 API URL 是否正確
    // console.log("API Response:", response); // 確認 API 回應狀態

    if (!response.ok) {
      // 處理 API 回應錯誤
      throw new Error(
        `Failed to fetch AQI data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    // console.log("API Data:", data); // 確認 API 回應資料結構

    if (data.records && data.records[0]) {
      // 提取地點名稱
      const locationName = `${data.records[0].county} ${data.records[0].sitename}`;
      console.log("Location Name:", locationName); // 確認地點名稱是否正確

      // 提取 AQI 數值和等級，直接取用第一個時間點的資料
      const aqiData = data.records[0].aqi;
      console.log("AQI Data:", aqiData); // 確認 AQI 數值是否正確

      const aqiLevelData = data.records[0].status;
      console.log("AQI Level Data:", aqiLevelData); // 確認 AQI 等級是否正確
      // 將提取的資料組合成 AqiData 物件
      const respAqiData: AqiData = {
        locationName,
        aqi: aqiData, // AQI 數值
        aqiLevel: aqiLevelData, // AQI 等級
      };
      return respAqiData; // 返回組合好的資料
    } else if (data.records && data.records[0].aqi) {
      // 處理沒有 AQI 的情況
      throw new Error("No AQI data found in API response");
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error("Error fetching AQI data:", error);
    // 重新拋出錯誤或回傳一個錯誤狀態，讓呼叫者知道出錯了
    throw error;
  }
};
