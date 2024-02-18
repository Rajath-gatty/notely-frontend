import CustomerForm from "@/components/Checkout/CustomerForm";
import Payment from "@/components/Checkout/Payment/Payment";
import Navbar from "@/components/Navbar/Navbar";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
    useCheckCustomerQuery,
    usePostCustomerFormMutation,
} from "@/redux/api/apiSlice";
import { Check } from "lucide-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const {
        isLoading,
        data,
        isSuccess: isCheckCustomerSuccess,
        isError,
    } = useCheckCustomerQuery();
    const [currentStep, setCurrentStep] = useState(1);

    const [
        postCustomerForm,
        {
            isLoading: isFormLoading,
            data: paymentIntent,
            isSuccess,
            isError: isFormError,
            error,
        },
    ] = usePostCustomerFormMutation();

    const handleCustomerFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const address = formData.get("address");
        const city = formData.get("city");
        const pincode = formData.get("pincode");
        const state = formData.get("state");
        console.log({ name, email, address, city, pincode, state });

        if (!data.customerId) {
            postCustomerForm({
                name,
                email,
                address,
                city,
                pincode,
                state,
                newCustomer: true,
            });
        }
    };

    useEffect(() => {
        if (isError) {
            toast({
                title: "You already subscribed!",
            });
            navigate("/");
        }
        if (isSuccess) {
            console.log(paymentIntent);
            setCurrentStep(2);
        }
    }, [isSuccess, isError]);

    useLayoutEffect(() => {
        if (isCheckCustomerSuccess && data.customerId) {
            postCustomerForm({
                customerId: data.customerId,
                newCustomer: false,
            });
            setCurrentStep(2);
        }
    }, [isCheckCustomerSuccess]);

    const CHECKOUT_STEPS = [
        {
            title: "Address",
            component: (
                <CustomerForm
                    handleCustomerFormSubmit={handleCustomerFormSubmit}
                    isLoading={isFormLoading}
                    error={error?.data?.errors}
                    isError={isFormError}
                />
            ),
            status: "active",
        },
        {
            title: "Payment",
            component: (
                <Payment
                    isFormLoading={isFormLoading}
                    clientSecret={paymentIntent?.clientSecret}
                    customerDetails={paymentIntent?.customerDetails}
                />
            ),
            status: null,
        },
    ];

    return (
        <>
            <Navbar />
            <div className="max-w-xl mx-auto mt-4">
                {!isLoading ? (
                    <>
                        <div className="flex justify-evenly w-full relative items-center">
                            <div
                                className={cn(
                                    "h-1 w-[35%] absolute z-0 top-8",
                                    currentStep > 1
                                        ? "bg-indigo-700"
                                        : "bg-slate-700"
                                )}
                            ></div>
                            {CHECKOUT_STEPS.map((step, i) => {
                                return (
                                    <div
                                        key={Math.random()}
                                        className="flex flex-col z-10 gap-1 items-center"
                                    >
                                        <p className="text-xs text-slate-300">
                                            {step.title}
                                        </p>
                                        <div
                                            className={cn(
                                                "bg-slate-700 p-2  w-[30px] h-[30px] flex items-center justify-center rounded-full",
                                                currentStep >= i + 1 &&
                                                    "bg-indigo-700"
                                            )}
                                        >
                                            <span className="text-xs">
                                                {currentStep > i + 1 ? (
                                                    <Check size={18} />
                                                ) : (
                                                    i + 1
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {CHECKOUT_STEPS[currentStep - 1].component}
                    </>
                ) : (
                    <div className="mt-[30%]">
                        <Spinner />
                    </div>
                )}
            </div>
        </>
    );
};

export default Checkout;
