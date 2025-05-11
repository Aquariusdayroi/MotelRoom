import Cookies from "js-cookie";

const forceLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userInfo");

    window.location.href = "/login";
};

export default forceLogout;
