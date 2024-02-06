import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

const PricingCard = ({ plan, price, children }) => {
    const isTeams = plan === "Teams";
    return (
        <Card
            className={cn(
                "max-w-[350px] w-full dark:bg-slate-900",
                isTeams && "border-gradient"
            )}
        >
            {isTeams && (
                <div className="primary-gradient w-full h-[5px] border-t-r absolute top-0 right-0"></div>
            )}
            <CardHeader>
                <h3 className="text-center font-xs font-bold">{plan}</h3>
            </CardHeader>
            <CardContent>
                <span className="text-5xl font-medium text-center ">
                    &#8377;{price}
                </span>
                <span className=" text-slate-500">/ per month</span>
                <div className="h-full grid grid-rows-1 gap-8">
                    <div className="mt-8 space-y-3">{children}</div>

                    <Button
                        className="w-full"
                        disabled={!isTeams}
                        variant={!isTeams ? "outline" : "primary"}
                    >
                        {isTeams ? "Subscribe" : "Current plan"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PricingCard;
