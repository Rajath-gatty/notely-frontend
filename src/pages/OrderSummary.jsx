import Navbar from "@/components/Navbar/Navbar";
import Info from "@/components/Pricing/Info";
import PricingCard from "@/components/Pricing/PricingCard";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const OrderSummary = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto w-full h-full ">
                <h2 className="my-4 text-2xl font-medium">Order Summary</h2>
                <Separator />
                <div className="flex items-center justify-evenly mt-10">
                    <PricingCard plan="Teams" price={200}>
                        <Info title="Unlimited boards" />
                        <Info title="Maximun 50MB of file upload size" />
                        <Info title="Add unlimited team members" />
                        <Info title="Realtime collaboration with team" />
                        <Info title="Live chat feature" />
                        <Info title="Live Activity tracker" />
                    </PricingCard>
                    <Separator orientation="vertical" className=" h-[400px]" />
                    <div className="self-start">
                        <div className="w-[300px]">
                            <h3 className="text-xl font-medium mb-4">
                                Billing Details
                            </h3>
                            <Card className="pt-6 bg-slate-900">
                                <CardContent className="flex justify-center flex-col">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-2">
                                            <p>Total</p>
                                            <p>Tax</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p>&#8377; 200</p>
                                            <p>&#8377;18</p>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex justify-between ">
                                        <p>Subtotal</p>
                                        <p>&#8377; 233.40</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div>Stripe Form here</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSummary;
