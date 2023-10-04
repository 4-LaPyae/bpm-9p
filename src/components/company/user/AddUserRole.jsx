import { useState } from "react";
import { Box, Grid, Input, InputLabel, Stack } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import MkSwitch from "../../../app/assets/theme/MkSwitch";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import { useSelector } from "react-redux";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function AddUserRole({ inputValues = null, handleCheck, checked, setRoleID }) {
    const theme = useTheme();
    const [role, setRole] = useState("");
    const { roles } = useSelector((state) => state.companyUserRole);

    return (
        <Box sx={{ padding: "35px", width: "800px", height: "400px" }}>
            <Stack
                direction="column"
                justifyContent="center"
                sx={{ width: "50%", margin: "10% auto" }}
            >
                <InputLabel sx={{ mb: "5px" }}>Authority Role</InputLabel>
                <MkAutoComplete
                    options={roles}
                    placeholder="Select Authority Role"
                    sx={{ mb: "10px" }}
                    name="role_id"
                    onChange={(event, newValue) => {
                        setRole(newValue);
                        setRoleID(newValue.id);
                    }}
                    value={role}
                />
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        label="Active"
                        name="active"
                        checked={checked}
                        onChange={handleCheck}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </ThemeProvider>
            </Stack>
            {/* <Grid
                container
                rowSpacing={5}
                columnSpacing={{ xs: 1, sm: 2, md: 12 }}
                justifyContent="center"
            >
                <Grid item xs={12} md={8}></Grid>
                <Grid item xs={12} md={8}></Grid>
                <Grid item xs={12} md={8}>
                    <InputFormComponent
                        value={nameChange}
                        onChange={(e) => setNameChange(e.currentTarget.value)}
                        label="Authority Role"
                        name="authority_role_id"
                        placeholder="Enter Your User Authority Role"
                        required
                    />
                </Grid>

                <Grid item xs={12} md={8} sx={{ alignSelf: "center" }}>
                    <ThemeProvider theme={labelTheme}>
                        <MkSwitch
                            switchColor={theme.palette.info.main}
                            label="Active"
                            checked={checked}
                            onChange={handleCheck}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </ThemeProvider>
                </Grid>
            </Grid> */}
        </Box>
    );
}

export default AddUserRole;
