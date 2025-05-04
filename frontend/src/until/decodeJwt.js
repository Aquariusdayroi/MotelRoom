const decodeJwtPayload = (token) => {
    try {
        // Tách token ra làm 3 phần: header, payload, signature
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("JWT not valid");
        }

        // Lấy và giải mã payload
        const decoded = atob(parts[1]);
        return JSON.parse(decoded);
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        return null;
    }
};

export default decodeJwtPayload;
