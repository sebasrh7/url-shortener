import Snackbar from "@mui/material/Snackbar";
import { useAuth } from "../../hook/useAuth";

export default function AutohideSnackbar() {
  const { message, error, setMessage, setError } = useAuth();

  return (
    <div>
      <Snackbar
        open={message.length > 0 || error.length > 0}
        autoHideDuration={3000}
        onClose={() => {
          setMessage("");
          setError("");
        }}
        message={message || error}
      />
    </div>
  );
}
