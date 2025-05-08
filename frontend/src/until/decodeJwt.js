const decodeJwtPayload = (token) => {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("JWT không hợp lệ");
        }

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(
            base64.length + ((4 - (base64.length % 4)) % 4),
            "="
        ); // padding
        const decoded = atob(padded);

        return JSON.parse(decoded);
    } catch (error) {
        console.error("Giải mã JWT thất bại:", error);
        return null;
    }
};
export default decodeJwtPayload;
