import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext.js';
import { useParams, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Marker = ({ text, destinationId, tripId, color }) => (
  <Link  to={`/trips/${tripId}/destinations/${destinationId}`} style={{ textDecoration: 'none' }}>
    <div style={{ color: 'black', textDecoration: 'none' }}>
      <FontAwesomeIcon icon={faMapPin} style={{ color: color, fontSize: '24px' }} />
      {text}
    </div>
  </Link>
);

function MapWithSearch( ) {
  const { authToken } = useAuth();
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [destinos, setDestinos] = useState([]); // Estado para los destinos
  const mapRef = useRef(null);
  const [nuevoDestino, setNuevoDestino] = useState({ nombre: '', fecha: '', latitud: null, longitud: null });
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [ubicacionEncontrada, setUbicacionEncontrada] = useState(null);
  const [ubicacionActual, setUbicacionActual] = useState(null);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (exito) {
      setTimeout(() => {
        setExito(false);
      }, 3000); // Ocultar el mensaje después de 3 segundos
    }
  }, [exito]);

  const agregarDestino = () => {
    // Extraer los datos del nuevo destino
    const { nombre, latitud, longitud, ubicacion, marker} = nuevoDestino;
    
    console.log(dia, mes, anio);
    // Enviar una solicitud para crear el destino
    console.log(tripId);
    const fecha = new Date(anio, mes - 1, dia);
    fetch(`http://localhost:3000/api/v1/trips/${tripId}/destinations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nombre,
        date: fecha,
        latitude: latitud,
        longitude: longitud,
        trip_id: tripId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Destino creado:', data);
        navigate(`/trips/${tripId}`);
        setExito(true);
      })
      .catch(error => {
        console.error('Error al crear el destino:', error);
      });
  };

  const searchLocation = () => {
    if (mapRef.current) {
      const geocoder = new window.google.maps.Geocoder();
  
      geocoder.geocode({ address: searchTerm }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          mapRef.current.panTo(location);
          setUbicacionEncontrada({ lat: location.lat(), lng: location.lng()});
  
          setNuevoDestino({
            ...nuevoDestino,
            latitud: location.lat(),
            longitud: location.lng(),
          });
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
            setNuevoDestino({
              ...nuevoDestino,
              latitud: userLocation.lat,
              longitud: userLocation.lng,
            });
            setUbicacionActual(userLocation);
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

  const handleDiaChange = (e) => {
    setDia(e.target.value);
  };
  
  const handleMesChange = (e) => {
    setMes(e.target.value);
  };
  
  const handleAnioChange = (e) => {
    setAnio(e.target.value);
  };
  
  const rellenarFechaActual = () => {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1; // El mes en JavaScript se cuenta desde 0
    const anioActual = fechaActual.getFullYear();
  
    setDia(diaActual.toString());
    setMes(mesActual.toString());
    setAnio(anioActual.toString());
  };
  
  

  return (
    <div style={{ marginTop: "83px", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#c8f6fd",
          padding: "5px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          zIndex: 2,
        }}
      >
        {exito && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#0ca789",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Destino guardado con éxito
        </div>
      )}
        <button style= {{backgroundColor: "#fe3333", color: "white", border: "2px  solid #fe3333", marginTop: "6px", borderRadius: "3px"}}>Cancel</button>
        <h2>Nuevo destino</h2>
        <button  style= {{backgroundColor: "#00d02a", color: "white", border: "2px  solid #00d02a", marginTop: "6px", borderRadius: "3px"}}onClick={agregarDestino}>Agregar</button>
      </div>

      <div style={{ height: "375px", width: "375px" }}>
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
              {ubicacionEncontrada && (
            <Marker
              lat={ubicacionEncontrada.lat}
              lng={ubicacionEncontrada.lng}
              text="Ubicación actual"
              color="#ff1414"
            />
          )}

        {ubicacionActual && (
            <Marker
              lat={ubicacionActual.lat}
              lng={ubicacionActual.lng}
              text="Ubicación Actual"
              color="#ff1414"
            />
          )}
      </GoogleMapReact>
      </div>
      <form style={{ margin: "10px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label style= {{fontWeight: "bold"}}>Nombre del destino:</label>
        <div style={{ display: "flex" }}></div>
        <input
          type="text"
          placeholder="Ingrese el nombre del destino"
          value={nuevoDestino.nombre}
          onChange={(e) => setNuevoDestino({ ...nuevoDestino, nombre: e.target.value })}
          style ={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
            width: "100%",
            marginTop: "4px"    
          }}
        />
      </div>

      <div style={{marginBottom: "10px" }}>
        <label style= {{fontWeight: "bold"}}>Ubicación:</label>
        <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Ingrese la ubicación"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style ={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
            width: "100%",
            marginTop: "4px"    
          }}
        />
      </div>
      <div>
        <button style= {{backgroundColor: "#0ca789", color: "white", border: "7px  solid #0ca789", marginTop: "6px", borderRadius: "3px"}}
        onClick={searchLocation}>Buscar ubicación</button>
        <button style= {{backgroundColor: "#0ca789", color: "white", border: "7px  solid #0ca789", borderRadius: "3px"}}
        onClick={locateUser}>Ubicación Actual</button> 
      </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style= {{fontWeight: "bold"}}>Fecha de llegada:</label>
        <div style={{ display: "flex", alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Día"
            value={dia}
            onChange={handleDiaChange}
            style={{ width: '40px', marginRight: '5px', borderRadius: '5px' }}
          />
          <input
            type="text"
            placeholder="Mes"
            value={mes}
            onChange={handleMesChange}
            style={{ width: '40px', marginRight: '5px', borderRadius: '5px' }}
          />
          <input
            type="text"
            placeholder="Año"
            value={anio}
            onChange={handleAnioChange}
            style={{ width: '40px', marginRight: '5px', borderRadius: '5px' }}
          />
          <button onClick={rellenarFechaActual} style= {{width: '100px', marginRight: '5px', borderRadius: '5px'}}>Usar Fecha Actual</button>
        </div>
      </div>
    </form>
    </div>
  );
}

export default MapWithSearch;