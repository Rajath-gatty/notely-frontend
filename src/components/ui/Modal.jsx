import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { cn } from "@/lib/utils";

const Modal = ({ title, open, onClose, children, className }) => {
    return (
        <div>
            <Dialog open={open} onOpenChange={onClose} tabIndex="0">
                <DialogContent
                    className={cn("w-11/12", className)}
                    // {...rest}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Modal;
