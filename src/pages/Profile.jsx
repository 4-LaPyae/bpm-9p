import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import MkButton from "../app/assets/theme/MkButton";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import ProfileLinkTab from "../components/profile/ProfileLinkTab";
import ProfileTabView from "../components/profile/ProfileTabView";
import { imageApi } from "../app/hooks";

export default function Profile() {
    const theme = useTheme();
    const { user } = useSelector((state) => state.loginInfo);
    // const {usersList} = useSelector((state) => state.companyUser);
    // const user = usersList.find((us) => us.id === loginUser.user.id);

    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box>
            <Box sx={{ padding: "25px 25px 0px 25px" }} component={Paper}>
                <Box>
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack direction='row' spacing={3} alignItems='center'>
                            <Avatar
                                sx={{
                                    borderRadius: 2.5,
                                    width: 74,
                                    height: 74,
                                    objectFit: "cover",
                                }}
                                // component="img"
                                src={`${imageApi}/${user?.profile}`}
                                alt='profile'
                            >
                                {user?.name}
                            </Avatar>
                            <Box>
                                <Typography
                                    component='div'
                                    variant='h3'
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {user?.name}
                                </Typography>
                                <Stack spacing={3} direction='row'>
                                    <Typography variant='body2' component='div'>
                                        {user?.phone}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction='row' spacing={2} alignItems='center'>
                            {/* <MkButton
                                mkcolor={`linear-gradient(310deg, ${theme.palette.gradientSuccess.main}, ${theme.palette.gradientSuccess.light})`}
                                size="small"
                            >
                                Enable
                            </MkButton> */}
                            {/* <MkButton
                                mkcolor={`linear-gradient(310deg, ${theme.palette.gradientDark.main}, ${theme.palette.gradientDark.light})`}
                                size="small"
                                // onClick={companyEdit}
                            >
                                Edit
                            </MkButton> */}
                        </Stack>
                    </Stack>
                </Box>
                <ProfileLinkTab tabIndex={tabIndex} setTabIndex={setTabIndex} />
            </Box>
            <Box>
                <ProfileTabView tabIndex={tabIndex} setTabIndex={setTabIndex} />
            </Box>
        </Box>
    );
}
