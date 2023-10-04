import { useEffect, useState } from "react";
import { Box, Grid, Input, InputLabel } from "@mui/material";
import {
    useTheme,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import MkSwitch from "../../../app/assets/theme/MkSwitch";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import { useSelector } from "react-redux";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function AddUserInputs({
    inputValues = null,
    handleCheck,
    checked,
    setRoleID,
    currentEmail,
    currentPhone,
    nameChange,
    setNameChange,
    phone,
    setPhone,
    role,
    setRole,
}) {
    const theme = useTheme();
    const { user } = useSelector((state) => state.companyUser);
    const { roles } = useSelector((state) => state.companyUserRole);
    // const [role, setRole] = useState("");
    //get company user search by email
    const { userByEmail, userByPhone } = useSelector(
        (state) => state.companyUser
    );

    useEffect(() => {
        setNameChange(userByPhone?.user?.name ?? "");
        setPhone(userByPhone?.user?.phone ?? currentPhone);
    }, []);
    // const [nameChange, setNameChange] = useState(userByPhone?.user?.name ?? "");
    // const [phone, setPhone] = useState(
    //     userByPhone?.user?.phone ?? currentPhone
    // );

    return (
        <Box
            sx={{
                padding: "35px 0px",
                width: "800px",
                height: "200px",
            }}
        >
            <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 12 }}
            >
                <Grid item xs={12} md={6}>
                    <InputFormComponent
                        value={nameChange}
                        onChange={(e) =>
                            setNameChange(e.currentTarget.value)
                        }
                        label="Full Name"
                        name="name"
                        placeholder="Enter Your Full Name"
                        focus={true}
                        required
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputFormComponent
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.currentTarget.value);
                        }}
                        label="User Phone"
                        name="phone"
                        placeholder="Enter User Phone"
                        focus={true}
                        required
                        type="number"
                        onWheel={() => document.activeElement.blur()}
                        //readOnly
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputLabel
                        htmlFor={"role_id"}
                        sx={{ fontSize: "14.5px" }}
                    >
                        Select Authority Role
                    </InputLabel>
                    <MkAutoComplete
                        fullWidth={true}
                        options={roles}
                        placeholder="Select Authority Role"
                        sx={{ mb: "10px" }}
                        name="role_id"
                        onChange={(event, newValue) => {
                            setRole(newValue);
                            setRoleID(newValue?.id);
                        }}
                        value={role}
                        required
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default AddUserInputs;
