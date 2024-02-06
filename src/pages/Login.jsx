import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import googleLogo from "@/assets/googleLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useGoogleLoginMutation, useLoginMutation } from "@/redux/api/apiSlice";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    const navigate = useNavigate();
    const [login, { isError, error, isLoading, isSuccess }] =
        useLoginMutation();
    const [googleLogin, { _, isSuccess: googleSuccess }] =
        useGoogleLoginMutation();

    const googleLoginHandler = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const res = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            );
            const result = await res.json();
            const fullName = `${result.given_name} ${result.family_name}`;
            googleLogin({ name: fullName, email: result.email });
        },
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!(email.trim() && password.trim())) return;
        login({
            email,
            password,
        });
    };

    useEffect(() => {
        if (email.trim().includes("@") && password.trim().length >= 6) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [email, password]);

    useEffect(() => {
        if (isSuccess || googleSuccess) {
            navigate("/");
        }
    }, [isSuccess, googleSuccess]);

    return (
        <>
            <Navbar />
            <section className="max-w-[450px] mx-auto mt-4">
                <Card className="dark:bg-slate-900">
                    <CardHeader>
                        <CardTitle className="text-center">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    className="dark:bg-slate-950/10 outline-none dark:placeholder:text-slate-500"
                                    id="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    disableFocus
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    className="dark:bg-slate-950/10 dark:placeholder:text-slate-500"
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter password"
                                    disableFocus
                                />
                            </div>
                            {isError && (
                                <div>
                                    <p className="text-red-700 text-xs">
                                        {error.data.msg}
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-3 mx-2 items-center justify-center">
                                <Separator />
                                <span className="text-sm font-medium text-slate-400 leading-none">
                                    OR
                                </span>
                                <Separator />
                            </div>
                            <Button
                                variant="outline"
                                className="flex gap-2 p-5 bg-slate-50 w-full items-center justify-center py-6 mb-4 dark:bg-slate-950/10 dark:hover:bg-slate-900"
                                onClick={googleLoginHandler}
                                type="button"
                            >
                                <img
                                    className="object-contain w-[35px]"
                                    src={googleLogo}
                                    alt="Google Signup"
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-none">
                                    Login with google
                                </span>
                            </Button>
                            <Button
                                varient="primary"
                                className="w-full dark:text-white"
                                disabled={isDisabled}
                                type="submit"
                            >
                                {isLoading ? "Logging in..." : "Submit"}
                            </Button>
                        </form>
                        <div className="mt-4 flex gap-2 justify-center">
                            <span className="text-sm text-slate-500">
                                Don't have an account?
                            </span>
                            <Link
                                className="text-indigo-700 text-sm"
                                to="/signup"
                            >
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </>
    );
};

export default Login;
