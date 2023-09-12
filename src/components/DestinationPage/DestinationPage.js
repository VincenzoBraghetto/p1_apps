import React, { useState, useRef } from "react";
import GoogleMapReact from "google-map-react";

function MapWithSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const mapRef = useRef(null);

  const searchLocation = () => {
    if (mapRef.current) {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: searchTerm }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          mapRef.current.panTo(location);
        } else {
          console.error("No se pudo encontrar la ubicación.");
        }
      });
    }
  };

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };

          if (mapRef.current) {
            mapRef.current.panTo(userLocation);
          }
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error.message);
        }
      );
    } else {
      console.error("Geolocalización no está disponible en este navegador.");
    }
  };

  return (
    <div style={{ marginTop: "83px", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          zIndex: 2,
        }}
      >
        <input
          type="text"
          placeholder="Ingrese el nombre de la ubicación"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchLocation}>Buscar</button>
        <button onClick={locateUser}>Ubicación Actual</button>
      </div>
      <div style={{ height: "680px", width: "400px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GAPI_KEY,
            libraries: ["geometry", "drawing", "places"],
          }}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          defaultZoom={8}
          ref={mapRef}
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
        >
          {/* Puedes agregar marcadores u otros componentes de mapa aquí */}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default MapWithSearch;
