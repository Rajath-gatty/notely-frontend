import CollabBar from "@/components/BoardSession/CollabBar/CollabBar";
import PageEditor from "@/components/BoardSession/PageEditor/PageEditor";
import Sidebar from "@/components/BoardSession/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

const Board = () => {
    return (
        <div className="h-full">
            <Navbar />
            <div className="flex h-[calc(100vh-69px)]">
                <Sidebar />
                <PageEditor />
                <CollabBar />
            </div>
        </div>
    );
};

export default Board;
