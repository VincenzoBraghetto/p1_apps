import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext.js';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapPage = ({ tripId }) => {
  const [markers, setMarkers] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/trips/${tripId}/markers`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => setMarkers(data))
      .catch(error => console.error('Error al obtener marcadores:', error));
  }, [tripId]);

  return (
    <div style={{ height: "600px", width: "375px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAzZKv1qMj4zuF5Q0eM5vmZonlrTjm6eZ8" }} // Reemplaza con tu clave de API de Google Maps
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={1}
      >
        {markers.length > 0 && markers.map(marker => (
          <AnyReactComponent
            key={marker.id}
            lat={marker.lat}
            lng={marker.lon}
            text={
              <div>
                <FontAwesomeIcon icon={faMapPin} style={{ color: '#ff1414', fontSize: '24px' }} />
                {marker.name}
              </div>
            }
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapPage;