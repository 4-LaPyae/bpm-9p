import { useState } from "react";
import { Box, Grid, Input, InputLabel, Stack } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";

const labelTheme = createTheme({
  components: {
    MuiFormControlLabel: {
      label: {
        fontSize: "14px",
      },
    },
  },
});

function AddUserPhone({ inputValues = null, setCurrentPhone }) {
  const theme = useTheme();

  const [phoneChange, setPhoneChange] = useState(inputValues?.phone ?? "");

  return (
    <Box
      sx={{
        padding: "35px",
        width: "800px",
        height: "400px",
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        sx={{ width: "50%", margin: "10% auto" }}
      >
        <InputFormComponent
          value={phoneChange}
          onChange={(e) => {
            setPhoneChange(e.currentTarget.value);
            setCurrentPhone(e.currentTarget.value);
          }}
          label="User Phone"
          name="phone"
          placeholder="09XXXXXXXXXXX"
          focus={true}
          required
          type="number"
          onWheel={() => document.activeElement.blur()}
        />
      </Stack>
    </Box>
  );
}

export default AddUserPhone;
