import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormGroup,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    Divider,
    FormControl,
    NativeSelect,
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
    allCustomers,
    searchCustomer,
} from "../../features/customer/CustomerApi";
import ListCustomer from "./ListCustomer";
import {
    chooseAddress,
    resetUpdateAddress,
} from "../../features/customer/CustomerSlice";
// import { ReactComponent as Facebook } from "../../app/assets/images/Facebook A.svg";
import Facebook from "../../app/assets/images/Facebook.svg";
import Viber from "../../app/assets/images/Viber.svg";
import Telegram from "../../app/assets/images/Telegram.svg";
import Whatsapp from "../../app/assets/images/WhatA.svg";
import KBZ from "../../app/assets/images/KBZPay.svg";
import CB from "../../app/assets/images/Cbpay.svg";
import AYA from "../../app/assets/images/Ayapay.svg";
import SimpleSelect from "../../app/components/SimpleSelect";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});
const AddCustomer = ({
    open,
    setOpen,
    publisher = [],
    phNumber,
    setPhNumber,
    inputValue,
    from,
    setFrom,
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
        console.log("close");
        setFirstName("");
        setDivision("");
        setTownship("");
        setCity("");
        setAddressChange("");
        setAlert(false);
        dispatch(resetUpdateAddress());
        // setPhNumber("");
        setReseller(false);
    };
    // console.log(inputValue[0]);
    const { divisionOptions } = useSelector(
        (state) => state.DivisionListSlice
    );
    const { cityOptions } = useSelector(
        (state) => state.CitiesListSlice
    );
    const { townshipOption } = useSelector(
        (state) => state.TownshipListSlice
    );
    const { status } = useSelector((state) => state.CustomerSlice);
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
    const csPhnumber = inputValue?.map((v) => v.phone);
    const csAddress = inputValue?.map((v) => v.address);
    const pID = inputValue?.map((v) => v.publisher_id);
    const [facebook, setFacebook] = useState(false);
    const [telegram, setTelegram] = useState(false);
    const [viber, setViber] = useState(false);
    const [whatsapp, setWhatsapp] = useState(false);
    const [kbz, setKbz] = useState(false);
    const [aya, setAya] = useState(false);
    const [cb, setCb] = useState(false);
    const [wave, setWave] = useState(false);
    const [addFlag, setAddFlag] = useState(false);
    const [amount, setAmount] = useState({ name: 0 });
    const [reseller, setReseller] = useState(false);
    const resDiscount = [
        { name: 0 },
        { name: 3 },
        { name: 5 },
        { name: 10 },
        { name: 15 },
    ];
    const handleAdd = (event) => {
        event.preventDefault();
        setAddFlag(true);
        console.log(amount);
        const data = {
            publisher_id: publisher[0]?._id ?? pID[0],
            name: firstName,
            phone: phNumber ?? csPhnumber[0],
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
                viber,
                whatsapp,
                telegram,
            },
            customer_payment: {
                kbz,
                cb,
                aya,
                wave,
            },
            reseller: reseller
                ? {
                      discount_amount: amount.name,
                  }
                : null,
        };
        const cleanedSearchString = addressChange
            ?.replace(/[\s,()]/g, "")
            .toLowerCase();
        const containsString = csAddress?.some(
            (item) =>
                item.replace(/[\s,()]/g, "").toLowerCase() ===
                cleanedSearchString
        );
        if (containsString) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 2000);
        } else {
            dispatch(addCustomer({ data: data }))
                .unwrap()
                .then((result) => {
                    if (result.data) {
                        setState(true);
                        setOpen(false);
                        setResult(result.data);
                        console.log("close");
                        setFirstName("");
                        setDivision("");
                        setTownship("");
                        setCity("");
                        setAddressChange("");
                        setAlert(false);
                        // setPhNumber("");
                        setReseller(false);
                        if (!from) {
                            dispatch(chooseAddress(result.data[0]));
                        } else {
                            dispatch(
                                allCustomers({
                                    page: 1,
                                    limit: 10,
                                    filterName: "",
                                    divisionId: "",
                                })
                            );
                        }
                    }
                });
        }
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
                <DialogContentText sx={{ padding: "10px 35px " }}>
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        Add Customer
                    </Typography>
                </DialogContentText>
                {addFlag ? (
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
                                    value={phNumber ?? csPhnumber[0]}
                                    onKeyPress={(event) => {
                                        if (
                                            !/[0-9]/.test(event.key)
                                        ) {
                                            event.preventDefault();
                                            setError(true);
                                            console.log(
                                                "invalid input value"
                                            );
                                        } else {
                                            setError(false);
                                        }
                                    }}
                                    disabled
                                    onChange={(e) => {
                                        setPhNumber(e.target.value);
                                    }}
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
                                        if (value === "") {
                                            return;
                                        } else {
                                            option._id === value.id;
                                        }
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
                                        if (value === "") {
                                            return;
                                        } else {
                                            option._id === value.id;
                                        }
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
                                        if (value === "") {
                                            return;
                                        } else {
                                            option._id === value.id;
                                        }
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
                                        border: "1px solid",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <Typography
                                        my={2}
                                        pl={2}
                                        fontWeight={"bold"}
                                    >
                                        Contact Social Medias
                                    </Typography>

                                    <FormGroup sx={{ padding: 1.5 }}>
                                        <Stack
                                            direction="row"
                                            spacing={2}
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
                                        border: "1px solid",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <Typography
                                        my={2}
                                        pl={2}
                                        fontWeight={"bold"}
                                    >
                                        Payments
                                    </Typography>

                                    <FormGroup sx={{ padding: 1.5 }}>
                                        <Stack
                                            direction="row"
                                            spacing={2}
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
                                                label={"WAVE"}
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
                                    fontWeight={"bold"}
                                >
                                    Dealer
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
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
                                sx={{
                                    marginTop: "30px",
                                    width: "170px",
                                }}
                                display={reseller ? "" : "none"}
                            >
                                <InputLabel
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Select Discount
                                </InputLabel>

                                <MkAutoComplete
                                    name="genres"
                                    fullWidth
                                    placeholder="Choose Discount"
                                    options={resDiscount}
                                    isOptionEqualToValue={(
                                        option,
                                        value
                                    ) => option?.name === value?.name}
                                    getOptionLabel={(option) =>
                                        `${option.name} %`
                                    }
                                    onChange={(event, newValue) => {
                                        setAmount(newValue);
                                    }}
                                    value={amount}
                                />
                                {/* <Typography
                                    my={2}
                                    fontWeight={"bold"}
                                ></Typography>
                                <InputFormComponent
                                    value={amount}
                                    onKeyPress={(event) => {
                                        if (
                                            !/[0-9]/.test(event.key)
                                        ) {
                                            event.preventDefault();
                                            setAmountError(true);
                                            setTimeout(() => {
                                                setAmountError(false);
                                            }, 1000);
                                        } else {
                                            setAmountError(false);
                                        }
                                    }}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    label="Discount Amount"
                                    name="discount_amount"
                                    placeholder="Discount Amount"
                                />
                                {amountError ? (
                                    <Typography
                                        sx={{
                                            color: "red",
                                            fontSize: "0.75rem",
                                        }}
                                    >
                                        Please Type English number
                                        Only.
                                    </Typography>
                                ) : (
                                    ""
                                )} */}
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
            <DialogActions sx={{ padding: "15px 35px" }}>
                {!addFlag && (
                    <Button onClick={handleClose}>Cancel</Button>
                )}
                {status === "pending" ? (
                    <Button disabled>Adding</Button>
                ) : (
                    <Button type="submit">Add</Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AddCustomer;
