import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';

function LoginPage() {
  const { setAuthToken, setUserId, setFirstName, setLastName } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      const headers = new Headers({
        'Authorization': `Basic ${btoa(`${formData.email}:${formData.password}`)}`, // Utiliza formData.email y formData.password
        'Content-Type': 'application/json',
      });
    
    
      const response = await fetch('http://localhost:3000/api/v1/api-keys', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const authToken = data.token;
      setToken(authToken);
      setAuthToken(authToken);
      setUserId(data.bearer_id);
      localStorage.setItem('token', authToken);
      console.log(data.bearer_id);
      fetch(`http://localhost:3000/api/v1/users/${formData.email}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          console.log(response);
          console.log(userData);
          console.log("asdasd");
          setFirstName(userData.first_name); // Asumiendo que el servidor envía el nombre del usuario
          setLastName(userData.last_name); // Asumiendo que el servidor envía el correo electrónico del usuario
        });
      fetch(`http://localhost:3000/api/v1/users/${data.bearer_id}/trips`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`, // Asegúrate de que estás utilizando el token correcto aquí
        },
      })
        .then((response2) => response2.json())
        .then((data2) => {
          // Procesar los datos de los viajes recibidos del servidor
          console.log(data2);
          navigate(`/trips`);
        });

      
    }; 
  
  return (
    <div style={{justifyContent: 'center', alignItems: 'center', minHeight: '50vh', marginLeft: "60px", marginTop: "150px"}}>
      <Typography variant="h4">Inicio de Sesión</Typography>
      <form onSubmit={handleSubmit} style={{ width: '80%', marginTop: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField style={{backgroundColor: 'white' }}
              type="email"
              label="Correo Electrónico"
              name="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField style={{backgroundColor: 'white' }}
              type="password"
              label="Contraseña"
              name="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '16px', backgroundColor: '#0ca789' }}>
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;