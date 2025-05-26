import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function MapModal({ show, onHide, latitude, longitude }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    if (show && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          setSelectedLocation({ lat, lng });
        },
        (err) => {
          console.warn("Không lấy được vị trí hiện tại:", err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, [show]);

  useEffect(() => {
    if (show && latitude && longitude && mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 14,
      });

      mapInstance.current = map;

      new mapboxgl.Marker({ color: "red" })
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setText("Vị trí phòng trọ"))
        .addTo(map);

      map.on("click", (e) => {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;
        setSelectedLocation({ lng, lat });
      });

      return () => map.remove();
    }
  }, [show, latitude, longitude]);

  // Khi có selectedLocation thì vẽ marker và route
  useEffect(() => {
    const map = mapInstance.current;
    if (!selectedLocation || !map) return;

    // Xoá tuyến đường cũ nếu tồn tại
    if (map.getSource("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    const newUserMarker = new mapboxgl.Marker({ color: "blue" })
      .setLngLat([
        selectedLocation.lng || selectedLocation.lng,
        selectedLocation.lat || selectedLocation.lat,
      ])
      .setPopup(new mapboxgl.Popup().setText("Vị trí của bạn"))
      .addTo(map);

    userMarkerRef.current = newUserMarker;

    const getRoute = async () => {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${selectedLocation.lng},${selectedLocation.lat};${longitude},${latitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const json = await query.json();
      const data = json.routes[0];

      if (!data) return;

      const route = data.geometry;

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: route,
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
          "line-color": "#3b9ddd",
          "line-width": 5,
        },
      });

      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([selectedLocation.lng, selectedLocation.lat]);
      bounds.extend([longitude, latitude]);
      map.fitBounds(bounds, { padding: 60 });
    };

    getRoute();
  }, [selectedLocation, latitude, longitude]);

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chỉ đường tới phòng trọ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          ref={mapRef}
          style={{ width: "100%", height: "700px", borderRadius: "10px" }}
        />
        <p className="mt-2 text-muted text-center">
          📍 Hệ thống sẽ lấy vị trí hiện tại của bạn, hoặc bạn có thể click bản
          đồ để chọn lại điểm bắt đầu.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MapModal;
