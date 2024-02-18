import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Board from "./pages/Board";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import OrderSummary from "./pages/OrderSummary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Checkout from "./pages/Checkout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute inverse />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
                <Route path="/pricing" element={<Pricing />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/summary" element={<OrderSummary />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/board/:boardId" element={<Board />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
