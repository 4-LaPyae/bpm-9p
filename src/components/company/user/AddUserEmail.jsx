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

function AddUserEmail({ inputValues = null, setCurrentEmail }) {
    const theme = useTheme();
    const [emailChange, setEmailChange] = useState(inputValues?.email ?? "");
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
                    value={emailChange}
                    onChange={(e) => {
                        setEmailChange(e.currentTarget.value);
                        setCurrentEmail(e.currentTarget.value);
                    }}
                    label="User Email"
                    name="email"
                    placeholder="Enter Your User Email"
                    focus={true}
                    required
                    type="email"
                />
            </Stack>
        </Box>
    );
}

export default AddUserEmail;
