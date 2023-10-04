import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MkButton from "../../../app/assets/theme/MkButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePrintSetting } from "../../../features/company/settingApi";
import {
    addError,
    clearError,
    showAlert,
    showSuccess,
} from "../../../app/components/Alert/alertSlice";
import { setPrintSetting } from "../../../features/company/CompanySlice";
import {
    getCompanyDetail,
    getCompanyUserRole,
} from "../../../features/company/CompanyApi";

export default function Setting() {
    const dispatch = useDispatch();
    const { setting, commercial } = useSelector(
        (state) => state.SettingSlice
    );
    const { publisher } = useSelector((state) => state.loginInfo);
    const { companyDetail } = useSelector(
        (state) => state.companyDetail
    );
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(getCompanyDetail({ id: publisher[0]?._id }))
            .unwrap()
            .then((result) => {
                console.log({ result });
                // setMessage(result?.message);
            });
        dispatch(getCompanyUserRole());
    }, []);

    const [state, setState] = useState({
        a4: false,
        b4: false,
        pos: true,
        letter: false,
    });
    const [taxState, setTaxState] = useState({
        three: true,
        five: false,
        ten: false,
    });
    const [logo, setLogo] = useState(true);
    const [name, setName] = useState(true);
    const [address, setAddress] = useState(true);

    const { a4, b4, pos, letter } = state;
    const { three, five, ten } = taxState;

    const handleChange = (event) => {
        const name = event.target.name;
        const checked = event.target.checked;
        var newState = {};
        if (name == "pos") {
            newState = {
                a4: !checked,
                b4: !checked,
                letter: !checked,
                pos: checked,
            };
        }
        if (name == "b4") {
            newState = {
                a4: !checked,
                b4: checked,
                letter: !checked,
                pos: !checked,
            };
        }
        if (name == "a4") {
            newState = {
                a4: checked,
                b4: !checked,
                letter: !checked,
                pos: !checked,
            };
        }

        if (name == "letter") {
            newState = {
                a4: !checked,
                b4: !checked,
                letter: checked,
                pos: !checked,
            };
        }
        setState(newState);
    };
    const handleChangeTax = (event) => {
        const name = event.target.name;
        const checked = event.target.checked;
        var newState = {};
        if (name == "3%") {
            newState = {
                three: checked,
                five: !checked,
                ten: !checked,
            };
        }
        if (name == "5%") {
            newState = {
                three: !checked,
                five: checked,
                ten: !checked,
            };
        }
        if (name == "10%") {
            newState = {
                three: !checked,
                five: !checked,
                ten: checked,
            };
        }
        setTaxState(newState);
    };

    const handleUpdatePrintSetting = () => {
        const type = a4 == true ? 0 : b4 == true ? 1 : letter ? 2 : 3;
        const tax = three == true ? 0 : five == true ? 1 : 2;

        const data = {
            publisher_id: publisher[0]?._id,
            print_setting: {
                address: address,
                name: name,
                printer_type: type,
                publisher_logo: logo,
            },
        };

        setLoading(true);
        dispatch(updatePrintSetting({ data: data }))
            .unwrap()
            .then((result) => {
                console.log(result);
                if (result.error || result.errors) {
                    dispatch(addError("Something wrong. Try Again!"));
                } else {
                    dispatch(
                        showSuccess("Setting updated successfully.")
                    );
                    dispatch(
                        setPrintSetting(result.data.print_setting)
                    );
                    dispatch(clearError());
                }
                dispatch(showAlert());
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(false);
        if (setting) {
            setLogo(setting.publisher_logo);
            setName(setting.name);
            setAddress(setting.address);

            if (setting.printer_type == 0) {
                setState({
                    a4: true,
                    b4: false,
                    letter: false,
                    pos: false,
                });
            }

            if (setting.printer_type == 1) {
                setState({
                    a4: false,
                    b4: true,
                    letter: false,
                    pos: false,
                });
            }

            if (setting.printer_type == 2) {
                setState({
                    a4: false,
                    b4: false,
                    letter: true,
                    pos: false,
                });
            }

            if (setting.printer_type == 3) {
                setState({
                    a4: false,
                    b4: false,
                    letter: false,
                    pos: true,
                });
            }
        }
    }, []);

    return (
        <Box
            component={Paper}
            sx={{ padding: "15px 25px 25px 25px" }}
            // mt={5}
            width={"100%"}
        >
            <Typography
                variant="h1"
                fontSize={30}
                fontWeight={"bold"}
            >
                Print Setting
            </Typography>
            <Box sx={{ width: "100%", mt: 3, ml: 3 }}>
                {/* <Typography variant="h3" fontWeight={"800"}>
                    Print Settings
                </Typography> */}
                <Box mt={2} ml={2}>
                    <Typography variant="h4" fontWeight={"400"}>
                        Publisher Information
                    </Typography>
                    <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        spacing={10}
                        mt={1}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={logo}
                                    onChange={(e) =>
                                        setLogo(e.target.checked)
                                    }
                                />
                            }
                            label="Publisher Logo"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={name}
                                    onChange={(e) =>
                                        setName(e.target.checked)
                                    }
                                />
                            }
                            label="Publisher Name"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={address}
                                    onChange={(e) =>
                                        setAddress(e.target.checked)
                                    }
                                />
                            }
                            label="Publisher Address"
                        />
                    </Stack>
                </Box>
                <Box mt={2} ml={2}>
                    <Typography variant="h4" fontWeight={"400"}>
                        Printer Type
                    </Typography>
                    <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        spacing={13.2}
                        mt={1}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={a4}
                                    onChange={handleChange}
                                    name="a4"
                                />
                            }
                            label="A4"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={b4}
                                    onChange={handleChange}
                                    name="b4"
                                />
                            }
                            label="A5"
                        />
                        {/* <FormControlLabel
                            control={
                                <Checkbox
                                    checked={letter}
                                    onChange={handleChange}
                                    name="letter"
                                />
                            }
                            label="Letter"
                        /> */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pos}
                                    onChange={handleChange}
                                    name="pos"
                                />
                            }
                            label="POS"
                        />
                    </Stack>
                </Box>
            </Box>
            {/* <Box sx={{ width: "100%", mt: 3, ml: 3 }}>
                <Typography variant="h3" fontWeight={"800"}>
                    Commercial Tax
                </Typography>
                <Box mt={2} ml={2}>
                    <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        spacing={13.2}
                        mt={1}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={three}
                                    onChange={handleChangeTax}
                                    name="3%"
                                />
                            }
                            label="3%"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={five}
                                    onChange={handleChangeTax}
                                    name="5%"
                                />
                            }
                            label="5%"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={ten}
                                    onChange={handleChangeTax}
                                    name="10%"
                                />
                            }
                            label="10%"
                        />
                    </Stack>
                </Box>
            </Box> */}
            <Stack direction={"row"} justifyContent={"end"}>
                <MkButton
                    mkcolor={`linear-gradient(310deg, #2152ff, #02c6f3)`}
                    size="lg"
                    onClick={handleUpdatePrintSetting}
                    disabled={loading}
                >
                    Save
                </MkButton>
            </Stack>
        </Box>
    );
}
