import Navbar from "@/components/Navbar/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { useGetProfileQuery } from "@/redux/api/apiSlice";
import { getCurrentUser } from "@/redux/slices/authSlice";
import React from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import Address from "@/components/Profile/Address";
import SubscriptionHistory from "@/components/Profile/SubscriptionHistory";

const Profile = () => {
    const user = useSelector(getCurrentUser);
    const { isLoading, data, isError } = useGetProfileQuery();
    return (
        <div>
            <Navbar />
            {!isLoading ? (
                <div className="max-w-6xl md:mx-auto mt-6 mx-4 mb-16">
                    <div className="max-w-4xl flex my-4 md:my-0 gap-4 md:gap-0 flex-col md:flex-row justify-around">
                        <div>
                            <div>
                                <img
                                    src={user?.avatar}
                                    className="mb-4 w-[70px] h-full"
                                    alt="Profile image"
                                />
                                <p className="text-xl font-bold">
                                    {user?.name}
                                </p>
                            </div>
                            <div className="flex gap-4 mt-1">
                                <p className="text-sm text-slate-300">
                                    Current Plan :
                                </p>
                                <p className="text-sm text-slate-300">
                                    {data?.plan}
                                </p>
                            </div>
                            {data?.plan && (
                                <div className="flex gap-4 mt-1">
                                    <p className="text-sm text-slate-300">
                                        Email :
                                    </p>
                                    <p className="text-sm text-slate-300">
                                        {user.email}
                                    </p>
                                </div>
                            )}
                        </div>
                        {data?.subscriptions &&
                            data?.subscriptions[0]?.isActive && (
                                <Card className="p-6 bg-slate-800/50">
                                    <Badge className="mb-2" variant="primary">
                                        Pro
                                    </Badge>
                                    <div>
                                        <p className="text-lg text-slate-300">
                                            Subscription expires in
                                        </p>
                                        <span className="text-3xl">
                                            {Intl.DateTimeFormat("en-IN", {
                                                day: "numeric",
                                            }).format(
                                                new Date(
                                                    data?.subscriptions[0]?.endDate
                                                ) - new Date()
                                            )}{" "}
                                            days
                                        </span>
                                    </div>
                                </Card>
                            )}
                    </div>
                    <Separator className="my-3 max-w-4xl" />
                    <div>
                        <h1 className="mt-2 text-xl font-bold">
                            Saved Address
                        </h1>
                        <Address data={data} />
                        <Separator className="my-2 mt-8 max-w-4xl" />
                        <div>
                            <h1 className="text-xl font-bold mt-4">
                                Subscription History
                            </h1>
                            <p className="text-slate-400 mb-4 text-sm">
                                Manage Billing Information and view receipts
                            </p>
                            <SubscriptionHistory
                                subscriptions={data?.subscriptions}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-[15%]">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default Profile;
