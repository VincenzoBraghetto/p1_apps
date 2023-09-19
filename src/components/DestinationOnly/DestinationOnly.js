import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const DestinationOnly = () => {
  const { tripId, destinationId } = useParams();
  console.log(tripId, destinationId)
  const [destination, setDestination] = useState(null);
  useEffect(() => {
    // Aquí puedes hacer una solicitud al servidor para obtener los detalles del destino
    // utilizando los parámetros trip_id y destination_id
    // Por ejemplo, puedes usar fetch o axios para obtener los datos del backend

    // Ejemplo con fetch:
    fetch(`http://localhost:3000/api/v1/trips/${tripId}/destinations/${destinationId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDestination(data)})
      .catch((error) => console.error('Error al obtener los detalles del destino:', error));
  }, [tripId, destinationId]);


  // Verifica si aún se están cargando los datos del destino
  if (!destination) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{marginTop: "83px"}}>
      <h2>Detalles del Destino</h2>
      <p><strong>Nombre del Destino:</strong> {destination.name}</p>
      <p><strong>País:</strong> {destination.country}</p>
      <p><strong>Ciudad:</strong> {destination.city}</p>
      <p><strong>Fecha de Llegada:</strong> {destination.date}</p>

      <Link to={`/trips/${tripId}`} style={linkStyle}>Volver al Viaje</Link>
    </div>
  );
};
const linkStyle = {
  textDecoration: 'none',
  color: 'blue',
  fontSize: '16px',
  marginTop: '10px',
  display: 'block',
};


export default DestinationOnly;