import { Box, Grid, InputLabel, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import AddUserInputs from "./AddUserInputs";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import MkSwitch from "../../../app/assets/theme/MkSwitch";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete/index";
import MkButton from "../../../app/assets/theme/MkButton/index";
import { editCompanyUserDetail } from "../../../features/company/CompanyApi";
import { getUserRole } from "../../../app/helper/getUserRole";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function CompanyUserInfo() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.companyUserInfo);
    const { companyDetail } = useSelector((state) => state.companyDetail);
    const [check, setCheck] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [companyId, setCompanyId] = useState(null);
    const { roles } = useSelector((state) => state.companyUserRole);
    const [role, setRole] = useState(getUserRole(userInfo.role_id, roles)[0]);

    const handleCheck = (e) => {
        setCheck(e.target.checked);
    };

    useEffect(() => {
        setCheck(userInfo.active ? true : false);
        setCompanyId(companyDetail.id);
        setFirstName(userInfo.first_name);
        setLastName(userInfo.last_name);
        setEmail(userInfo.email);
    }, [userInfo, companyDetail]);

    const submitForm = (e) => {
        e.preventDefault();
        console.log("rn");
        const dataForm = new FormData(e.currentTarget);
        dataForm.append("active", check == true ? Number(1) : Number(0));
        dataForm.append("authority_role_id", role?.id ?? userInfo.role_id);
        dataForm.append("authority_company_id", companyId);
        dispatch(editCompanyUserDetail({ id: userInfo.id, data: dataForm }));
    };

    return (
        <>
            <Box component={Paper} sx={{ padding: " 50px", mt: 5 }}>
                <Box component="form" onSubmit={submitForm}>
                    <Typography variant="h4" mb={3}>
                        Company User Info
                    </Typography>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 22 }}
                    >
                        <Grid item xs={12} md={6}>
                            <InputFormComponent
                                value={firstName}
                                onChange={(e) =>
                                    setFirstName(e.currentTarget.value)
                                }
                                label="First Name"
                                name="first_name"
                                placeholder="Enter Your User First Name"
                                focus={true}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputFormComponent
                                value={lastName}
                                onChange={(e) =>
                                    setLastName(e.currentTarget.value)
                                }
                                label="Last Name"
                                name="last_name"
                                placeholder="Enter Your User Last Name"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputFormComponent
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.currentTarget.value)
                                }
                                label="Email "
                                name="email"
                                placeholder="Enter Your User Email "
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputLabel
                                htmlFor="auto-complete"
                                sx={{ mb: 1, fontSize: "1rem" }}
                            >
                                Role
                            </InputLabel>

                            <MkAutoComplete
                                fullWidth={true}
                                options={roles}
                                placeholder="Your Role"
                                id="auto-complete"
                                getOptionLabel={(options) =>
                                    options?.label ?? ""
                                }
                                onChange={(e, newValue) => setRole(newValue)}
                                isOptionEqualToValue={(option, role) => {
                                    return option.label === role.label;
                                }}
                                value={role}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ alignSelf: "center" }}>
                            <ThemeProvider theme={labelTheme}>
                                <MkSwitch
                                    switchColor={theme.palette.info.main}
                                    label="Active"
                                    checked={check}
                                    onChange={handleCheck}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            </ThemeProvider>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <MkButton
                            mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                            type="submit"
                        >
                            Update
                        </MkButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default CompanyUserInfo;
