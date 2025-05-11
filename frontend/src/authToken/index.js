import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import authApi from "../api/authApi";
import decodeJwtPayload from "./../until/decodeJwt";

export let AuthToken = createContext();

const AuthProvider = ({ children }) => {
    const authTokenCookie = Cookies.get("authToken");

    const decodedToken = authTokenCookie
        ? decodeJwtPayload(authTokenCookie)
        : null;
    const [user, setUser] = useState(authTokenCookie || null);
    const [role, setRole] = useState(decodedToken ? decodedToken.role : null);
    const [userInfo, setUserInfo] = useState(decodedToken || null);

    useEffect(() => {
        const token = Cookies.get("authToken");
        const userInfoCookie = Cookies.get("userInfo");
        if (token) {
            const decoded = decodeJwtPayload(token);
            const parsedUser = JSON.parse(userInfoCookie)
                ? JSON.parse(Cookies.get("userInfo"))
                : {};

            setUser(token);
            setRole(parsedUser.role);
            setUserInfo({ ...parsedUser, user_id: decoded.user_id });
        }
    }, []);

    const login = async (data) => {
        const res = await authApi.login(data);

        if (res.data && res.data.access) {
            const authToken = res.data.access;
            const refreshToken = res.data.refresh;
            const userPayload = res.data.user;

            // Lưu token vào cookie
            Cookies.set("authToken", authToken, { expires: 7 });
            Cookies.set("refreshToken", refreshToken, { expires: 7 });
            Cookies.set("userInfo", JSON.stringify(userPayload), {
                expires: 7,
            });

            // Lưu vào state
            setUser(authToken);
            setRole(userPayload.role);
            setUserInfo(userPayload);
        }
    };

    const logout = async () => {
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
            try {
                const res = await authApi.logout({ refresh: refreshToken });

                if (res.data.success) {
                    Cookies.remove("authToken");
                    Cookies.remove("refreshToken");
                    Cookies.remove("userInfo");

                    setUser(null);
                    setRole(null);
                    setUserInfo(null);

                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Logout thất bại:", error);
            }
        }
    };

    let authData = {
        user,
        role,
        userInfo,
        login,
        logout,
    };

    return <AuthToken.Provider value={authData}>{children}</AuthToken.Provider>;
};

export default AuthProvider;
