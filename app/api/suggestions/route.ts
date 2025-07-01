import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    // 使用 Google 的建議 API
    const response = await fetch(
      `https://clients1.google.com/complete/search?hl=zh-TW&output=toolbar&q=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch suggestions from Google");
    }

    const xmlText = await response.text();

    // 解析 XML 並提取建議
    const suggestions = parseGoogleSuggestions(xmlText);

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Suggestion fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 解析 Google XML 回應的函數
function parseGoogleSuggestions(xmlText: string): string[] {
  const suggestions: string[] = [];

  try {
    // 使用正則表達式提取 suggestion data 屬性
    const regex = /<suggestion data="([^"]*)"\/>/g;
    let match;

    while ((match = regex.exec(xmlText)) !== null) {
      suggestions.push(match[1]);
    }
  } catch (error) {
    console.error("Error parsing XML:", error);
  }

  return suggestions;
}
