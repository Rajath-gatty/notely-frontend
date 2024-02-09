import BoardCard from "@/components/Boards/BoardCard";
import CreateBoard from "@/components/Boards/CreateBoard";
import Navbar from "@/components/Navbar/Navbar";
import Modal from "@/components/ui/Modal";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBoardsQuery } from "@/redux/api/apiSlice";
import { Plus } from "lucide-react";
import { useState } from "react";

const Home = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const { isLoading, data = [] } = useGetBoardsQuery();

    return (
        <>
            <Navbar />
            <section className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-medium mt-6">Recents</h2>
                <Separator className="my-4" />
                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 w-full">
                    <Card
                        tabIndex="1"
                        className="bg-indigo-700 w-full h-[150px] cursor-pointer"
                        onClick={() => setModalOpen(true)}
                    >
                        <CardContent className="flex flex-col w-full mt-2 h-full justify-center items-center">
                            <Plus
                                size={30}
                                className="text-white mb-2"
                                fontWeight="bold"
                            />
                            <p className="text-white font-medium text-sm">
                                New board
                            </p>
                        </CardContent>
                    </Card>
                    {!isLoading
                        ? data.map((board) => (
                              <BoardCard
                                  key={board._id}
                                  id={board._id}
                                  title={board.name}
                                  coverImage={board.coverImage}
                              />
                          ))
                        : new Array(4).fill("0").map(() => (
                              <div key={Math.random()}>
                                  <Skeleton className="w-full h-[150px]" />
                              </div>
                          ))}
                </div>
                <Modal
                    open={modalOpen}
                    onClose={setModalOpen}
                    title="New Board"
                    className="dark:bg-slate-900"
                >
                    <CreateBoard
                        setModalOpen={setModalOpen}
                        modalOpen={modalOpen}
                    />
                </Modal>
            </section>
        </>
    );
};

export default Home;
