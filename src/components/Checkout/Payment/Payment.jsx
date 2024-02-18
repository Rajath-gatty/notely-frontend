import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Spinner from "@/components/ui/spinner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = ({ isFormLoading, clientSecret, customerDetails }) => {
    const appearance = {
        theme: "night",

        variables: {
            colorPrimary: "#4338ca",
            colorBackground: "#0f172a",
            colorText: "#e2e8f0",
            colorDanger: "#d81038",
            fontFamily: "Inter, system-ui, sans-serif",
            padding: "4px",
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            {!isFormLoading && clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm customerDetails={customerDetails} />
                </Elements>
            )}
            {isFormLoading && (
                <div className="mt-[30%]">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default Payment;
