import React from "react";
import { Link } from 'react-router-dom';
import GoogleMapReact from "google-map-react";
import { Button } from "@mui/material";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function MapPage(props) {
  const mapOptions = {
    center: { lat: -34.397, lng: 150.644 }, // Ubicación por defecto
    zoom: 8, // Nivel de zoom por defecto
  };

  return (
    <div className="map-container" style={{ height: "70%", width: "100%", marginTop: "85px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GAPI_KEY,
          libraries: ["geometry", "drawing", "places"], // Agrega las bibliotecas necesarias
        }}
        defaultCenter={mapOptions.center}
        defaultZoom={mapOptions.zoom}
      >
        {props.isMarkerShown && (
          <AnyReactComponent
            lat={mapOptions.center.lat}
            lng={mapOptions.center.lng}
            text="Mi Marcador"
          />
        )}
      </GoogleMapReact>

      <div className="button-container">
        <Link to={`/destination`}>
          <Button variant="contained" color="success">
            Destination
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MapPage;
