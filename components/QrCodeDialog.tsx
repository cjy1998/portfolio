"use client";
import React, { useRef } from "react";
import domtoimage from "dom-to-image";

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
  const download = () => {
    domtoimage.toJpeg(shareCardRef.current as HTMLElement).then((dataUrl) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "share-card.jpeg";
      link.click();
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[525px]">
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
