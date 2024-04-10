import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Shortener from "../components/shortener/Shortener";
import UrlTable from "../components/table/TableUrl";
import { useAuth } from "../hook/useAuth";
import AutohideSnackbar from "../components/snackbar/Snackbar";
import { Box, Typography } from "@mui/material";
import { SwitchAutoCopyGuest } from "../components/switch/SwitchAutoCopy";
import { CardUrl } from "../components/card/CardUrl";
import EnhancedTable from "../components/table/EnhancedTable";

function createData(id, name, calories, fat, carbs, protein, date) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
    date,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3, new Date("2024-04-07T22:40:20.328Z").toLocaleDateString() ),
  createData(2, "Donut", 452, 25.0, 51, 4.9, new Date("2022-03-07T22:40:20.328Z").toLocaleDateString() ),
  createData(3, "Eclair", 262, 16.0, 24, 6.0, new Date("2021-06-07T22:40:20.328Z").toLocaleDateString() ),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0, new Date("2021-04-07T22:40:20.328Z").toLocaleDateString() ),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9, new Date("2022-05-07T22:40:20.328Z").toLocaleDateString() ),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5, new Date("2024-03-07T22:40:20.328Z").toLocaleDateString() ),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3, new Date("2023-04-07T22:40:20.328Z").toLocaleDateString() ),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0, new Date("2022-07-07T22:40:20.328Z").toLocaleDateString() ),
  createData(9, "KitKat", 518, 26.0, 65, 7.0, new Date("2021-08-07T22:40:20.328Z").toLocaleDateString() ),
];

const headCells = [
  {
    id: "name",
    numeric: false,
    type: "text",
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: true,
    type: "number",
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    type: "number",
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    type: "number",
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: true,
    type: "number",
    disablePadding: false,
    label: "Protein (g)",
  },
  {
    id: "date",
    numeric: false,
    type: "date",
    disablePadding: false,
    label: "Date",
  },
];
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

          <Box className="mb-8 flex flex-col items-center justify-center space-y-4">
            <SwitchAutoCopyGuest />

            <Typography variant="caption" className="text-xs">
              You can create <span className="font-bold text-red-500">06</span>{" "}
              URLs. Log in to create more and access all features.
            </Typography>
          </Box>

          {/* <CardUrl /> */}
          <EnhancedTable rowss={rows} headCells={headCells} />
        </>
      )}
      <Footer />
    </Box>
  );
};

export default Home;
