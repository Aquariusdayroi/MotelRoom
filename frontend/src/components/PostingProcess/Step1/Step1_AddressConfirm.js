import { useState, useRef, useEffect } from "react";
import ProgressBar from "../ProgressBar";
import send from "../../../assets/img/send.png";
import "../../../styles/Step1_AddressConfirm.css";
import "../../../styles/Step1_Intro.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Step1_AddressConfirm({ data, onNext, onBack }) {
    const [address, setAddress] = useState(
        data.address || {
            place: "",
            building: "",
            street: "",
            city: "",
            detail: "",
        }
    );

    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const reverseGeocode = async (lng, lat) => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();

            const main = data.features[0];
            const context = main.context || [];

            const getContext = (idFragment) =>
                context.find((c) => c.id.includes(idFragment));

            const street = main?.text || "";
            const building = main.place_type.includes("poi") ? main.text : "";
            const ward = getContext("locality")?.text || "";
            let district = getContext("district")?.text || "";
            if (!district) {
                district = getContext("locality")?.text || "";
            }
            const city = getContext("place")?.text || "";
            const region = getContext("region")?.text || "";

            const fullAddress = [street, ward, district, city || region]
                .filter(Boolean)
                .join(", ");

            setAddress((prev) => ({
                ...prev,
                street,
                building,
                city: [district, city || region].filter(Boolean).join(", "),
                detail: fullAddress,
                latitude: lat, // <-- thêm dòng này
                longitude: lng, // <-- thêm dòng này
            }));
        } catch (error) {
            console.error("Reverse geocoding failed:", error);
        }
    };

    const handleLocate = () => {
        if (!navigator.geolocation) {
            alert("Trình duyệt không hỗ trợ định vị.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                if (mapRef.current) {
                    mapRef.current.flyTo({ center: [lng, lat], zoom: 15 });

                    if (markerRef.current) {
                        markerRef.current.setLngLat([lng, lat]);
                    } else {
                        markerRef.current = new mapboxgl.Marker()
                            .setLngLat([lng, lat])
                            .addTo(mapRef.current);
                    }
                }

                await reverseGeocode(lng, lat);
            },
            (err) => {
                console.error("Lỗi định vị:", err);
                alert("Không thể lấy vị trí của bạn.");
            }
        );
    };

    useEffect(() => {
        if (!mapRef.current && mapContainerRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [106.7, 10.75],
                zoom: 12,
            });

            mapRef.current.on("click", async (e) => {
                const { lng, lat } = e.lngLat;

                if (markerRef.current) {
                    markerRef.current.setLngLat([lng, lat]);
                } else {
                    markerRef.current = new mapboxgl.Marker()
                        .setLngLat([lng, lat])
                        .addTo(mapRef.current);
                }

                await reverseGeocode(lng, lat);
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const forwardGeocode = async (query) => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    query
                )}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();

            if (data.features.length === 0) {
                console.warn("Không tìm thấy địa chỉ:", query);
                return;
            }

            const [lng, lat] = data.features[0].center;

            if (mapRef.current) {
                mapRef.current.flyTo({ center: [lng, lat], zoom: 15 });

                if (markerRef.current) {
                    markerRef.current.setLngLat([lng, lat]);
                } else {
                    markerRef.current = new mapboxgl.Marker()
                        .setLngLat([lng, lat])
                        .addTo(mapRef.current);
                }
            }

            await reverseGeocode(lng, lat);
        } catch (error) {
            console.error("Lỗi forward geocoding:", error);
        }
    };

    useEffect(() => {
        const { street, city } = address;

        if (!street || !city) return;

        const timer = setTimeout(() => {
            const query = `${street}, ${city}`;
            forwardGeocode(query);
        }, 1000);

        return () => clearTimeout(timer);
    }, [address.street, address.city]);

    return (
        <div className="basic-info-form">
            <ProgressBar currentStep={1} />
            <h4 className="fw-bold mb-4">Xác nhận địa chỉ của bạn</h4>

            <div className="address-section">
                <div className="map-container" style={{ position: "relative" }}>
                    <div
                        ref={mapContainerRef}
                        style={{
                            height: "420px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                        }}
                    ></div>

                    <button
                        onClick={handleLocate}
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            background: "#fff",
                            border: "1px solid #ccc",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        📍 Vị trí hiện tại
                    </button>

                    {/* <div className="search-box">
                        <img src={send} alt="" style={{ width: "20px" }} />
                        <input
                            type="text"
                            placeholder="Sử dụng vị trí của bạn"
                            value={address.detail}
                            name="detail"
                            onChange={handleInputChange}
                        />
                    </div> */}
                </div>

                <div className="address-inputs">
                    <input
                        type="text"
                        placeholder="Căn hộ, tầng, v.v. (nếu có)"
                        value={address.place}
                        name="place"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Tòa nhà (nếu có)"
                        value={address.building}
                        name="building"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ đường/phố"
                        value={address.street}
                        name="street"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Thành phố/quận/thị xã"
                        value={address.city}
                        name="city"
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="buttons">
                <button
                    className="back-btn"
                    onClick={() => onBack({ address })}
                >
                    <span
                        style={{
                            transform: "rotate(180deg)",
                            display: "inline-block",
                        }}
                    >
                        ➔
                    </span>
                    Quay lại
                </button>
                <button
                    className="next-btn"
                    onClick={() => onNext({ address })}
                    disabled={!address.detail}
                >
                    Tiếp tục ➔
                </button>
            </div>
        </div>
    );
}

export default Step1_AddressConfirm;
