import React, { useState, useEffect } from "react";
import { Add, Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { addCourier } from "../../features/couriers/CouriersApi";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import MkButton from "../../app/assets/theme/MkButton";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import {
    addError,
    hideAlert,
    showAlert,
} from "../../app/components/Alert/alertSlice";

const AddCourier = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { addStatus } = useSelector((state) => state.CouriersSlice);
    const { companyDetail } = useSelector((state) => state.companyDetail);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [chargeAmount, setChargeAmount] = useState("");
    const [postLink, setPostLink] = useState("");
    const [successLink, setSuccessLink] = useState("");
    const [failLink, setFailLink] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [deliPhone, setDeliPhone] = useState("");
    const [error, setError] = useState(false);
    const [errorAmount, setErrorAmount] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName("");
        setChargeAmount("");
        setPostLink("");
        setSuccessLink("");
        setFailLink("");
        setZipCode("");
        setDeliPhone("");
    };

    // console.log({ addStatus });
    const addHandler = (e) => {
        e.preventDefault();

        const data = {
            publisher_id: companyDetail._id,
            name: name,
            charges: chargeAmount,
            api_link: {
                postLink: postLink,
                success: successLink,
                fail: failLink,
            },
            kv: {
                zipCode: zipCode,
                deliPhone: deliPhone,
            },
        };

        if (
            name === "" ||
            chargeAmount === "" ||
            postLink === "" ||
            successLink === "" ||
            failLink === "" ||
            zipCode === "" ||
            deliPhone === ""
        ) {
            dispatch(addError("Please fill All Fields!"));
            dispatch(showAlert());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 2000);
            return;
        } else {
            dispatch(addCourier({ data }))
                .unwrap()
                .then((result) => {
                    if (result.data) {
                        setOpen(false);
                        setName("");
                        setChargeAmount("");
                        setPostLink("");
                        setSuccessLink("");
                        setFailLink("");
                        setZipCode("");
                        setDeliPhone("");
                    }
                });
        }
    };

    return (
        <>
            <Button startIcon={<Add />} onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='md'
                component='form'
            >
                <DialogContent>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <DialogContentText
                            sx={{
                                // padding: "10px 5px",
                                fontSize: "1.3rem",
                                fontWeight: "bold",
                            }}
                        >
                            Add Courier
                        </DialogContentText>
                        <IconButton
                            onClick={handleClose}
                            size='large'
                            // sx={{ margin: "20px 0" }}
                        >
                            <Close fontSize='inherit' />
                        </IconButton>
                    </Stack>
                    <Box>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 12 }}
                        >
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.currentTarget.value);
                                    }}
                                    label='Name'
                                    name='Name'
                                    placeholder='Name'
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={deliPhone}
                                    onChange={(e) =>
                                        setDeliPhone(e.currentTarget.value)
                                    }
                                    label='Phone Number'
                                    name='Phone Number'
                                    placeholder='Enter Phone Number'
                                    required
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            setError(true);
                                            console.log("invalid input value");
                                        } else {
                                            setError(false);
                                        }
                                    }}
                                />
                                {error ? (
                                    <Typography
                                        sx={{
                                            color: "red",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Please Type English number Only.
                                    </Typography>
                                ) : (
                                    ""
                                )}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={chargeAmount}
                                    label='Charge Amount'
                                    name='Charge Amount'
                                    placeholder='Enter Charge Amount'
                                    onChange={(e) =>
                                        setChargeAmount(e.target.value)
                                    }
                                    required
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            setErrorAmount(true);
                                            console.log("invalid input value");
                                        } else {
                                            setErrorAmount(false);
                                        }
                                    }}
                                />
                                {errorAmount ? (
                                    <Typography
                                        sx={{
                                            color: "red",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Please Type English number Only.
                                    </Typography>
                                ) : (
                                    ""
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={postLink}
                                    label='Post Link'
                                    name='Post Link'
                                    placeholder='Enter Post Link'
                                    onChange={(e) =>
                                        setPostLink(e.target.value)
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={successLink}
                                    label='Success Link'
                                    name='Success Link'
                                    placeholder='Enter Success Link'
                                    onChange={(e) =>
                                        setSuccessLink(e.target.value)
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={failLink}
                                    label='Fail Link'
                                    name='Fail Link'
                                    placeholder='Enter Fail Link'
                                    onChange={(e) =>
                                        setFailLink(e.target.value)
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={zipCode}
                                    label='Zip Code'
                                    name='Zip Code'
                                    placeholder='Enter Zip Code'
                                    onChange={(e) => setZipCode(e.target.value)}
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
                                {addStatus === "pending" ? (
                                    <Button
                                        disabled
                                        variant='gradient'
                                        // fullWidth
                                        sx={{
                                            color: "linear-gradient(310deg, #2152ff, #02c6f3)",
                                        }}
                                    >
                                        Loading
                                    </Button>
                                ) : (
                                    <MkButton
                                        mkcolor={`linear-gradient(310deg, ${theme.palette.gradientDark.main}, ${theme.palette.gradientDark.light})`}
                                        size='lg'
                                        onClick={(e) => addHandler(e)}
                                        type='submit'
                                    >
                                        Add
                                    </MkButton>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddCourier;
