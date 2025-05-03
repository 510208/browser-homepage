// lib/weather/weather.ts

import { notDeepEqual } from "assert";

// 1. 定義預期的天氣資料結構 (根據你的 API 調整)
export interface WeatherData {
  locationName: string;
  weatherPhenomenon: string;
  weatherPhenomenonCode: string;
  temperature: string;
  apparentTemperature: string;
  relativeHumidity: string;
  windDirection: string;
  comfortIndex: string;
  rainProbability: string;
}

// 2. 從環境變數讀取敏感資訊 (更安全)
//    你需要在專案根目錄建立 .env.local 檔案來定義這些變數
//    例如：
//    WEATHER_API_ENDPOINT="https://opendata.cwa.gov.tw/api/v1/rest/datastore/..."
//    WEATHER_API_KEY="YOUR_CWA_API_KEY"
const API_ENDPOINT = process.env.CWA_OPENAPI_ENDPOINT;
const API_KEY = process.env.CWA_OPENAPI_AUTHCODE; // 中央氣象署 API 通常需要授權碼

// 3. 使用 fetch 發送請求
export const fetchWeatherData = async (
  location: string = "大里區" // 允許傳入地點參數，並設定預設值
): Promise<WeatherData> => {
  if (!API_ENDPOINT || !API_KEY) {
    throw new Error(
      "Weather API endpoint or key is not configured in environment variables."
    );
  }

  // 4. 構建 API URL (根據中央氣象署 API 文件調整參數)
  const apiUrl = `${API_ENDPOINT}?Authorization=${API_KEY}&LocationName=%E5%A4%A7%E9%87%8C%E5%8D%80`; // 範例：請求天氣現象、最低溫、最高溫、溫度

  // try {
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
  console.log("API Data:", data); // 確認 API 回應資料結構

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
    const weatherElement = data.records.Locations[0].Location[0].WeatherElement;

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

    // 將提取的資料組合成 WeatherData 物件
    const weatherData: WeatherData = {
      locationName,
      weatherPhenomenon: weatherPhenomenonData, // 天氣現象
      weatherPhenomenonCode, // 天氣現象代碼
      temperature: `${temperatureData}℃`, // 溫度
      apparentTemperature: `${apparentTemperatureData}℃`, // 體感溫度
      relativeHumidity: `${relativeHumidityData}%`, // 相對濕度
      windDirection: windDirectionData, // 風向
      comfortIndex: comfortIndexData, // 舒適度指數
      rainProbability: `${rainProbabilityData}%`, // 降雨機率
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
  // } catch (error) {
  //   console.error("Error fetching weather data:", error);
  //   // 重新拋出錯誤或回傳一個錯誤狀態，讓呼叫者知道出錯了
  //   throw error;
};
// };
