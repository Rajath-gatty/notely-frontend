import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

export default function CheckoutForm({ customerDetails }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173",
                payment_method_data: {
                    billing_details: customerDetails,
                },
            },
        });
        console.log(error);

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };

    return (
        <div className="mx-4 md:mx-0 md:mt-12 mt-6">
            <div className="flex justify-between flex-col  md:flex-row ">
                <h1 className="text-2xl mb-8 font-bold md:order-1 order-2">
                    Complete the Payment
                </h1>
                <h2 className="text-xl md:order-2 order-1 self-end">
                    &#8377;200.00
                </h2>
            </div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement
                    id="payment-element"
                    options={paymentElementOptions}
                />
                <Button
                    className="w-full mt-4"
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                >
                    <span id="button-text">
                        {isLoading ? (
                            <p className="text-center">Paying...</p>
                        ) : (
                            "Pay now"
                        )}
                    </span>
                </Button>
                {/* Show any error or success messages */}
                {message && (
                    <div className="mt-2 text-red-700" id="payment-message">
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}
