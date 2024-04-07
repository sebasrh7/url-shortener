import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      textAlign="center"
      className="flex flex-col items-center px-6 lg:pt-16 md:pt-12 pt-8"
      component={"section"}
    >
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
