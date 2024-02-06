import { MoreVertical, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";

const BoardCard = ({ title, coverImage, id }) => {
    return (
        <div
            className="board-card rounded-lg overflow-hidden group"
            tabIndex="1"
        >
            <Popover>
                <PopoverTrigger asChild>
                    <div className="absolute top-1 right-1 p-1 invisible group-hover:visible rounded-md cursor-disabled bg-black/50 z-[20] eas transition-opacity">
                        <MoreVertical size={18} color="#fff" />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-[100px] dark:bg-slate-950 p-0  cursor-pointer">
                    <div className="flex gap-2 items-center group justify-center hover:bg-slate-800 p-2">
                        <span className="text-[13px]">Delete</span>
                        <Trash size={18} />
                    </div>
                </PopoverContent>
            </Popover>
            <Link to={`/board/${id}`}>
                <img
                    className="w-full h-[150px] bg-cover object-cover"
                    src={coverImage}
                    alt="Board Image"
                />
                <div className="bg-gradient-to-t dark:from-black/80 from-black/55 from-10% to-70% to-transparent w-full h-full absolute inset-0"></div>
                <p className="text-md font-medium text-ellipsis  overflow-hidden z-50 absolute bottom-3 left-2 text-white">
                    {title}
                </p>
            </Link>
        </div>
    );
};

export default BoardCard;
