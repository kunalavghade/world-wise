import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeoloaction";
import Button from "./Button";

function Map() {
  const [searchParams] = useSearchParams();
  const [mapposition, setPosition] = useState([40, 0]);
  const { isLoading, position, getPosition } = useGeolocation();

  const { cities } = useCities();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    console.log(position);
    if (position.lat && position.lng) setPosition([position.lat, position.lng]);
  }, [position]);

  return (
    <div className={styles.mapContainer}>
      {position.lat === undefined && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "Loading..." : "Use Your position"}
        </Button>
      )}
      <MapContainer
        center={mapposition}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
              {lat} {lng}
            </Popup>
          </Marker>
        ))}

        <DetectClick />
        <ChangeCenter position={mapposition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
export default Map;
