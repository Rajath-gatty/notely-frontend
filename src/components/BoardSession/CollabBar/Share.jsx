import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useRef } from "react";

const Share = () => {
    const inputRef = useRef();

    const handleCopyLink = (e) => {
        inputRef.current.select();
        navigator.clipboard.writeText(inputRef.current.value);
    };
    return (
        <Card className="p-2 bg-slate-900 m-2">
            <CardHeader className="py-2 px-2">
                <h1 className="font-bold">Invite link</h1>
            </CardHeader>
            <div className="flex gap-2">
                <Input
                    className="bg-slate-950/20"
                    disableFocus
                    value={window.location.href}
                    readOnly
                    ref={inputRef}
                />
                <Button onClick={handleCopyLink}>
                    <Copy size={16} />
                </Button>
            </div>
        </Card>
    );
};

export default Share;
