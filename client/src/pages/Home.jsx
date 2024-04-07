import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Shortener from "../components/shortener/Shortener";
import UrlTable from "../components/table/TableUrl";
import { useAuth } from "../hook/useAuth";
import AutohideSnackbar from "../components/snackbar/Snackbar";
import { Box } from "@mui/material";
import {CardUrl} from "../components/card/CardUrl";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box className="min-h-screen flex flex-col">
      <Header />
      {isAuthenticated ? (
        <>
          <UrlTable />
          <AutohideSnackbar />
        </>
      ) : (
        <>
          <Hero />
          <Shortener />
          <CardUrl />
        </>
      )}
      <Footer />
    </Box>
  );
};

export default Home;
