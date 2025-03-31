import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function AppRoutes() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

// Component để quản lý các route với hiệu ứng chuyển đổi
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Intro />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </AnimatePresence>
    );
}
