import { Container, Typography, Link } from "@mui/material";

const Footer = () => {

  return (
    <footer className=" py-3 mt-auto bg-slate-400">
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Tu Empresa
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Desarrollado con Material-UI
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link href="#">Política de Privacidad</Link> |{" "}
          <Link href="#">Términos y Condiciones</Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
