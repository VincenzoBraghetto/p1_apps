import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import { CircularProgress, Card, CardContent, CardMedia, Typography } from '@mui/material';
import './TripPage.css';

function TripPage() {
  const { authToken } = useAuth();
  console.log(authToken);
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/trips/${tripId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrip(data);
        setLoading(false);
      });
  }, [tripId, authToken]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      {trip && (
        <Card style={{ maxWidth: '400px' }}>
          {/* Renderizar la imagen del viaje */}
          <CardMedia
            component="img"
            alt={trip.name}
            height="auto"
            src={trip.image_url} // Asegúrate de tener la URL de la imagen en tus datos de viaje
          />

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
        </Card>
      )}
    </div>
  );
}

export default TripPage;
