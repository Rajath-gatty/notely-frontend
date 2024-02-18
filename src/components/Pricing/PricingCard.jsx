import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";

const PricingCard = ({
    plan,
    price,
    children,
    isSelected = false,
    className,
}) => {
    const user = useSelector(getCurrentUser);
    const isPro = plan === "Pro";
    return (
        <Card
            className={cn(
                "max-w-[350px] w-full h-full flex flex-col dark:bg-slate-900",
                className,
                isPro && "border-gradient"
            )}
        >
            {isPro && (
                <div className="primary-gradient w-full h-[5px] overflow-hidden rounded-t-sm absolute top-0 right-0"></div>
            )}
            <CardHeader>
                <h3 className="text-center md:text-2xl text-md font-bold">
                    {plan}
                </h3>
            </CardHeader>
            <CardContent className="self-stretch h-full">
                <span className="md:text-5xl text-4xl font-medium text-center ">
                    &#8377;{price}
                </span>
                <span className=" text-slate-500">/ per month</span>
                <div className="h-full grid grid-rows-1 gap-8">
                    <div className="mt-8 space-y-3">{children}</div>

                    {!isPro ? (
                        <Button className="w-full" disabled variant="outline">
                            {user?.plan === "pro"
                                ? "Free plan"
                                : user
                                ? "Current plan"
                                : "free plan"}
                        </Button>
                    ) : (
                        <Link to="/summary">
                            <Button
                                className="w-full"
                                disabled={isSelected || user?.plan === "pro"}
                                variant={"primary"}
                            >
                                {user?.plan === "pro"
                                    ? "Current Plan"
                                    : isSelected
                                    ? "Selected plan"
                                    : "Subscribe"}
                            </Button>
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default PricingCard;
