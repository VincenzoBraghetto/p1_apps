//Create starter component
import React from 'react';
import { Box } from "@mui/material";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";
import { useLocation } from "react-router-dom";
import { useAuth } from '../AuthContext.js';

function FriendshipTokenHandler() {
    const location = useLocation();
    const { authToken } = useAuth();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const friendshipToken = queryParams.get('friendshipToken');
        
        if (friendshipToken) {
            // Enviar el token al backend para crear relación de amistad
            fetch(`http://localhost:3000/friendship_tokens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ friendshipToken }),
            })
            .then(response => response.json())
            .then(data => {
                // Manejar la respuesta del backend si es necesario
            })
            .catch(error => {
                console.error('Error al enviar token al backend:', error);
            });
        }
    }, [location.search]);
}

function FriendsPage(props) {
    return (
        <Box>
            < SpinnerOfDoom color={'secondary.main'} />
        </Box>
    );
}

export default FriendsPage;