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

        if (token && userInfoCookie) {
            const decoded = decodeJwtPayload(token);
            const parsedUser = JSON.parse(userInfoCookie);

            setUser(token);
            setRole(parsedUser.role || (decoded && decoded.role) || null);
            setUserInfo(parsedUser);
        }
    }, []);
    const login = async (data) => {
        const res = await authApi.login(data);

        if (res.data && res.data.access) {
            const authToken = res.data.access;
            const refreshToken = res.data.refresh;
            const userPayload = res.data.user;

            const decode = decodeJwtPayload(authToken);

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

    const logout = () => {
        setUser(null);
        setRole(null);
        setUserInfo(null);
        Cookies.remove("authToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userInfo");
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
