import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import Delete from "@mui/icons-material/Delete";
import { DarkMode } from "@mui/icons-material";
import { LightMode } from "@mui/icons-material";
import { useAuth } from "../../hook/useAuth";
import { useState } from "react";

export default function AccountMenu() {
  const { user, logout, deleteProfile } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [theme, setTheme] = useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    const accountInfo = document.getElementById("account-info");

    // si el usuario hace clic en el menú de la cuenta, no se cierra
    if (accountInfo.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
  };

  const handleTheme = () => {
    setTheme(!theme);
    localStorage.setItem("theme", !theme);
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          sx={{ width: 40, height: 40 }}
          alt={user.displayName}
          src={user.picture}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}

        onClick={handleClose}

        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem id="account-info" >
          <Avatar
            alt={user.displayName}
            src={user.picture}
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          {user.displayName}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleTheme}>
          <ListItemIcon>
            {theme ? (
              <DarkMode fontSize="small" />
            ) : (
              <LightMode fontSize="small" />
            )}
          </ListItemIcon>
          Change Theme Mode
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={deleteProfile}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete Account
        </MenuItem>
      </Menu>
    </>
  );
}
