import { useGuest } from "../../hook/useGuest";
import { useUrl } from "../../hook/useUrl";
import { Switch, Typography, Box } from "@mui/material";

export const SwitchAutoCopyGuest = () => {

    const { checked, setChecked } = useGuest();
  const handleChange = (event) => {
    setChecked(event.target.checked);
    localStorage.setItem("checked", event.target.checked);
  };

  return (
    <Box className="flex items-center">
      <Switch checked={checked} onChange={handleChange} color="primary" />
      <Typography variant="caption">Auto copy to clipboard</Typography>
    </Box>
  );
};

export const SwitchAutoCopy = () => {
    const { checked, setChecked } = useUrl();

  const handleChange = (event) => {
    setChecked(event.target.checked);
    localStorage.setItem("checked", event.target.checked);
  };

  return (
    <Box className="flex items-center">
      <Switch checked={checked} onChange={handleChange} color="primary" />
      <Typography variant="caption">Auto copy to clipboard</Typography>
    </Box>
  );
};

