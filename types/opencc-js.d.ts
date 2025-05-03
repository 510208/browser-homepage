// types/opencc-js.d.ts
declare module "opencc-js" {
  // 根據你實際使用的功能，可以定義更精確的型別
  // 這裡只定義了 Converter 函數的基本結構
  type ConversionOption = {
    from: "cn" | "tw" | "hk" | "jp" | "t"; // 根據 opencc-js 支援的選項調整
    to: "cn" | "tw" | "hk" | "jp" | "t";
  };

  export function Converter(
    options: ConversionOption
  ): (text: string) => string;

  // 如果你還用到其他 opencc-js 的匯出，可以在這裡繼續添加宣告
  // export const someOtherFunction: (arg: type) => returnType;
}
