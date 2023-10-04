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
    CircularProgress,
    IconButton,
} from "@mui/material";
import {
    addCompanyUser,
    addPublisherUser,
    getPublisherUserByEmail,
    getPublisherUserByPhone,
} from "../../../features/company/CompanyApi";
import { Add, Close, TramRounded } from "@mui/icons-material";
import AddUserInputs from "./AddUserInputs";
import AddUserEmail from "./AddUserEmail";
import AddUserRole from "./AddUserRole";
import {
    removeUserByEmail,
    removeUserByPhone,
} from "../../../features/company/CompanySlice";
import AlertBox from "../../../app/components/AlertBox/AlertBox";
import AddUserPhone from "./AddUserPhone";
import DefaultImage from "../../../app/assets/images/nineP.png";
import LoadingButton from "@mui/lab/LoadingButton";

export default function AddCompanyUser() {
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(true);
    const dispatch = useDispatch();
    const [imageData, setImageData] = useState(DefaultImage);
    const [imageFile, setImageFile] = useState(null);
    //get company user search by email
    const { userByPhone } = useSelector((state) => state.companyUser);
    console.log({ userByPhone });

    //get email from addemail input and pass to add user input email file
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentPhone, setCurrentPhone] = useState("");
    const [newPhone, setNewPhone] = useState("");

    //get company id to add user
    const { companyDetail } = useSelector(
        (state) => state.companyDetail
    );
    const { publisher } = useSelector((state) => state.loginInfo);
    //get role id from autocomplete
    const [roleID, setRoleID] = useState(null);
    const [role, setRole] = useState("");
    //alertState
    const [alertState, setAlertState] = useState();
    const [flag, setFlag] = useState(false);
    const [nameChange, setNameChange] = useState(
        userByPhone?.user?.name ?? ""
    );
    const [phone, setPhone] = useState(
        userByPhone?.user?.phone ?? currentPhone
    );

    //user create success
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setFlag(false);
    }, []);

    const handleClickOpen = () => {
        setCheck(true);
        setOpen(true);
    };

    const handleClose = () => {
        setCheck(true);
        setOpen(false);
        setImageData(DefaultImage);
        dispatch(removeUserByEmail());
        dispatch(removeUserByPhone());
    };

    const handleCheck = (e) => {
        setCheck(e.target.checked);
    };

    const handleCheckPhone = (event) => {
        event.preventDefault();
        setFlag(true);
        console.log("Handle Check Phone Click");
        const formData = new FormData(event.currentTarget);
        const phone = formData.get("phone");
        const data = {
            phone: phone,
            publisher_id: publisher[0]._id,
        };
        console.log({ data });
        if (
            phone.length >= 9 &&
            phone.length < 12 &&
            phone.length != 10
        ) {
            dispatch(getPublisherUserByPhone(data));
            setSuccess(false);
            setFlag(false);
        } else {
            setAlertState({
                open: true,
                vertical: "top",
                horizontal: "right",
                variant: "error",
                message: "Phone Number must be between  9 and 11",
            });
            setTimeout(() => {
                setFlag(false);
            }, 1000);
        }
    };

    const imageInputChange = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImageFile(reader.result);
            //base64encoded string
        };

        setImageData(URL.createObjectURL(e.target.files[0]));
    };

    const handleAdd = (event) => {
        event.preventDefault();
        console.log("Handle Add Clicked.");
        setFlag(true);
        console.log(roleID);
        console.log(role);
        const userData = {
            publisherUser_id: userByPhone?.user?._id ?? "",
            name: nameChange,
            phone: phone,
            profile: imageFile ? imageFile : "",
            role: {
                _id: roleID,
                description: role.label,
            },
            publisher_id: publisher[0]._id,
        };

        if (phone.length >= 9 && phone.length < 12 && roleID) {
            console.log(userData);
            dispatch(addCompanyUser({ data: userData }))
                .unwrap()
                .then((result) => {
                    if (result.errors) {
                        setAlertState({
                            open: true,
                            vertical: "top",
                            horizontal: "right",
                            variant: "error",
                            message: "Your phone number already exit",
                        });
                        setFlag(false);
                        setSuccess(false);
                        return;
                    }
                    handleClose();
                    setSuccess(true);
                });
        } else {
            setAlertState({
                open: true,
                vertical: "top",
                horizontal: "right",
                variant: "error",
                message: "Phone Number must be between  9 and 11!",
            });
            setFlag(false);
            setSuccess(false);
        }
    };

    useEffect(() => {
        console.log({ userByPhone });
        if (userByPhone?.exit) {
            setFlag(false);
            if (!success) {
                setAlertState({
                    open: true,
                    vertical: "top",
                    horizontal: "right",
                    variant: "error",
                    message: "User Already exits!",
                });
            }
        } else {
            if (userByPhone?.create) {
                setFlag(false);
            }
        }
    }, [userByPhone]);

    return (
        <>
            <Button startIcon={<Add />} onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                component="form"
                onSubmit={
                    userByPhone?.exit || userByPhone === null
                        ? handleCheckPhone
                        : handleAdd
                }
            >
                <DialogContent>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <DialogContentText
                            sx={{
                                padding: "20px 0px",
                                fontSize: "1.3rem",
                                fontWeight: "bold",
                            }}
                        >
                            Add Publisher User
                        </DialogContentText>
                        {userByPhone === null || userByPhone.exit ? (
                            <IconButton
                                onClick={handleClose}
                                size="large"
                                sx={{ margin: "20px 35px" }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        ) : (
                            <Box>
                                <label htmlFor="contained-button-file">
                                    <Input
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
                                    <Box
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            border: "1px solid",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                cursor: "pointer",
                                            }}
                                            variant="rounded"
                                            src={imageData}
                                        />
                                    </Box>
                                </label>
                            </Box>
                        )}
                    </Stack>
                    {userByPhone === null || userByPhone.exit ? (
                        <AddUserPhone
                            setCurrentPhone={setCurrentPhone}
                        />
                    ) : (
                        <AddUserInputs
                            handleCheck={handleCheck}
                            setRoleID={setRoleID}
                            role={role}
                            setRole={setRole}
                            roleID={roleID}
                            currentPhone={currentPhone}
                            checked={check}
                            setNewPhone={setNewPhone}
                            newPhone={newPhone}
                            nameChange={nameChange}
                            setNameChange={setNameChange}
                            phone={phone}
                            setPhone={setPhone}
                        />
                    )}
                </DialogContent>
                <DialogActions sx={{ padding: "15px 35px" }}>
                    {userByPhone === null || userByPhone.exit ? (
                        ""
                    ) : (
                        <Button
                            onClick={() => {
                                dispatch(removeUserByPhone());
                                setFlag(false);
                            }}
                        >
                            Back
                        </Button>
                    )}
                    {flag ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit">
                            {userByPhone === null || userByPhone.exit
                                ? "Next"
                                : "Add user"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            <AlertBox alertState={alertState} />
        </>
    );
}
