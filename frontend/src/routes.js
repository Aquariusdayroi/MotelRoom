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
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import DetailSearch from "./pages/DetailSearch";
import Detail from "./pages/Detail";
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
                <Route
                    path="/home"
                    element={
                        <Layout enableScroll={true}>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/detail-search"
                    element={
                        <Layout enableScroll={false}>
                            <DetailSearch />
                        </Layout>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/detail/:roomId"
                    element={
                        <Layout enableScroll={false}>
                            <Detail />
                        </Layout>
                    }
                />
                <Route
                    path="/profile"
                    enableScroll={false}
                    element={<Profile />}
                />
            </Routes>
        </AnimatePresence>
    );
}
