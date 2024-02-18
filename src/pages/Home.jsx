import BoardCard from "@/components/Boards/BoardCard";
import CreateBoard from "@/components/Boards/CreateBoard";
import Navbar from "@/components/Navbar/Navbar";
import Info from "@/components/Pricing/Info";
import PricingCard from "@/components/Pricing/PricingCard";
import Modal from "@/components/ui/Modal";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBoardsQuery } from "@/redux/api/apiSlice";
import { Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { upgradeMembership } from "@/redux/slices/authSlice";

const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

const Home = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [tierLimitReached, setTierLimitReached] = useState(false);
    const { isLoading, data = [] } = useGetBoardsQuery();
    const [isPaid, setIsPaid] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const clientSecret = searchParams.get("payment_intent_client_secret");
        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (paymentIntent?.status === "succeeded") {
                setModalOpen(true);
                setIsPaid(true);
                setSearchParams("");
                dispatch(upgradeMembership());
            }
        });
    }, []);

    return (
        <>
            <Navbar />
            <section className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-medium mt-6 ml-3">Recents</h2>
                <Separator className="my-4" />
                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 w-full px-3">
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
                        : new Array(4).fill(0).map(() => (
                              <div key={Math.random()}>
                                  <Skeleton className="w-full h-[150px]" />
                              </div>
                          ))}
                </div>
                {!tierLimitReached && !isPaid ? (
                    <Modal
                        open={modalOpen}
                        onClose={setModalOpen}
                        title="New Board"
                        className="dark:bg-slate-900 max-w-2xl"
                    >
                        <CreateBoard
                            setModalOpen={setModalOpen}
                            modalOpen={modalOpen}
                            setTierLimitReached={setTierLimitReached}
                        />
                    </Modal>
                ) : !isPaid ? (
                    <Modal
                        open={modalOpen}
                        onClose={setModalOpen}
                        title="Upgrade to PRO to create more boards"
                        className="dark:bg-slate-900 max-w-2xl"
                    >
                        <div className="max-w-3xl mx-auto mt-4">
                            <PricingCard plan="Pro" price={200}>
                                <Info title="Unlimited boards" />
                                <Info title="Maximun 50MB of file upload size" />
                                <Info title="Add unlimited team members" />
                                <Info title="Realtime collaboration with team" />
                                <Info title="Live chat feature" />
                                <Info title="Live Activity tracker" />
                            </PricingCard>
                        </div>
                    </Modal>
                ) : (
                    <Modal
                        open={modalOpen}
                        onClose={setModalOpen}
                        title="Payment successful"
                        className="dark:bg-slate-900 max-w-2xl"
                    >
                        <div className="max-w-3xl flex flex-col mt-8 justify-center items-center mx-auto">
                            <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-indigo-700">
                                <Check className="text-slate-100" size={35} />
                            </div>
                            <h1 className="text-2xl mt-8">
                                Congrats You are now a PRO member 🎉
                            </h1>
                        </div>
                    </Modal>
                )}
            </section>
        </>
    );
};

export default Home;
