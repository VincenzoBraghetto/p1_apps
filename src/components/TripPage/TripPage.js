import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import { CircularProgress, Card, CardContent, CardMedia, Typography } from '@mui/material';
import './TripPage.css';
import MapPage from '../MapPage/MapPage.js';

const DestinationsList = ({ tripId }) => {
  const [destinations, setDestinations] = useState([]);
  const { authToken} = useAuth();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/trips/${tripId}/destinations`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }, 
    })
      .then(response => response.json())
      .then(data => setDestinations(data))
      .catch(error => console.error('Error al obtener destinos:', error));
  }, [tripId]);

  return (
    <div>
      <h2>Destinos Asociados al Viaje</h2>
      <ul>
        {destinations.map(destination => (
          <li key={destination.id}>
            <div>
              <h3>{destination.name}</h3>
              <p>Latitud: {destination.latitude}</p>
              <p>Longitud: {destination.longitude}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function TripPage() {
  const { authToken } = useAuth();
  console.log(authToken);
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Agregar estado para manejar errores

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/trips/${tripId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener el viaje');
        }
        return response.json();
      })
      .then((data) => {
        setTrip(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [tripId, authToken]);

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      {trip && (
        <Card className="my-card" sx={{ backgroundColor: '#CFD8DC' }} style={{ maxWidth: '400px' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {trip.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trip.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fecha de inicio: {trip.start_date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fecha de fin: {trip.end_date}
          </Typography>
        </CardContent>
        
        <div className="image-container">
          {/* Renderizar las imágenes del viaje */}
          {trip.images && trip.images.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              alt={trip.name}
              src={image.url}
              className="trip-image"
            />
          ))}
        </div>
      </Card>
      )}
    </div>
    <br />
    <MapPage tripId={tripId} />
    <DestinationsList tripId={tripId} />
    </div>
  );

}

export default TripPage;