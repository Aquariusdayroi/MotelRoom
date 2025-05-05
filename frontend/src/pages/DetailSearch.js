// DetailSearch.js
import styles from "../styles/DetailSearch.module.css";
import RoomCard from "../components/RoomCard";
import { images } from "../assets/images";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const fetchCoordinates = async (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        return [lat, lng];
    }

    throw new Error("Không tìm thấy tọa độ cho địa chỉ.");
};

const DetailSearch = () => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const routeRef = useRef(null);
    const markersRef = useRef([]);
    const roomData = [
        {
            id: 1,
            images: [images.background, images.background],
            address: "Phòng trọ Quận 1",
            location:
                "12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh, Việt Nam",
            owner: "Nguyễn Văn A",
            price: "3.000.000đ",
            type: "Phòng trọ",
            area: "25m²",
            isNew: true,
        },
        {
            id: 2,
            images: [images.background],
            address: "Phòng trọ Quận 2",
            location:
                "366 Đ. Phan Văn Trị, Phường 5, Gò Vấp, Hồ Chí Minh, Việt Nam",
            owner: "Trần Thị B",
            price: "2.500.000đ",
            type: "Phòng trọ",
            area: "20m²",
            isNew: false,
        },
        {
            id: 3,
            images: [images.background],
            address: "Phòng trọ Quận 3",
            location:
                "12 Đ. Phan Văn Trị, Phường 7, Gò Vấp, Hồ Chí Minh, Việt Nam",
            owner: "Lê Văn C",
            price: "4.000.000đ",
            type: "Phòng trọ",
            area: "30m²",
            isNew: true,
        },
        {
            id: 4,
            images: [images.background],
            address: "Phòng trọ Quận 3",
            location:
                "12 Đ. Phan Văn Trị, Phường 7, Gò Vấp, Hồ Chí Minh, Việt Nam",
            owner: "Lê Văn C",
            price: "4.000.000đ",
            type: "Phòng trọ",
            area: "30m²",
            isNew: true,
        },
    ];
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [selectedCoordinates, setSelectedCoordinates] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) =>
                setCurrentPosition([pos.coords.latitude, pos.coords.longitude]),
            (err) => console.error("Không thể lấy vị trí người dùng:", err)
        );
    }, []);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [106.68, 10.82],
            zoom: 13,
        });

        return () => mapRef.current?.remove();
    }, []);

    useEffect(() => {
        if (!mapRef.current || !selectedCoordinates || !currentPosition) return;

        const map = mapRef.current;

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        map.flyTo({
            center: [selectedCoordinates[1], selectedCoordinates[0]],
            zoom: 14,
        });

        // Add markers
        const destinationMarker = new mapboxgl.Marker()
            .setLngLat([selectedCoordinates[1], selectedCoordinates[0]])
            .addTo(map);

        const currentPositionMarker = new mapboxgl.Marker({ color: "blue" })
            .setLngLat([currentPosition[1], currentPosition[0]])
            .addTo(map);

        markersRef.current.push(destinationMarker, currentPositionMarker);

        // Remove existing route
        if (map.getLayer("route")) map.removeLayer("route");
        if (map.getSource("route")) map.removeSource("route");

        const getRoute = async () => {
            try {
                const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentPosition[1]},${currentPosition[0]};${selectedCoordinates[1]},${selectedCoordinates[0]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0];

                    // Add route to map
                    map.addSource("route", {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: {},
                            geometry: route.geometry,
                        },
                    });

                    map.addLayer({
                        id: "route",
                        type: "line",
                        source: "route",
                        layout: {
                            "line-join": "round",
                            "line-cap": "round",
                        },
                        paint: {
                            "line-color": "#3b82f6",
                            "line-width": 4,
                            "line-opacity": 0.75,
                        },
                    });

                    // Fit map to show entire route
                    const bounds = new mapboxgl.LngLatBounds();
                    route.geometry.coordinates.forEach((coord) => {
                        bounds.extend(coord);
                    });
                    map.fitBounds(bounds, { padding: 50 });
                }
            } catch (error) {
                console.error("Lỗi khi tải đường đi:", error);
            }
        };

        getRoute();
    }, [selectedCoordinates, currentPosition]);

    const handleLocationClick = async (id) => {
        const room = roomData.find((r) => r.id === id);
        if (!room) return;

        try {
            const coords = await fetchCoordinates(room.location);
            setSelectedRoomId(id);
            setSelectedCoordinates(coords);
        } catch (err) {
            console.error("Lỗi khi lấy tọa độ:", err);
        }
    };

    return (
        <div className="d-flex">
            <div className={`${styles.container} col-md-8 pe-1`}>
                {" "}
                {/* Changed col-md-9 to col-md-8 and pe-0 to pe-1 */}
                <div className="pt-5 pb-2 fs-4 fw-bold">Hơn 1.000 chỗ ở</div>
                <div className="row g-2">
                    {" "}
                    {/* Changed g-3 to g-2 for tighter card spacing */}
                    {roomData.map((room) => (
                        <div key={room.id} className="col-md-4 pe-1">
                            {" "}
                            {/* Changed pe-2 to pe-1 */}
                            <RoomCard
                                {...room}
                                onClick={() => setSelectedRoomId(room.id)}
                                onLocationClick={() =>
                                    handleLocationClick(room.id)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-md-4 ps-0">
                {" "}
                {/* Changed col-md-3 to col-md-4 */}
                <div
                    ref={mapContainerRef}
                    style={{ height: "100vh", width: "100%" }}
                />
            </div>
        </div>
    );
};

export default DetailSearch;
