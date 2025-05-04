"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDomain } from "./types";

type AddShortcutDialogProps = {
  onAddShortcut: (name: string, url: string) => void;
};

export function AddShortcutDialog({ onAddShortcut }: AddShortcutDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newShortcut, setNewShortcut] = useState({
    name: "",
    url: "",
  });

  // 自動填充網站名稱
  const autoFillName = (url: string) => {
    if (url && !newShortcut.name) {
      try {
        const domain = getDomain(
          url.startsWith("http") ? url : `https://${url}`
        );
        // 從域名中提取網站名稱（去掉 www. 和 .com 等）
        const siteName = domain.replace(/^www\./, "").split(".")[0];
        // 首字母大寫
        const formattedName =
          siteName.charAt(0).toUpperCase() + siteName.slice(1);
        setNewShortcut((prev) => ({ ...prev, name: formattedName }));
      } catch (e) {
        // 如果解析失敗，不做任何操作
      }
    }
  };

  // 處理新增捷徑
  const handleAddShortcut = () => {
    if (newShortcut.name && newShortcut.url) {
      // 確保 URL 有 http:// 或 https:// 前綴
      let url = newShortcut.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      onAddShortcut(newShortcut.name, url);
      setNewShortcut({ name: "", url: "" });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* 將觸發器改為卡片樣式 */}
      <div className="flex flex-col items-center">
        <DialogTrigger asChild>
          <button
            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 shadow-sm hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="新增捷徑"
          >
            <Plus className="w-6 h-6 text-gray-600" />
          </button>
        </DialogTrigger>
        <span className="text-xs text-black text-center">新增捷徑</span>
      </div>{" "}
      <DialogContent className="ui-card w-100 border-none">
        <DialogHeader>
          <DialogTitle>新增捷徑</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              網址
            </Label>
            <Input
              id="url"
              value={newShortcut.url}
              onChange={(e) =>
                setNewShortcut({ ...newShortcut, url: e.target.value })
              }
              onBlur={(e) => autoFillName(e.target.value)}
              className="col-span-3"
              placeholder="https://"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              名稱
            </Label>
            <Input
              id="name"
              value={newShortcut.name}
              onChange={(e) =>
                setNewShortcut({ ...newShortcut, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            取消
          </Button>
          <Button onClick={handleAddShortcut}>新增</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
