import React, { useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext.js';

const AnyReactComponent = ({ text }) => <div>{text}</div>; 

const saveMarker = (lat, lon, token, trip_id, destination_id) => {
  console.log(trip_id);
  console.log(destination_id);
  console.log(token);
  fetch('http://localhost:3000/api/v1/markers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({ lat, lon, trip_id, destination_id})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Marcador guardado:', data);
  })
  .catch(error => {
    console.error('Error al guardar el marcador:', error);
  });
};

const Marker = ({ text }) => (
  <div>
    <FontAwesomeIcon icon={faMapPin} style={{ color: '#99c1f1', fontSize: '24px' }} />
    {text}
  </div>
);

function MapWithSearch() {
  const { authToken, tripId, destinationId} = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [destinos, setDestinos] = useState([]); // Estado para los destinos
  const mapRef = useRef(null);

  const agregarDestino = (latitud, longitud, nombre) => {
    setDestinos([...destinos, { latitud, longitud, nombre }]);
  };

  const searchLocation = () => {
    if (mapRef.current) {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: searchTerm }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          mapRef.current.panTo(location);

          agregarDestino(location.lat(), location.lng(), searchTerm); // Agregar el destino
          //console.log("lal");
          saveMarker(location.lat(), location.lng(), authToken, tripId, destinationId);
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
            agregarDestino(userLocation.lat, userLocation.lng, "Ubicación Actual"); // Agregar el destino
          }
          saveMarker(userLocation.lat, userLocation.lng, authToken);
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
          {destinos.map((destino, index) => (
            <Marker
              key={index}
              lat={destino.latitud}
              lng={destino.longitud}
              text={destino.nombre}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default MapWithSearch;