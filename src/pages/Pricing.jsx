import Navbar from "@/components/Navbar/Navbar";
import Info from "@/components/Pricing/Info";
import PricingCard from "@/components/Pricing/PricingCard";
import { Separator } from "@/components/ui/separator";
import React from "react";

// Fix styling issue here
const Pricing = () => {
    return (
        <>
            <Navbar />
            <section className="max-w-5xl mx-auto mt-6 my-4 ">
                <h2 className="text-3xl font-bold">Pricing</h2>
                <Separator className="my-4" />
                <div className="flex gap-10 lg:flex-row md:flex-row flex-col justify-center">
                    <PricingCard plan="Personal" price={0}>
                        <Info title="Maximun 3 boards" />
                        <Info title="Maximun 3MB of file upload size" />
                        <Info title="Limited features" />
                    </PricingCard>
                    <PricingCard plan="Teams" price={200}>
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
