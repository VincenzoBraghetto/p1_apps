import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';


function TripsPage() {
  const { authToken, userId } = useAuth();
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí puedes realizar una solicitud al servidor para obtener los viajes del usuario.
    // Puedes usar fetch, axios u otra biblioteca para realizar la solicitud.

    // Supongamos que recibes una respuesta de la API en formato JSON con los viajes del usuario.
    // Reemplaza esta parte con la lógica de solicitud real.

    console.log(userId);
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
    <div>
      <h1>Viajes de {userId}</h1>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <h2>{trip.name}</h2>
            <p>{trip.description}</p>
            <p>Fecha de inicio: {trip.startDate}</p>
            <p>Fecha de fin: {trip.endDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripsPage;