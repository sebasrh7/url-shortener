import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box sx={{ marginTop: 20 }} textAlign="center">
      <Typography variant="h2" gutterBottom>
        Shorten Your Loooong Urls :D
      </Typography>
      <Typography variant="body1" color="textSecondary" width={634} mx="auto">
        URL Shortener is an efficient and easy-to-use URL shortening service
        that streamlines your online experience.
      </Typography>
    </Box>
  );
};

export default Hero;
