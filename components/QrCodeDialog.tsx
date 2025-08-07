"use client";
import React, { useRef } from "react";
import { snapdom } from "@zumer/snapdom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ShareCard from "./ShareCard";
import { Button } from "./ui/button";

const QrCodeDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const download = async () => {
    try {
      if (!shareCardRef.current) {
        return;
      }
      const result = await snapdom(shareCardRef.current, { scale: 2 });
      // 使用内置的download方法
      await result.download({ format: "png", filename: "share-card" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>分享卡片</DialogTitle>
            {/* <DialogDescription>创建个人资料卡片，一键分享</DialogDescription> */}
          </DialogHeader>
          <div className="w-full flex justify-center">
            <ShareCard ref={shareCardRef} />
          </div>
          <DialogFooter>
            <Button onClick={download} type="submit">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default QrCodeDialog;
