import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/redux/slices/authSlice";
import { useUpdateCustomerFormMutation } from "@/redux/api/apiSlice";
import { useToast } from "../ui/use-toast";

const Address = ({ data }) => {
    const user = useSelector(getCurrentUser);
    const [updateCustomerForm, { isLoading, isSuccess, isError, error }] =
        useUpdateCustomerFormMutation();
    const [errors, setErrors] = useState({});
    const { toast } = useToast();

    useEffect(() => {
        if (!isError) return setErrors({});
        const result = error.data.errors.reduce(
            (acc, err) => ({
                ...acc,
                [err.path[0]]: err.message,
            }),
            {}
        );
        setErrors(result);
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Changes saved successfully",
            });
        }
    }, [isSuccess]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = user.name;
        const email = formData.get("email");
        const address = formData.get("line1");
        const city = formData.get("city");
        const pincode = formData.get("pincode");
        const state = formData.get("state");
        const customerId = data?.customerId;
        updateCustomerForm({
            name,
            email,
            address,
            city,
            pincode,
            state,
            customerId,
        });
    };

    return (
        <>
            {data && data?.subscriptions ? (
                <>
                    <p className="text-sm text-slate-400 mb-2">
                        Make changes to your profile here. Click save when
                        you're done.
                    </p>
                    <form
                        onSubmit={handleFormSubmit}
                        className="flex gap-6 w-full max-w-4xl"
                    >
                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <Label className="text-slate-300">
                                    Address Line 1
                                </Label>
                                <Input
                                    type="text"
                                    defaultValue={data.profile.address.line1}
                                    name="line1"
                                />
                                {isError && (
                                    <p className="text-red-700 mt-1 text-xs">
                                        {errors["address"]}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="text-slate-300">City</Label>
                                <Input
                                    type="text"
                                    defaultValue={data.profile.address.city}
                                    name="city"
                                />
                                {isError && (
                                    <p className="text-red-700 mt-1 text-xs">
                                        {errors["city"]}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="text-slate-300">
                                    Pincode
                                </Label>
                                <Input
                                    type="text"
                                    defaultValue={
                                        data.profile.address.postal_code
                                    }
                                    name="pincode"
                                />
                                {isError && (
                                    <p className="text-red-700 mt-1 text-xs">
                                        {errors["pincode"]}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <Label className="text-slate-300">Email</Label>
                                <Input
                                    type="text"
                                    defaultValue={data.profile.email}
                                    readOnly
                                    className="bg-slate-800/50 text-slate-400"
                                    name="email"
                                />
                            </div>
                            <div>
                                <Label className="text-slate-300">State</Label>
                                <Input
                                    type="text"
                                    defaultValue={data.profile.address.state}
                                    name="state"
                                />
                                {isError && (
                                    <p className="text-red-700 mt-1 text-xs">
                                        {errors["state"]}
                                    </p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                variant="secondary"
                                className="self-end"
                            >
                                {isLoading ? "Saving..." : "Save changes"}
                            </Button>
                        </div>
                    </form>
                </>
            ) : (
                <p className="text-slate-500 max-w-sm text-center mt-4">
                    No address found.
                </p>
            )}
        </>
    );
};

export default Address;
