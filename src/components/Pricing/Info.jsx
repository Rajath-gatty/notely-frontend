import { CheckCircle2 } from "lucide-react";

const Info = ({ title }) => {
    return (
        <div className="flex gap-3 items-center ">
            <CheckCircle2 size={18} className="text-slate-500" />
            <span className="md:text-sm text-xs text-slate-500">{title}</span>
        </div>
    );
};

export default Info;
