import { useEffect, useState } from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import MkButton from "../../app/assets/theme/MkButton";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../features/company/CompanyApi";
import { localStorageHandler } from "../../features/login/LoginSlice";
import { imageApi } from "../../app/hooks";
import { editAdmin, passwordReset } from "../../features/company/CompanyApi";
import { removeMessage } from "../../features/company/CompanySlice";
import { removeToken } from "../../features/logout/LogoutApi";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function ProfilePasswrodInputs() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.loginInfo);
    const { message } = useSelector((state) => state.companyUser);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUpdate = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        dispatch(passwordReset({ id: user.id, data: formData }));
        setCurrentPassword("");
        setConfirmPassword("");
        setNewPassword("");
    };

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                dispatch(removeMessage());
            }, 5000);
        }
        if (message?.success) {
            setTimeout(() => {
                dispatch(removeToken(token));
            }, 2000);
        }
    }, [message]);

    return (
        <Box onSubmit={handleUpdate} component="form">
            <Box component={Paper} sx={{ padding: "25px", mt: 5 }}>
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                >
                    User Reset Password
                </Stack>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 12 }}
                    sx={{ marginTop: "25px" }}
                >
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                marginBottom: "10px",
                                display: message ? "" : "none",
                            }}
                        >
                            <Alert
                                variant="filled"
                                severity={message?.error ? "error" : "success"}
                            >
                                {message?.message}
                            </Alert>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                        <InputFormComponent
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(e.currentTarget.value)
                            }
                            type="password"
                            label="Current Password"
                            name="current_password"
                            placeholder="Enter Your Current Password"
                            required
                            focus={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                        <InputFormComponent
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.currentTarget.value)
                            }
                            type="password"
                            label="New Password"
                            name="new_password"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputFormComponent
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.currentTarget.value)
                            }
                            type="password"
                            label="Confirm Password"
                            name="confirm_password"
                            placeholder="Enter Your Confirm Password"
                            required
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "15px",
                        }}
                    >
                        <MkButton
                            mkcolor={`linear-gradient(310deg, ${theme.palette.gradientDark.main}, ${theme.palette.gradientDark.light})`}
                            size="lg"
                            // onClick={companyEdit}
                            type="submit"
                        >
                            Reset
                        </MkButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ProfilePasswrodInputs;
