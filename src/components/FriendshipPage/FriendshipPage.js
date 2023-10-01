import GoogleMapReact from "google-map-react";
import { useParams } from "react-router-dom";
import { useAuth } from '../AuthContext.js';

function Friendship() {
  let { friendshipToken } = useParams();
  const { authToken, userId } = useAuth();
  console.log(friendshipToken);
  console.log(userId);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };
        console.log(userLocation);

        // Hacer una solicitud al backend
        fetch(`http://localhost:3000/api/v1/friendship_tokens`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify({
            friendshipToken: friendshipToken,
            latitude: latitude,
            longitude: longitude,
            user_id: userId,
            friend_id: null
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del backend:', data);
        })
        .catch(error => {
          console.error('Error al enviar datos al backend:', error);
        });
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  }
}

export default Friendship;