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
import ProtectedRoute from "./until/ProtectedRoute";
import PostManagement from "./pages/PostManagement";
import AdminManagement from "./pages/AdminManagement";

export default function AppRoutes() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

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
                    element={
                        <ProtectedRoute>
                            <Layout enableScroll={false} enableSearch={false}>
                                <Profile />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/post"
                    element={
                        <ProtectedRoute>
                            <Layout enableScroll={false} enableSearch={false}>
                                <PostManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-manage"
                    element={
                        <ProtectedRoute>
                            <Layout enableScroll={false} enableSearch={false}>
                                <AdminManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="authentic"
                        element={<div>Xác thực tài khoản</div>}
                    />
                    <Route path="post" element={<div>Quản lý bài đăng</div>} />
                    <Route
                        path="comment"
                        element={<div>Quản lý đánh giá</div>}
                    />
                    <Route
                        path="account"
                        element={<div>Quản lý tài khoản</div>}
                    />
                    <Route
                        path="statistical"
                        element={<div>Thống kê hệ thống</div>}
                    />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}
