import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

const Modal = ({ title, open, onClose, children, ...rest }) => {
    return (
        <Dialog open={open} onOpenChange={onClose} tabIndex="0">
            <DialogContent
                {...rest}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
