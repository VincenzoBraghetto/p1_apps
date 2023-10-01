//Create starter component
import React, {useEffect, useState} from 'react';
import { Box } from "@mui/material";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";
import { useLocation } from "react-router-dom";
import { useAuth } from '../AuthContext.js';

function FriendsPage() {
  const location = useLocation();
  console.log(location);
  console.log("petardo");
  const { authToken } = useAuth();
  const [qr, setQr] = useState(null); // Aquí definimos el estado qr

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log("holanda")

    const friendshipToken = queryParams.get('friendshipToken');
    // Realizar una solicitud al backend para obtener la imagen del QR
    fetch(`http://localhost:3000/api/v1/friendship_tokens/show`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(response => response.blob())
    .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setQr(imageUrl);
    })
    .catch(error => {
      console.error('Error al obtener el código QR:', error);
    });
  }, [location.search]);

  return (
  <div style={{ marginTop: '100px' }}>
      <img src={qr} alt="Código QR" />
  </div>
  );
}

export default FriendsPage;
