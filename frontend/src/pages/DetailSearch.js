// DetailSearch.js
import styles from "../styles/DetailSearch.module.css";
import RoomCard from "../components/RoomCard";
import { images } from "../assets/images";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation } from "react-router-dom";
import mapboxApi from "../api/mapboxApi";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const DetailSearch = () => {
    const location = useLocation();
    const { rooms, message, searchParams, timestamp } = location.state || {};

    const [displayRooms, setDisplayRooms] = useState([]);
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markersRef = useRef([]);
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

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        map.flyTo({
            center: [selectedCoordinates[1], selectedCoordinates[0]],
            zoom: 14,
        });
        const destinationMarker = new mapboxgl.Marker()
            .setLngLat([selectedCoordinates[1], selectedCoordinates[0]])
            .addTo(map);

        const currentPositionMarker = new mapboxgl.Marker({ color: "blue" })
            .setLngLat([currentPosition[1], currentPosition[0]])
            .addTo(map);

        markersRef.current.push(destinationMarker, currentPositionMarker);

        if (map.getLayer("route")) map.removeLayer("route");
        if (map.getSource("route")) map.removeSource("route");

        const getRoute = async () => {
            try {
                const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentPosition[1]},${currentPosition[0]};${selectedCoordinates[1]},${selectedCoordinates[0]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0];

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
        const room = displayRooms.find((r) => r.id === id);
        if (!room) return;

        try {
            const coords = await mapboxApi.fetchCoordinates(
                room.address.description
            );
            setSelectedRoomId(id);
            setSelectedCoordinates(coords);
        } catch (err) {
            console.error("Lỗi khi lấy tọa độ:", err);
        }
    };

    useEffect(() => {
        if (location.state) {
            setDisplayRooms(location.state.rooms || []);
            setSelectedRoomId(null);
            setSelectedCoordinates(null);

            if (
                location.state.searchParams?.lat &&
                location.state.searchParams?.lng
            ) {
                const newCenter = [
                    location.state.searchParams.lng,
                    location.state.searchParams.lat,
                ];

                if (mapRef.current) {
                    mapRef.current.flyTo({
                        center: newCenter,
                        zoom: 14,
                        essential: true,
                    });
                }
            }
        }
    }, [location.state, timestamp]);

    useEffect(() => {
        if (rooms) {
            setDisplayRooms(rooms);
        }
    }, [rooms]);

    return (
        <div className="d-flex">
            <div className={`${styles.container} col-md-8 pe-1`}>
                <div className="pt-5 pb-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="fs-4 fw-bold">
                            {message ? (
                                <span className="text-danger">{message}</span>
                            ) : (
                                `${displayRooms.length} chỗ ở được tìm thấy`
                            )}
                        </div>
                        {searchParams && (
                            <div className="text-muted">
                                {searchParams.area &&
                                    `Khu vực: ${searchParams.area}`}
                                {searchParams.home_type &&
                                    ` | Loại: ${searchParams.home_type}`}
                                {searchParams.min_price &&
                                    ` | Từ: ${new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                        minimumFractionDigits: 0,
                                    }).format(searchParams.min_price)}`}
                                {searchParams.max_price &&
                                    ` | Đến: ${new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                        minimumFractionDigits: 0,
                                    }).format(searchParams.max_price)}`}
                            </div>
                        )}
                    </div>
                </div>

                {!message && (
                    <div className="row g-2">
                        {displayRooms.map((room) => (
                            <div key={room.id} className="col-md-4 pe-1">
                                <RoomCard
                                    key={room.id}
                                    images={
                                        room.images && room.images.length > 0
                                            ? room.images
                                            : [images.background]
                                    }
                                    title={room.title}
                                    address={room.address}
                                    user={room.user} // Truyền toàn bộ user object
                                    price={room.price}
                                    home_type={room.home_type}
                                    acreage={room.acreage}
                                    isNew={
                                        new Date(room.update_at) >
                                        Date.now() - 1000 * 60 * 60 * 24 * 7
                                    }
                                    onClick={() => setSelectedRoomId(room.id)}
                                    onLocationClick={() =>
                                        handleLocationClick(room.id)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}

                {message && (
                    <div className="text-center py-5">
                        <div className="fs-5 mb-3">{message}</div>
                        <div className="text-muted">
                            Vui lòng thử lại với tiêu chí tìm kiếm khác
                        </div>
                    </div>
                )}
            </div>

            <div className="col-md-4 ps-0">
                <div
                    ref={mapContainerRef}
                    style={{ height: "100vh", width: "100%" }}
                />
            </div>
        </div>
    );
};

export default DetailSearch;
