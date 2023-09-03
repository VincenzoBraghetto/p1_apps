import React, { useState } from "react";
import './TopNav.css';
import { Avatar, Box, Button, Container, Menu, MenuItem, Typography } from "@mui/material";
import { Settings, Rectangle } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function TopNav(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Log out");
    localStorage.removeItem('token'); // Elimina el token de localStorage
    navigate('/login'); 
  };

  return (
    <Box className={"BoxNav"}>
      <Container sx={{ width: '100%', height: '85px', position: 'fixed', top: 0, left: 0 }}>
      <Link to="/" className="LogoLink">
        <img
          src="Travel log.png" 
          alt="Logo"
          className="LogoImage"
          width= "60px"
          height= "60px"
          style={{ marginTop: "12px" }}
        />
      </Link>
      <Typography variant="h4" style={{ textAlign: 'center', fontWeight: "bold",  fontFamily: "Roboto", top: "20px", left: "97px", position: "absolute" }}>Travel Log</Typography>
        <Button
          id="profile-button"
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ position: 'absolute', top: '18px', right: '7px' }}
        >
          <Settings fontSize="large" style={{ color: "#202020" }} />

        </Button>

        <Menu
          id="profile-menu"
          spacing={2}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'profile-button',
          }}
          PaperProps={{
            style: {
              backgroundColor: "#c8f6fd" 
            },
          }}

        >
          <MenuItem onClick={handleClose} style={{ color: "black", fontWeight: "bold" }}>Profile</MenuItem>
          <MenuItem onClick={handleClose} style={{ color: "black", fontWeight: "bold" }}>Settings</MenuItem>
          <MenuItem onClick={handleLogout} style={{ color: "black", fontWeight: "bold" }}>Logout</MenuItem>
        </Menu>

      </Container>
    </Box>
  );
}

export default TopNav;
