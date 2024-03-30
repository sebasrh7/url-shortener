import { UrlProvider } from "./context/UrlContext";
import Home from "./pages/Home";

function App() {
  return (
    <UrlProvider>
      <Home />
    </UrlProvider>
  );
}

export default App;
