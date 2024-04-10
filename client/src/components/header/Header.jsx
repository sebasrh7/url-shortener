import logo from "../../assets/logo.svg";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { useAuth } from "../../hook/useAuth";
import Shortener from "../shortener/Shortener";
import AccountMenu from "../acountMenu/AcountMenu";
import {SwitchAutoCopy} from "../switch/SwitchAutoCopy";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Header = () => {
  const { login, isAuthenticated } = useAuth();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      {isAuthenticated ? (
        <Toolbar style={{ padding: "2rem 0" }}>
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box display="flex" alignItems="center">
                <Avatar alt="Logo" src={logo} sx={{ mr: 2 }} />
                <Typography variant="h6" component="div">
                  URL Shortener
                </Typography>
              </Box>

              <Shortener />
              <AccountMenu />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <SwitchAutoCopy />
            </Box>
          </Container>
        </Toolbar>
      ) : (
        <Toolbar style={{ padding: "2rem 0" }}>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar alt="Logo" src={logo} sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              URL Shortener
            </Typography>
            <Button variant="outlined" color="primary" onClick={login}>
              Login
            </Button>
          </Container>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
