"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { type Shortcut, defaultShortcuts } from "./types";
import { SortableShortcut } from "./sortable-shortcut";
import { AddShortcutDialog } from "./add-shortcut-dialog";

const MAX_SHORTCUTS = 12; // 設定捷徑數量上限

export default function Shortcuts() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  // 設置拖放感應器
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 需要移動 8px 才會觸發拖動
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 從 localStorage 載入捷徑 (使用 useCallback 避免不必要的重新渲染)
  useEffect(() => {
    const savedShortcuts = localStorage.getItem("userShortcuts");
    if (savedShortcuts) {
      setShortcuts(JSON.parse(savedShortcuts));
    } else {
      setShortcuts(defaultShortcuts);
    }
  }, []);

  // 儲存捷徑到 localStorage (使用 useCallback)
  useEffect(() => {
    if (shortcuts.length > 0) {
      localStorage.setItem("userShortcuts", JSON.stringify(shortcuts));
    }
  }, [shortcuts]);

  // 新增捷徑 (使用 useCallback)
  const addShortcut = useCallback((name: string, url: string) => {
    const newId = Date.now().toString();
    setShortcuts((prev) => [...prev, { id: newId, name, url }]);
  }, []);

  // 編輯捷徑 (使用 useCallback)
  const editShortcut = useCallback((id: string, name: string, url: string) => {
    setShortcuts((prev) =>
      prev.map((shortcut) =>
        shortcut.id === id ? { ...shortcut, name, url } : shortcut
      )
    );
  }, []);

  // 刪除捷徑 (使用 useCallback)
  const deleteShortcut = useCallback((id: string) => {
    setShortcuts((prev) => prev.filter((shortcut) => shortcut.id !== id));
  }, []);

  // 處理拖放結束事件
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setShortcuts((items) => {
        if (!items) return []; // Add null check for safety
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  // 儲存捷徑到 localStorage
  return (
    <div className="ui-card">
      {/* 移除頂部按鈕區域 */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={shortcuts.map((s) => s.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-4 gap-4 md:grid-cols-6">
            {shortcuts.map((shortcut) => (
              <SortableShortcut
                key={shortcut.id}
                shortcut={shortcut}
                onDelete={deleteShortcut}
                onEdit={editShortcut}
              />
            ))}
            {/* 當捷徑數量小於上限時，顯示新增捷徑卡片 */}
            {shortcuts.length < MAX_SHORTCUTS && (
              <AddShortcutDialog onAddShortcut={addShortcut} />
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
