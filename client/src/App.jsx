import { UrlProvider } from "./context/UrlContext";
import { AuthProvider } from "./context/AuthContext";
import { GuestProvider } from "./context/GuestContext";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <UrlProvider>
        <GuestProvider>
          <Home />
        </GuestProvider>
      </UrlProvider>
    </AuthProvider>
  );
}

export default App;
