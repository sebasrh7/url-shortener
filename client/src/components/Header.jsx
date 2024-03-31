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
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      console.log("getUser");
      const response = axios.get(`${import.meta.env.VITE_API_URL}/login/success`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("data", data.user);
      setUser(data.user);
    };

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
            URL Shortener {user ? `(${user.displayName})` : ""}
          </Typography>
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={user.displayName}
                src={user.picture}
                sx={{ mr: 1 }}
              />
              <Typography sx={{ mr: 1 }}>{user.displayName}</Typography>
              <Button variant="contained" onClick={logout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button variant="contained" onClick={login}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
