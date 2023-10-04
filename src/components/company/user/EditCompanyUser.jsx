import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Box,
    Input,
    Stack,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Avatar,
    IconButton,
    useTheme,
    Typography,
    Grid,
    InputLabel,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import {
    editCompanyUserDetail,
    editPublisherUserDetail,
} from "../../../features/company/CompanyApi";
import MkButton from "../../../app/assets/theme/MkButton";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import MkSwitch from "../../../app/assets/theme/MkSwitch";
import { companyUserDetailActions } from "../../../features/company/CompanySlice";
import { imageApi } from "../../../app/hooks";
import DefaultImage from "../../../app/assets/images/nineP.png";
import EditIcon from "@mui/icons-material/Edit";
import AlertBox from "../../../app/components/AlertBox/AlertBox";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

export default function EditCompanyUser({ item, roles, userRole }) {
    const { changeUserInfo } = companyUserDetailActions;
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(
        (state) => state.companyUserInfo
    );
    const { companyDetail } = useSelector(
        (state) => state.companyDetail
    );
    const { publisher } = useSelector((state) => state.loginInfo);
    const [check, setCheck] = useState(
        userInfo.status == 1 ? true : false
    );
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [companyId, setCompanyId] = useState(null);
    const [role, setRole] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [imageChange, setImageChange] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    //alertState
    const [alertState, setAlertState] = useState();
    const [success, setSuccess] = useState(false);
    const { usersList } = useSelector((state) => state.companyUser);

    const handleCheck = (e) => {
        setCheck(e.target.checked);
    };

    useEffect(() => {
        console.log(item);
        setCheck(userInfo.active == 1 ? true : false);
        setCompanyId(publisher[0]._id);
        setName(userInfo.name);
        setPhone(userInfo.phone);
        setRole(userRole);
        setImageData(
            userInfo.profile
                ? `${imageApi}/${userInfo.profile}`
                : DefaultImage
        );
    }, [userInfo, publisher, userRole]);

    const handleClickOpen = () => {
        dispatch(changeUserInfo(item));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImageChange(false);
        setPhone(userInfo.phone);
    };

    const imageInputChange = (e) => {
        const [file] = e.target.files;
        if (file) {
            setImageChange(true);
            setImageData(URL.createObjectURL(file));
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();

        console.log("Handle Add Click");
        const phoneNumber = phone;
        const userInfoRole = userInfo?.authorities?.find(
            (auth) => auth.publisher_id === publisher[0]._id
        );
        console.log(role);
        console.log(userInfoRole);
        const editData = {
            name: name,
            phone: phone,
            profile: imageFile ? imageFile : "",
            role: {
                _id: role?.id ?? userInfoRole.role._id,
                description: role.label,
            },
            publisher_id: publisher[0]._id,
        };
        console.log({ editData });
        // return;
        const exit = usersList.filter(
            (user) => user.phone != item?.phone
        );

        const exitPhone = exit.find(
            ({ phone }) => phone === phoneNumber
        );

        console.log({ exitPhone });

        if (
            phone.length >= 9 &&
            phone.length < 12 &&
            phone.length != 10 &&
            !exitPhone
        ) {
            console.log("Here");
            dispatch(
                editCompanyUserDetail({
                    id: userInfo._id,
                    data: editData,
                })
            )
                .unwrap()
                .then((result) => {
                    console.log(result);
                    if (result.errors) {
                        setAlertState({
                            open: true,
                            vertical: "top",
                            horizontal: "right",
                            variant: "error",
                            message: "Your phone number already exit",
                        });
                        setSuccess(false);
                        return;
                    }
                    handleClose();
                });
        } else {
            setAlertState({
                open: true,
                vertical: "top",
                horizontal: "right",
                variant: "error",
                message: exitPhone
                    ? "Your phone number already exit"
                    : "Phone Number must be between  9 and 11!",
            });
            setSuccess(false);
        }
    };

    return (
        <>
            <EditIcon
                onClick={handleClickOpen}
                fontSize="small"
                sx={{ cursor: "pointer", color: "#2152ff" }}
            />

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                component="form"
                onSubmit={handleAdd}
            >
                <Box sx={{ padding: "0px 50px 50px 50px", mt: 5 }}>
                    <Box>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h4" mb={3}>
                                Edit Publisher User Info
                            </Typography>
                            <Box>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        // accept="image/*"
                                        inputProps={{
                                            accept: "image/*",
                                        }}
                                        id="contained-button-file"
                                        type="file"
                                        name="profile"
                                        sx={{
                                            display: "none",
                                        }}
                                        onChange={imageInputChange}
                                    />
                                    <Avatar
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            cursor: "pointer",
                                        }}
                                        variant="rounded"
                                        src={imageData}
                                    />
                                </label>
                            </Box>
                        </Stack>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{
                                xs: 1,
                                sm: 2,
                                md: 22,
                            }}
                        >
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.currentTarget.value)
                                    }
                                    label="Name"
                                    name="name"
                                    placeholder="Enter Publisher Username"
                                    focus={true}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    type="number"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(
                                            e.currentTarget.value
                                        )
                                    }
                                    label="Phone"
                                    name="phone"
                                    placeholder="Enter Publisher User Phone"
                                    required
                                    onWheel={() =>
                                        document.activeElement.blur()
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    htmlFor="auto-complete"
                                    sx={{
                                        mb: 1,
                                        fontSize: "1rem",
                                    }}
                                >
                                    Role
                                </InputLabel>

                                <MkAutoComplete
                                    cursor="pointer"
                                    fullWidth={true}
                                    options={roles}
                                    placeholder="Your Role"
                                    id="auto-complete"
                                    getOptionLabel={(options) =>
                                        options?.label ?? ""
                                    }
                                    onChange={(e, newValue) =>
                                        setRole(newValue)
                                    }
                                    isOptionEqualToValue={(
                                        option,
                                        role
                                    ) => {
                                        return (
                                            option.label ===
                                            role.label
                                        );
                                    }}
                                    value={role}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <DialogActions sx={{ padding: "15px 35px" }}>
                    <MkButton
                        variant="outlined"
                        mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                        onClick={handleClose}
                    >
                        Cancel
                    </MkButton>
                    <MkButton
                        mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                        type="submit"
                    >
                        Update
                    </MkButton>
                </DialogActions>
            </Dialog>
            <AlertBox alertState={alertState} />
        </>
    );
}
