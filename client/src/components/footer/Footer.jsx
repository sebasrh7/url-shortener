import { Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <footer className="py-4 mt-8">
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="textSecondary">
          <Link
            href="https://material-ui.com/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            Made with Material-UI
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Link
            href="https://github.com/sebasrh7/url-shortener"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            Source Code
          </Link>{" "}
          by{" "}
          <Link
            href="https://github.com/sebasrh7"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            @sebasrh7
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
