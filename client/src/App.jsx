import { UrlProvider } from "./context/UrlContext";
import { AuthProvider } from "./context/AuthContext";
import { GuestProvider } from "./context/GuestContext";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <AuthProvider>
      <UrlProvider>
        <GuestProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Home />
          </ThemeProvider>
        </GuestProvider>
      </UrlProvider>
    </AuthProvider>
  );
}

export default App;
