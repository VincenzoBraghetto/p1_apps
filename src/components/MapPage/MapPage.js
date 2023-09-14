import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext.js';
import { useParams, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapPage = ({ tripId }) => {
  const [markers, setMarkers] = useState([]);
  const { authToken } = useAuth();
  const navigate = useNavigate();
  
  const handleClick = (destinationId, tripId) => {
    navigate(`/trips/${tripId}/destinations/${destinationId}`);
  };

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
        bootstrapURLKeys={{ key: "AIzaSyAzZKv1qMj4zuF5Q0eM5vmZonlrTjm6eZ8" }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={1}
      >
        {markers.length > 0 && markers.map(marker => (
          <div 
            key={marker.id}
            lat={marker.lat}
            lng={marker.lon}
            style={{ color: 'black', textDecoration: 'none' }}
            onClick={() => handleClick(marker.destination_id, marker.trip_id)}
          >
            <FontAwesomeIcon icon={faMapPin} style={{ color: '#ff1414', fontSize: '24px' }} />
            {marker.name}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapPage;