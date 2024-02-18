import Navbar from "@/components/Navbar/Navbar";
import Info from "@/components/Pricing/Info";
import PricingCard from "@/components/Pricing/PricingCard";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Pricing = () => {
    return (
        <>
            <Navbar />
            <section className="max-w-5xl mx-auto md:mt-6 md:my-4 mt-4">
                <h2 className="md:text-3xl font-bold ml-4 md:ml-2 text-lg mb-4 lg:mb-0 ">
                    Pricing
                </h2>
                <Separator className="md:my-4 my-2 hidden md:block" />
                <div className="flex md:gap-10 gap-5 lg:flex-row md:flex-row flex-col items-center justify-center">
                    <PricingCard plan="Personal" price={0}>
                        <Info title="Maximun 3 boards" />
                        <Info title="Maximun 3MB of file upload size" />
                        <Info title="Limited features" />
                    </PricingCard>
                    <PricingCard plan="Pro" price={200}>
                        <Info title="Unlimited boards" />
                        <Info title="Maximun 50MB of file upload size" />
                        <Info title="Add unlimited team members" />
                        <Info title="Realtime collaboration with team" />
                        <Info title="Live chat feature" />
                        <Info title="Live Activity tracker" />
                    </PricingCard>
                </div>
            </section>
        </>
    );
};

export default Pricing;
