import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";

const EditForm = ({ initialData, onSave, onCancel }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const { originalUrl } = initialData;

  setValue("originalUrl", originalUrl);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await onSave(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: 660, maxWidth: "100%" }}
      >
        <TextField
          label="Original URL"
          fullWidth
          variant="outlined"
          {...register("originalUrl", { required: "URL is required" })}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditForm;
