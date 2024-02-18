import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/redux/slices/authSlice";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CustomerForm = ({
    handleCustomerFormSubmit,
    isLoading,
    isError,
    error,
}) => {
    const user = useSelector(getCurrentUser);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!error?.length > 0) return setErrors({});
        const result = error.reduce(
            (acc, err) => ({
                ...acc,
                [err.path[0]]: err.message,
            }),
            {}
        );
        setErrors(result);
    }, [isError]);
    return (
        <div className="mx-4">
            <form
                onSubmit={handleCustomerFormSubmit}
                className="flex flex-col gap-4"
            >
                <div>
                    <Label className="text-slate-300">Name</Label>
                    <Input
                        defaultValue={user.name}
                        placeholder="e.g John Doe"
                        name="name"
                        type="text"
                        className={cn(
                            errors["name"] && "border border-red-700"
                        )}
                    />
                    {isError && (
                        <p className="text-red-700 mt-1 text-xs">
                            {errors["name"]}
                        </p>
                    )}
                </div>
                <div>
                    <Label className="text-slate-300">Email</Label>
                    <Input
                        value={user.email}
                        name="email"
                        type="email"
                        readOnly
                        className="bg-slate-700/20 opacity-80"
                    />
                    {isError && (
                        <p className="text-red-700 mt-1 text-xs">
                            {errors["email"]}
                        </p>
                    )}
                </div>
                <div>
                    <Label className="text-slate-300">Address Line 1</Label>
                    <Input placeholder="address" type="text" name="address" />
                    {isError && (
                        <p className="text-red-700 mt-1 text-xs">
                            {errors["address"]}
                        </p>
                    )}
                </div>
                <div className="flex gap-6">
                    <div className="w-full">
                        <Label className="text-slate-300">City</Label>
                        <Input placeholder="city" type="text" name="city" />
                        {isError && (
                            <p className="text-red-700 mt-1 text-xs">
                                {errors["city"]}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <Label className="text-slate-300">Pincode</Label>
                        <Input
                            placeholder="pincode"
                            type="number"
                            name="pincode"
                        />
                        {isError && (
                            <p className="text-red-700 mt-1 text-xs">
                                {errors["pincode"]}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <Label className="text-slate-300">State</Label>
                    <Input placeholder="state" name="state" type="text" />
                    {isError && (
                        <p className="text-red-700 mt-1 text-xs">
                            {errors["state"]}
                        </p>
                    )}
                </div>
                <div className="self-end">
                    <Button type="submit">
                        {isLoading ? "Please wait..." : "Proceed to Payment"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
