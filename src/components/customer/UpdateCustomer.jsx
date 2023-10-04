import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Avatar,
    Box,
    Button,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Toolbar,
    Typography,
    IconButton,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import MkButton from "../../app/assets/theme/MkButton";
import {
    useTheme,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import MkAutoComplete from "../../app/assets/theme/MkAutoComplete";
import { citiesOptions } from "../../features/location/CityApi";
import { handleCitiesOptions } from "../../features/location/CitySlice";
import { handleTownshipOptions } from "../../features/location/TownshipSlice";
import { townshipOptions } from "../../features/location/TownshipApi";
import {
    addCustomer,
    searchCustomer,
    updateCustomer,
} from "../../features/customer/CustomerApi";
import ListCustomer from "./ListCustomer";
import { resetUpdateAddress } from "../../features/customer/CustomerSlice";
import Facebook from "../../app/assets/images/Facebook.svg";
import Whatsapp from "../../app/assets/images/WhatA.svg";
import Viber from "../../app/assets/images/Viber.svg";
import Telegram from "../../app/assets/images/Telegram.svg";
import CircularProgress from "@mui/material/CircularProgress";
import KBZ from "../../app/assets/images/KBZPay.svg";
import AYA from "../../app/assets/images/Ayapay.svg";
import CB from "../../app/assets/images/Cbpay.svg";
import Wave from "../../app/assets/images/WavePay.svg";
import SimpleInput from "../../app/components/SimpleInput";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});
const UpdateCustomer = ({ open, setOpen }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
        setFirstName("");
        setDivision("");
        setTownship("");
        setCity("");
        setAddressChange("");
        setAlert(false);
        dispatch(resetUpdateAddress());
    };

    const { divisionOptions } = useSelector(
        (state) => state.DivisionListSlice
    );
    const { cityOptions } = useSelector(
        (state) => state.CitiesListSlice
    );
    const { townshipOption } = useSelector(
        (state) => state.TownshipListSlice
    );
    const { status, updateAddress } = useSelector(
        (state) => state.CustomerSlice
    );
    const [firstName, setFirstName] = useState("");
    const [division, setDivision] = useState("");
    const [township, setTownship] = useState("");
    const [city, setCity] = useState("");
    const [addressChange, setAddressChange] = useState("");
    const [error, setError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [alert, setAlert] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const [state, setState] = useState(false);
    const [result, setResult] = useState([]);
    const [facebook, setFacebook] = useState(false);
    const [telegram, setTelegram] = useState(false);
    const [viber, setViber] = useState(false);
    const [whatsapp, setWhatsapp] = useState(false);
    const [kbz, setKbz] = useState(false);
    const [aya, setAya] = useState(false);
    const [cb, setCb] = useState(false);
    const [wave, setWave] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [amount, setAmount] = useState(0);
    const [reseller, setReseller] = useState(
        updateAddress?.reseller ? true : false
    );
    console.log(updateAddress.reseller);

    useEffect(() => {
        if (updateAddress.name) {
            setFirstName(updateAddress?.name);
            setAmount(updateAddress?.reseller?.discount_amount);
            updateAddress?.reseller
                ? setReseller(true)
                : setReseller(false);
            setDivision({
                id: updateAddress?.division?.division_id,
                name: updateAddress?.division?.name,
            });
            setTownship({
                id: updateAddress?.township?.township_id,
                name: updateAddress?.township?.name,
            });
            setCity({
                id: updateAddress?.city?.city_id,
                name: updateAddress?.city?.name,
            });
            setAddressChange(updateAddress?.address);
            setFacebook(
                updateAddress?.social_medias?.facebook ?? false
            );
            setWhatsapp(
                updateAddress?.social_medias?.whatsapp ?? false
            );
            setViber(updateAddress?.social_medias?.viber ?? false);
            setTelegram(
                updateAddress?.social_medias?.telegram ?? false
            );
        }
    }, [updateAddress]);

    const handleAdd = (event) => {
        event.preventDefault();
        setUpdateFlag(true);

        const data = {
            publisher_id: updateAddress?.publisher_id,
            name: firstName,
            phone: updateAddress?.phone,
            division: {
                division_id: division._id,
                name: division.name,
            },
            city: {
                city_id: city._id,
                name: city.name,
            },
            township: {
                township_id: township._id,
                name: township.name,
            },
            address: addressChange,
            social_medias: {
                facebook,
                whatsapp,
                telegram,
                viber,
            },
            customer_payment: {
                kbz,
                cb,
                aya,
                wave,
            },
            reseller: reseller ? { discount_amount: amount } : null,
        };

        dispatch(
            updateCustomer({ data: data, id: updateAddress?._id })
        )
            .unwrap()
            .then((result) => {
                if (result.data) {
                    setState(true);
                    setOpen(false);
                    setResult(result.data);
                    setOpen(false);
                    setFirstName("");
                    setDivision("");
                    setTownship("");
                    setCity("");
                    setReseller(false);
                    setAddressChange("");
                    setAlert(false);
                    setUpdateFlag(false);
                }
            });
    };

    return (
        <Dialog
            open={open}
            maxWidth="md"
            component="form"
            onClose={handleClose}
            onSubmit={handleAdd}
        >
            <DialogContent>
                <DialogContentText
                    sx={{ padding: "10px 35px", margin: "20px 0px" }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        Update Customer
                    </Typography>
                </DialogContentText>
                {updateFlag ? (
                    <Box
                        sx={{
                            width: "850px",
                            height: "600px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={{ padding: "25px", mt: 5 }}>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 12 }}
                        >
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={updateAddress?.phone}
                                    disabled
                                    label="Phone Number"
                                    name="Phone Number"
                                    placeholder="Enter Your Phone Number"
                                    required
                                />
                                {error ? (
                                    <Typography
                                        sx={{
                                            color: "red",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Please Type English number
                                        Only.
                                    </Typography>
                                ) : (
                                    ""
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputFormComponent
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(
                                            e.currentTarget.value
                                        )
                                    }
                                    label=" Name"
                                    name="first_name"
                                    placeholder="Enter Your  Name"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    htmlFor="select"
                                    sx={{ fontSize: "14.5px" }}
                                >
                                    Select Division
                                </InputLabel>
                                <MkAutoComplete
                                    name="divisions"
                                    noOptionsText="No related Division"
                                    fullWidth
                                    placeholder="Division"
                                    required
                                    options={divisionOptions}
                                    getOptionLabel={(option) =>
                                        option?.name ?? option
                                    }
                                    isOptionEqualToValue={(
                                        option,
                                        value
                                    ) => {
                                        option._id === value.id;
                                    }}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setDivision(newValue);
                                            setCity(null);
                                            setTownship(null);
                                            dispatch(
                                                citiesOptions({
                                                    id: newValue._id,
                                                })
                                            );
                                            return;
                                        }
                                        setTownship(null);
                                        setDivision(newValue);
                                        setCity(null);
                                        dispatch(
                                            handleCitiesOptions()
                                        );
                                        dispatch(
                                            handleTownshipOptions()
                                        );
                                    }}
                                    value={division}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    htmlFor="select"
                                    sx={{ fontSize: "14.5px" }}
                                >
                                    Select City
                                </InputLabel>
                                <MkAutoComplete
                                    name="cities"
                                    noOptionsText="No related City"
                                    fullWidth
                                    required
                                    placeholder="City"
                                    options={cityOptions}
                                    getOptionLabel={(option) =>
                                        option?.name ?? option
                                    }
                                    isOptionEqualToValue={(
                                        option,
                                        value
                                    ) => {
                                        option._id === value.id;
                                    }}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            console.log(newValue);
                                            setCity(newValue);
                                            setTownship(null);
                                            dispatch(
                                                townshipOptions({
                                                    id: newValue._id,
                                                })
                                            );
                                            return;
                                        }
                                        if (newValue === null) {
                                            setCity(null);
                                            setTownship(null);
                                            dispatch(
                                                handleTownshipOptions()
                                            );
                                            return;
                                        }
                                    }}
                                    value={city}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    htmlFor="select"
                                    sx={{ fontSize: "14.5px" }}
                                >
                                    Select Township
                                </InputLabel>
                                <MkAutoComplete
                                    name="townships"
                                    noOptionsText="No related Township"
                                    fullWidth
                                    required
                                    placeholder="Township"
                                    options={townshipOption}
                                    getOptionLabel={(option) =>
                                        option?.name ?? option
                                    }
                                    isOptionEqualToValue={(
                                        option,
                                        value
                                    ) => {
                                        option._id === value.id;
                                    }}
                                    onChange={(event, newValue) => {
                                        setTownship(newValue);
                                    }}
                                    value={township}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputFormComponent
                                    multiline={true}
                                    rows={2}
                                    value={addressChange}
                                    onChange={(e) =>
                                        setAddressChange(
                                            e.currentTarget.value
                                        )
                                    }
                                    label="Address"
                                    name="address"
                                    placeholder="Enter Your Address"
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Stack
                            direction={"row"}
                            spacing={2}
                            sx={{ width: "100%", mt: 1.5 }}
                        >
                            <Box width={"50%"}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        border: "2px solid #d2d6da",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <Typography
                                        my={2}
                                        pl={2}
                                        // fontWeight={"bold"}
                                    >
                                        Contact Social Medias
                                    </Typography>

                                    <FormGroup sx={{ padding: 1.5 }}>
                                        <Stack
                                            direction="row"
                                            // spacing={1}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setFacebook(
                                                                e
                                                                    .target
                                                                    .checked
                                                            )
                                                        }
                                                    />
                                                }
                                                label={
                                                    <img
                                                        width="30px"
                                                        height="25px"
                                                        src={Facebook}
                                                        alt="Facebook Icon"
                                                    />
                                                }
                                            ></FormControlLabel>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setWhatsapp(
                                                                e
                                                                    .target
                                                                    .checked
                                                            )
                                                        }
                                                    />
                                                }
                                                label={
                                                    <img
                                                        width="30px"
                                                        height="25px"
                                                        src={Whatsapp}
                                                        alt="Whatsapp Icon"
                                                    />
                                                }
                                            ></FormControlLabel>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setTelegram(
                                                                e
                                                                    .target
                                                                    .checked
                                                            )
                                                        }
                                                    />
                                                }
                                                label={
                                                    <img
                                                        width="30px"
                                                        height="25px"
                                                        src={Telegram}
                                                        alt="Facebook Icon"
                                                    />
                                                }
                                            ></FormControlLabel>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setViber(
                                                                e
                                                                    .target
                                                                    .checked
                                                            )
                                                        }
                                                    />
                                                }
                                                label={
                                                    <img
                                                        width="30px"
                                                        height="25px"
                                                        src={Viber}
                                                        alt="Viber Icon"
                                                    />
                                                }
                                            ></FormControlLabel>
                                        </Stack>
                                    </FormGroup>
                                </Box>
                            </Box>
                            <Box width={"50%"}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        border: "2px solid #d2d6da",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <Typography
                                        my={2}
                                        pl={2}
                                        // fontWeight={"bold"}
                                    >
                                        Payments
                                    </Typography>

                                    <FormGroup sx={{ padding: 1.5 }}>
                                        <Stack
                                            direction="row"
                                            // spacing={2}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={kbz}
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setKbz(
                                                                e
                                                                    .target
                                                                    .checked
                                                            )
                                                        }
                                                    />
                                                }
                                                label={
                                                    <img
                                                        width="30px"
                                                        height="25px"
                                                        src={KBZ}
                                                        alt="KBZ Pay Icon"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={cb}
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setCb(
                                                                e
                                                                    .target
                                                                    .checked
                                                            )
                                                        }
                                                    />
                                                }
                                                label={
                                                    <img
                                                        width="30px"
                                                        height="25px"
                                                        src={CB}
                                                        alt="CB Pay Icon"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={aya}
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setAya(
                                                                e
                                                                    .target
                                                                    .checked
                                                            )
                                                        }
                                                    />
                                                }
                                                label={
                                                    <img
                                                        width="30px"
                                                        height="25px"
                                                        src={AYA}
                                                        alt="AYA Pay Icon"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={wave}
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setWave(
                                                                e
                                                                    .target
                                                                    .checked
                                                            )
                                                        }
                                                    />
                                                }
                                                label={
                                                    <img
                                                        width="30px"
                                                        height="30px"
                                                        src={Wave}
                                                        alt="Wave Pay Icon"
                                                    />
                                                }
                                            />
                                        </Stack>
                                    </FormGroup>
                                </Box>
                            </Box>
                        </Stack>
                        <Stack
                            direction={"row"}
                            spacing={5}
                            alignItems={"center"}
                            width={"100%"}
                        >
                            <Box>
                                <Typography
                                    my={2}
                                    // fontWeight={"bold"}
                                >
                                    Dealer
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={reseller}
                                            onChange={(e) =>
                                                setReseller(
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    }
                                    label={
                                        <Typography>
                                            Reseller
                                        </Typography>
                                    }
                                ></FormControlLabel>
                            </Box>
                            <Box
                                // sx={{
                                //     width: "250px",
                                // }}
                                display={reseller ? "" : "none"}
                            >
                                <Box sx={{ mt: 1.5, width: "100px" }}>
                                    {/* <SimpleInput
                                        type="number"
                                        name="dis"
                                        // inputProps={{ min: 1 }}
                                        placeholder="Discount(%)"
                                        value={amount}
                                        fullWidth
                                        error={false}
                                        // onBlur={() => setEditQty(false)}
                                        autoFocus={focus}
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                        }}
                                    /> */}
                                    <InputFormComponent
                                        type="number"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Discount (%)"
                                        name="amount"
                                        placeholder="Discount"
                                        onWheel={() =>
                                            document.activeElement.blur()
                                        }
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                )}
                {alert && (
                    <Typography sx={{ color: "red" }}>
                        *Please Type Different Address*
                    </Typography>
                )}
            </DialogContent>
            {updateFlag ? (
                <DialogActions sx={{ padding: "15px 35px" }}>
                    <Button disabled>Updating</Button>
                </DialogActions>
            ) : (
                <DialogActions sx={{ padding: "15px 35px" }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            )}
            {state && (
                <ListCustomer
                    open={listOpen}
                    setOpen={setListOpen}
                ></ListCustomer>
            )}
        </Dialog>
    );
};

export default UpdateCustomer;
