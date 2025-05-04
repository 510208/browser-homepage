"use client";

import { useState } from "react";
import { X, GripVertical, Edit2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Shortcut, getDomain } from "./types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SortableShortcutProps {
  shortcut: Shortcut;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string, url: string) => void;
}

export function SortableShortcut({
  shortcut,
  onDelete,
  onEdit,
}: SortableShortcutProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedShortcut, setEditedShortcut] = useState({
    name: shortcut.name,
    url: shortcut.url,
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: shortcut.id,
  });

  const domain = getDomain(shortcut.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleEditSubmit = () => {
    if (editedShortcut.name && editedShortcut.url) {
      // 確保 URL 有 http:// 或 https:// 前綴
      let url = editedShortcut.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      onEdit(shortcut.id, editedShortcut.name, url);
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex flex-col items-center group ${
        isDragging ? "cursor-grabbing" : ""
      }`}
    >
      {/* 刪除按鈕 - 右上角 */}
      <button
        className="absolute -top-2 -right-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
        onClick={() => onDelete(shortcut.id)}
        aria-label={`刪除 ${shortcut.name} 捷徑`}
      >
        <X className="w-3 h-3 text-red-600" />
      </button>

      {/* 拖動按鈕 - 左上角 */}
      <div
        className="absolute -top-2 -left-2 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-20"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-3 h-3 text-gray-600" />
      </div>

      {/* 編輯按鈕 - 右下角 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-blue-600"
            aria-label={`編輯 ${shortcut.name} 捷徑`}
          >
            <Edit2 className="w-3 h-3 text-white" />
          </button>
        </DialogTrigger>
        <DialogContent className="ui-card w-100 border-none">
          <DialogHeader>
            <DialogTitle>編輯捷徑</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-url" className="text-right">
                網址
              </Label>
              <Input
                id="edit-url"
                value={editedShortcut.url}
                onChange={(e) =>
                  setEditedShortcut({ ...editedShortcut, url: e.target.value })
                }
                className="col-span-3"
                placeholder="https://"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                名稱
              </Label>
              <Input
                id="edit-name"
                value={editedShortcut.name}
                onChange={(e) =>
                  setEditedShortcut({ ...editedShortcut, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              取消
            </Button>
            <Button onClick={handleEditSubmit}>儲存</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 捷徑圖示和名稱 */}
      <a
        href={shortcut.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        onClick={(e) => {
          // 如果正在拖動，阻止點擊事件
          if (isDragging) {
            e.preventDefault();
          }
        }}
      >
        <img
          src={faviconUrl || "/placeholder.svg"}
          alt={`${shortcut.name} 圖示`}
          className="w-6 h-6 object-contain"
          onError={(e) => {
            // 如果圖示載入失敗，顯示首字母
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.innerHTML = `<div class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 font-bold">${shortcut.name.charAt(
              0
            )}</div>`;
          }}
        />
      </a>
      <span className="text-xs text-black text-center">{shortcut.name}</span>
    </div>
  );
}
