import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import "./TripsPage.css";
import { Card, CardContent, CardMedia, Skeleton, Typography, Button  } from '@mui/material';
import { Link } from 'react-router-dom';


function TripsPage() {
  const { authToken, userId } = useAuth();
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí puedes realizar una solicitud al servidor para obtener los viajes del usuario.
    // Puedes usar fetch, axios u otra biblioteca para realizar la solicitud.

    // Supongamos que recibes una respuesta de la API en formato JSON con los viajes del usuario.
    // Reemplaza esta parte con la lógica de solicitud real.

    fetch(`http://localhost:3000/api/v1/users/${userId}/trips`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`, // Asegúrate de que estás utilizando el token correcto aquí
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // data debería contener la lista de viajes del usuario.
        setTrips(data);
      })
  }, [userId, navigate]);

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', marginLeft: "60px", marginTop: "100px" }}>
      <h1>Viajes de {userId}</h1>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id} className="trip-card">
            <Card sx={{
              backgroundColor: '#CFD8DCff', // Color de fondo de la tarjeta
              }}>
              {/* Simulamos una imagen de viaje con un esqueleto */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{
                  backgroundColor: '#B2DFDBff', // Color de fondo del esqueleto
                }}
              />

              <CardContent>
                <Typography variant="h5" component="div">
                  {trip.name}
                </Typography>
                <hr />
                <Typography variant="body2" color="text.secondary">
                  {trip.description}
                </Typography>
                <hr />
                <Typography variant="body2" color="text.secondary">
                  Fecha de inicio: {trip.start_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha de fin: {trip.end_date}
                </Typography>
                {/* Agrega el botón para ver el viaje en detalle */}
                <Link to={`/trips/${trip.id}`}>
                  <Button variant="contained" color="success">
                    Detalles
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripsPage;
