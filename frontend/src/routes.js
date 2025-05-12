import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Intro from './pages/Intro';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Layout from './layout/Layout';
import DetailSearch from './pages/DetailSearch';
import Detail from './pages/Detail';
import ProtectedRoute from './until/ProtectedRoute';
import PostManagement from './pages/PostManagement';
import Chat from './pages/Chat';
import AdminManagement from './pages/AdminManagement';
import AnimatedPage from './animations/AnimatedPage';
import AuthenticManage from './components/adminManage/AuthenticManage';
import AddPost from './pages/AddPost';
import OwnerManagement from './pages/OwnerManagement';
import OwnerDashboard from './components/ownerManage/OwnerDashboard';
import OwnerPostManagement from './components/ownerManage/OwnerPostManagement';

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
                        <ProtectedRoute allowedRoles={["owner", "admin"]}>
                            <Layout enableScroll={false} enableSearch={false}>
                                <PostManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/chat" element={

                    // <Layout enableScroll={false} enableSearch={false}>
                    <Chat />
                    // </Layout>
                }
                />

                <Route
                    path="/admin-manage"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Layout enableScroll={false} enableSearch={false}>
                                <AdminManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="authentic"
                        element={
                            <AnimatedPage>
                                <AuthenticManage />
                            </AnimatedPage>
                        }
                    />
                    <Route
                        path="post"
                        element={
                            <AnimatedPage>
                                <div>Quản lý bài đăng</div>
                            </AnimatedPage>
                        }
                    />
                    <Route
                        path="comment"
                        element={
                            <AnimatedPage>
                                <div>Quản lý đánh giá</div>
                            </AnimatedPage>
                        }
                    />
                    <Route
                        path="account"
                        element={
                            <AnimatedPage>
                                <div>Quản lý tài khoản</div>
                            </AnimatedPage>
                        }
                    />
                    <Route
                        path="statistical"
                        element={
                            <AnimatedPage>
                                <div>Thống kê hệ thống</div>
                            </AnimatedPage>
                        }
                    />
                </Route>
                <Route
                    path="/owner-manage"
                    element={
                        <ProtectedRoute allowedRoles={["owner"]}>
                            <Layout enableScroll={false} enableSearch={false}>
                                <OwnerManagement />
                            </Layout>
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="dashboard"
                        element={
                            <AnimatedPage>
                                <OwnerDashboard />
                            </AnimatedPage>
                        }
                    />
                    <Route
                        path="posts"
                        element={
                            <AnimatedPage>
                                <OwnerPostManagement />
                            </AnimatedPage>
                        }
                    />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}
