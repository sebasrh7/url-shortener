import logo from "../../assets/logo.svg";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hook/useAuth";
import Shortener from "../shortener/Shortener";
import AccountMenu from "../acountMenu/AcountMenu";

const Header = () => {
  const { login, isAuthenticated } = useAuth();
  return (
    <AppBar position="static">
      {isAuthenticated ? (
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginY: "4px",
            flexGrow: 1,
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar alt="Logo" src={logo} sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" >
              URL Shortener
            </Typography>
          </Box>

          <Shortener />

          <AccountMenu />

        </Toolbar>
      ) : (
        <Toolbar>
          <Avatar alt="Logo" src={logo} sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" onClick={login}>
            Login
          </Button>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
