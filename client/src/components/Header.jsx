import logo from "../assets/logo.svg";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";

const Header = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/login/success", {
        withCredentials: true, // This is the important part for the cookies to be sent with the request to the server for authentication purposes
      });

      setUser(response.data.user);

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const login = () => {
    window.open(`${import.meta.env.VITE_API_URL}/login`, "_self");
  };

  const logout = () => {
    window.open(`${import.meta.env.VITE_API_URL}/logout`, "_self");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar alt="Logo" src={logo} sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener {
              user && ` - Welcome, ${user.displayName}!`
            
            }
          </Typography>

          {
            user ? (
              <Button color="inherit" onClick={logout}>Logout</Button>
            ) : (
              <Button color="inherit" onClick={login}>Login</Button>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
