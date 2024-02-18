import React from "react";
import { Badge } from "../ui/badge";
import { CreditCard } from "lucide-react";
import visaCard from "@/assets/visa-card.svg";
import masterCard from "@/assets/master-card.svg";

const SubscriptionHistory = ({ subscriptions }) => {
    return (
        <>
            {subscriptions ? (
                <div className="bg-slate-900/50 max-w-4xl md:p-4 p-0">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm md:text-md text-slate-200">
                                <th className="p-2">Date</th>
                                <th className="p-2">Payment Method</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">invoice</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-400">
                            {subscriptions.map((sub) => (
                                <tr key={sub._id}>
                                    <td className="p-2 text-xs md:text-md">
                                        {Intl.DateTimeFormat("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }).format(new Date(sub.startDate))}
                                    </td>
                                    <td className="p-2">
                                        <div className="flex gap-2  text-xs md:text-md items-center">
                                            {sub.paymentMethod.brand ===
                                            "visa" ? (
                                                <img
                                                    src={visaCard}
                                                    className="md:w-[40px] w-[30px]"
                                                    alt="card"
                                                />
                                            ) : sub.paymentMethod.brand ===
                                              "mastercard" ? (
                                                <img
                                                    src={masterCard}
                                                    className="md:w-[40px] w-[30px]"
                                                    alt="card"
                                                />
                                            ) : (
                                                <CreditCard className=" text-center md:ml-2 mr-2" />
                                            )}
                                            <span>
                                                {sub.paymentMethod.last4.padStart(
                                                    8,
                                                    "•"
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="md:p-2 p-1  text-xs md:text-md">
                                        <Badge
                                            className="text-[10px] md:text-md"
                                            variant={
                                                sub.isActive
                                                    ? "active"
                                                    : "expired"
                                            }
                                        >
                                            {sub.isActive ? "Active" : "Ended"}
                                        </Badge>
                                    </td>
                                    <td className="p-2 text-xs md:text-md">
                                        <a
                                            href={sub.invoiceUrl}
                                            className="text-sm"
                                            target="_blank"
                                        >
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-slate-500 max-w-sm  text-center mt-4">
                    Your subscriptions will show here
                </p>
            )}
        </>
    );
};

export default SubscriptionHistory;
