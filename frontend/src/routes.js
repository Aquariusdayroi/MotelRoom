import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    Navigate,
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
import Chat from "./pages/Chat";
import AdminManagement from "./pages/AdminManagement";
import AnimatedPage from "./animations/AnimatedPage";
import AuthenticManage from "./components/adminManage/AuthenticManage";
import AddPost from "./pages/AddPost";
import ScrollToTop from "./until/ScrollToTop";
import Statistical from "./components/adminManage/Statistical";
import HeaderWhite from "./layout/components/HeaderWhite";
import OwnerManagement from "./pages/OwnerManagement";
import OwnerDashboard from "./components/ownerManage/OwnerDashboard";
import OwnerPostManagement from "./components/ownerManage/OwnerPostManagement";
import ForgotPassword from "./components/authForm/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PostRules from "./pages/PostRules";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ComplaintResolution from "./pages/ComplaintResolution";
import UserAgreement from "./pages/UserAgreement";
import RentalCategoryRules from "./pages/RentalCategoryRules";
import RoomRentalRules from "./pages/RoomRentalRules";
import ApartmentRentalRules from "./pages/ApartmentRentalRules";
import Policy from "./pages/Policy";
export default function AppRoutes() {
    return (
        <Router>
            <ScrollToTop />
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
                <Route
                    path="/login"
                    element={
                        <Layout useHeaderWhite={true}>
                            <Login />
                        </Layout>
                    }
                />
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
                {/* footer policy */}
                <Route
                    path="/post-rules"
                    element={
                        <Layout enableScroll={false} enableSearch={false}>
                            <PostRules />
                        </Layout>
                    }
                />
                <Route
                    path="/privacy-policy"
                    element={
                        <Layout enableScroll={false} enableSearch={false}>
                            <PrivacyPolicy />
                        </Layout>
                    }
                />
                <Route
                    path="/terms-of-use"
                    element={
                        <Layout enableScroll={false} enableSearch={false}>
                            <TermsOfUse />
                        </Layout>
                    }
                />
                <Route
                    path="/complaint-resolution"
                    element={
                        <Layout enableScroll={false} enableSearch={false}>
                            <ComplaintResolution />
                        </Layout>
                    }
                />
                <Route
                    path="/user-agreement"
                    element={
                        <Layout enableScroll={false} enableSearch={false}>
                            <UserAgreement />
                        </Layout>
                    }
                />
                <Route
                    path="/rental-category-rules"
                    element={
                        <Layout enableScroll={false} enableSearch={false}>
                            <RentalCategoryRules />
                        </Layout>
                    }
                />
                <Route
                    path="/room-rental-rules"
                    element={
                        <Layout enableScroll={false} enableSearch={false}>
                            <RoomRentalRules />
                        </Layout>
                    }
                />
                <Route
                    path="/apartment-rental-rules"
                    element={
                        <Layout enableScroll={false} enableSearch={false}>
                            <ApartmentRentalRules />
                        </Layout>
                    }
                />
                <Route
                    path="/policy"
                    element={
                        <Layout enableScroll={false} enableSearch={false}>
                            <Policy />
                        </Layout>
                    }
                />
                {/* ====== */}
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
                <Route
                    path="/add-post"
                    element={
                        <ProtectedRoute>
                            <Layout enableScroll={false} enableSearch={false}>
                                <AddPost />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <Layout useHeaderWhite={true}>
                            <Chat />
                        </Layout>
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
                                <Statistical />
                            </AnimatedPage>
                        }
                    />
                </Route>
                <Route
                    path="/reset-password/:uidb64/:token"
                    element={
                        <Layout useHeaderWhite={true}>
                            <ResetPassword />
                        </Layout>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}
