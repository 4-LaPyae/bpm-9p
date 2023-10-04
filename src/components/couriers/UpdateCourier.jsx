import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Stack,
    IconButton,
    Grid,
    Box,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Add, Close } from "@mui/icons-material";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import MkButton from "../../app/assets/theme/MkButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { updateCourier } from "../../features/couriers/CouriersApi";
import { useDispatch, useSelector } from "react-redux";

const UpdateCourier = ({ open, setOpen, item }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { companyDetail } = useSelector((state) => state.companyDetail);
    const { updateStatus } = useSelector((state) => state.CouriersSlice);
    const [name, setName] = useState("");
    const [chargeAmount, setChargeAmount] = useState("");
    const [postLink, setPostLink] = useState("");
    const [successLink, setSuccessLink] = useState("");
    const [failLink, setFailLink] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [deliPhone, setDeliPhone] = useState("");
    const [error, setError] = useState(false);
    const [errorAmount, setErrorAmount] = useState(false);

    console.log({ item });

    const handleClose = () => {
        setOpen(false);
        setName(item?.name);
        setChargeAmount(item?.charges);
        setPostLink(item?.api_link?.postLink);
        setSuccessLink(item?.api_link?.success);
        setFailLink(item?.api_link?.fail);
        setZipCode(item?.kv?.zipCode);
        setDeliPhone(item?.kv?.deliPhone);
    };

    useEffect(() => {
        setName(item?.name);
        setChargeAmount(item?.charges);
        setPostLink(item?.api_link?.postLink);
        setSuccessLink(item?.api_link?.success);
        setFailLink(item?.api_link?.fail);
        setZipCode(item?.kv?.zipCode);
        setDeliPhone(item?.kv?.deliPhone);
    }, []);

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
        console.log(data);
        dispatch(updateCourier({ data: data, id: item._id }))
            .unwrap()
            .then((result) => {
                console.log({ result });

                if (result.data) {
                    setOpen(false);
                }
            });
    };

    return (
        <>
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
                                padding: "20px 0px",
                                fontSize: "1.3rem",
                                fontWeight: "bold",
                            }}
                        >
                            Update Courier
                        </DialogContentText>
                        <IconButton
                            onClick={handleClose}
                            size='large'
                            sx={{ margin: "20px 0" }}
                        >
                            <Close fontSize='inherit' />
                        </IconButton>
                    </Stack>
                    <Box component='form'>
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
                                {updateStatus === "pending" ? (
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
                                        Update
                                    </MkButton>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: "15px 35px" }}></DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateCourier;
