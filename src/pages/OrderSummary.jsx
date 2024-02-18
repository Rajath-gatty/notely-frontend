import Navbar from "@/components/Navbar/Navbar";
import Info from "@/components/Pricing/Info";
import PricingCard from "@/components/Pricing/PricingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/redux/slices/authSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const OrderSummary = () => {
    const user = useSelector(getCurrentUser);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (user?.plan === "pro") {
            toast({
                title: "You already subscribed",
            });
            navigate("/");
        }
    }, [user?.plan]);
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto w-full h-full ">
                <h2 className="md:my-4md:text-2xl hidden md:block text-lg font-medium">
                    Order Summary
                </h2>
                <Separator className="hidden md:block" />
                <div className="flex flex-col md:flex-row items-center justify-evenly mt-10">
                    <PricingCard
                        className="order-2 md:order-1"
                        plan="Pro"
                        price={200}
                        isSelected={true}
                    >
                        <Info title="Unlimited boards" />
                        <Info title="Maximun 50MB of file upload size" />
                        <Info title="Add unlimited team members" />
                        <Info title="Realtime collaboration with team" />
                        <Info title="Live chat feature" />
                        <Info title="Live Activity tracker" />
                    </PricingCard>
                    <Separator
                        orientation="vertical"
                        className="hidden md:block order-2 h-[400px]"
                    />
                    <div className="md:self-start order-1 md:order-3 w-full md:w-auto px-4 md:px-0 mb-8 md:mb-0">
                        <div className="md:w-[300px] w-full">
                            <h3 className="text-xl font-medium mb-4">
                                Billing Details
                            </h3>
                            <Card className="pt-6 bg-slate-900 rounded-sm">
                                <CardContent className="flex justify-center flex-col">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-2">
                                            <p>Total</p>
                                            <p>Tax</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p>&#8377; 200</p>
                                            <p className="text-right">
                                                &#8377;0
                                            </p>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex justify-between ">
                                        <p>Subtotal</p>
                                        <p>&#8377; 200.00</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Link to="/checkout">
                                <Button className="rounded-sm w-full mt-4 py-6 px-4">
                                    Proceed To checkout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSummary;
