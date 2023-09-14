import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const DestinationOnly = () => {
  const { trip_id, destination_id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer una solicitud al servidor para obtener los detalles del destino
    // utilizando los parámetros trip_id y destination_id
    // Por ejemplo, puedes usar fetch o axios para obtener los datos del backend

    // Ejemplo con fetch:
    fetch(`http://localhost:3000/api/v1/trips/${trip_id}/destinations/${destination_id}`)
      .then((response) => response.json())
      .then((data) => setDestination(data))
      .catch((error) => console.error('Error al obtener los detalles del destino:', error));
  }, [trip_id, destination_id]);

  // Verifica si aún se están cargando los datos del destino
  if (!destination) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Detalles del Destino</h2>
      <p>Nombre del Destino: {destination.name}</p>
      <p>País: {destination.country}</p>
      <p>Ciudad: {destination.city}</p>
      <p>Fecha de Llegada: {destination.date}</p>

      <Link to={`/trips/${trip_id}`}>Volver al Viaje</Link>
    </div>
  );
};

export default DestinationOnly;