import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ShareCard from "./ShareCard";

const QrCodeDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>分享卡片</DialogTitle>
            {/* <DialogDescription>创建个人资料卡片，一键分享</DialogDescription> */}
          </DialogHeader>
          <div className="w-full flex justify-center">
            <ShareCard />
          </div>
          {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default QrCodeDialog;
