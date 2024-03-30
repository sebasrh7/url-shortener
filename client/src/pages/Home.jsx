import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Shortener from "../components/Shortener";
import UrlTable from "../components/table/TableUrl";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Shortener />
      <UrlTable />
      <Footer />
    </>
  );
};

export default Home;
