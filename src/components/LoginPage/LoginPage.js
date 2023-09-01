import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Container, Grid } from '@mui/material';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/v1/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        // Guardar el token en localStorage o en un estado global.
        // Redirigir al usuario a la página de inicio, por ejemplo.
      } else {
        // Manejar errores de autenticación aquí.
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };
  return (
    <div style={{justifyContent: 'center', alignItems: 'center', minHeight: '100vh', marginLeft: "60px", marginTop: "150px"}}>
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