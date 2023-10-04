import { useState, useEffect } from "react";
import { Box, Grid, Input, InputLabel } from "@mui/material";
import {
    useTheme,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import MkSwitch from "../../app/assets/theme/MkSwitch";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import MkAutoComplete from "../../app/assets/theme/MkAutoComplete";
import { useSelector } from "react-redux";
import { townshipOptions } from "../../features/location/TownshipApi";
import { useDispatch } from "react-redux";
import { handleTownshipOptions } from "../../features/location/TownshipSlice";
import { citiesOptions } from "../../features/location/CityApi";
import { handleCitiesOptions } from "../../features/location/CitySlice";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function CompanyInputs({
    inputValues = null,
    handleCheck,
    checked,
    setTownship,
    setDivision,
    setCity,
    township,
    division,
    city,
    nameChange,
    setNameChange,
    addressChange,
    setAddressChange,
    phoneChange,
    setPhoneChange,
    contactPersonChange,
    setContactPersonChange,
    contactPersonPhChange,
    setContactPersonPhChange,
    commercial,
    setCommercial,
}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { divisionOptions } = useSelector(
        (state) => state.DivisionListSlice
    );
    const { cityOptions } = useSelector(
        (state) => state.CitiesListSlice
    );
    const { townshipOption } = useSelector(
        (state) => state.TownshipListSlice
    );

    const commercialAry = [{ name: 0 }, { name: 5 }];

    useEffect(() => {
        setNameChange(inputValues?.name ?? "");
        setAddressChange(inputValues?.address?.split(",")[0] ?? "");
        setPhoneChange(inputValues?.phone ?? "");
        setContactPersonChange(inputValues?.contact_person ?? "");
        setContactPersonPhChange(
            inputValues?.contact_person_phone ?? ""
        );
    }, []);

    return (
        <Box sx={{ padding: "35px" }}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 12 }}
            >
                <Grid item xs={12} md={6}>
                    <InputFormComponent
                        value={nameChange}
                        onChange={(e) =>
                            setNameChange(e.currentTarget.value)
                        }
                        label="Publisher Name"
                        name="name"
                        placeholder="Enter Publisher Name"
                        focus={true}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputFormComponent
                        type="number"
                        value={phoneChange}
                        onChange={(e) =>
                            setPhoneChange(e.currentTarget.value)
                        }
                        label="Publisher Phone"
                        name="phone"
                        placeholder="Enter Publisher Phone"
                        required
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputFormComponent
                        value={contactPersonChange}
                        onChange={(e) =>
                            setContactPersonChange(
                                e.currentTarget.value
                            )
                        }
                        label="Contact Person"
                        name="contact_person"
                        placeholder="Enter Your Contact Person"
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputFormComponent
                        type="number"
                        value={contactPersonPhChange}
                        onChange={(e) =>
                            setContactPersonPhChange(
                                e.currentTarget.value
                            )
                        }
                        label="Contact Person Phone"
                        name="contact_person_phone"
                        placeholder="Enter Your Contact Person Phone"
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel
                        htmlFor="select"
                        sx={{ fontSize: "14.5px" }}
                    >
                        Select Publisher Division
                    </InputLabel>
                    <MkAutoComplete
                        name="divisions"
                        noOptionsText="No related Division"
                        fullWidth
                        placeholder="Division"
                        options={divisionOptions}
                        getOptionLabel={(option) =>
                            option?.name ?? option
                        }
                        isOptionEqualToValue={(option, value) => {
                            option._id === value._id;
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
                            dispatch(handleCitiesOptions());
                            dispatch(handleTownshipOptions());
                        }}
                        value={division}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel
                        htmlFor="select"
                        sx={{ fontSize: "14.5px" }}
                    >
                        Select Publisher City
                    </InputLabel>
                    <MkAutoComplete
                        name="cities"
                        noOptionsText="No related City"
                        fullWidth
                        placeholder="City"
                        options={cityOptions}
                        getOptionLabel={(option) =>
                            option?.name ?? option
                        }
                        isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                        }
                        onChange={(event, newValue) => {
                            if (newValue) {
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
                                dispatch(handleTownshipOptions());
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
                        Select Publisher Township
                    </InputLabel>
                    <MkAutoComplete
                        name="townships"
                        noOptionsText="No related Township"
                        fullWidth
                        placeholder="Township"
                        options={townshipOption}
                        getOptionLabel={(option) =>
                            option?.name ?? option
                        }
                        isOptionEqualToValue={(option, value) => {
                            option._id === value._id;
                            // console.log({ option, value });
                        }}
                        onChange={(event, newValue) => {
                            setTownship(newValue);
                        }}
                        value={township}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel
                        htmlFor="select"
                        sx={{ fontSize: "14.5px" }}
                    >
                        Select Commercial Tax
                    </InputLabel>
                    <MkAutoComplete
                        name="townships"
                        noOptionsText="No related Township"
                        fullWidth
                        placeholder="Township"
                        options={commercialAry}
                        getOptionLabel={(option) =>
                            `${option?.name} %`
                        }
                        isOptionEqualToValue={(option, value) => {
                            option.name === value.name;
                            // console.log({ option, value });
                        }}
                        onChange={(event, newValue) => {
                            setCommercial(newValue);
                        }}
                        value={commercial}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputFormComponent
                        multiline={true}
                        rows={2}
                        value={addressChange}
                        onChange={(e) =>
                            setAddressChange(e.currentTarget.value)
                        }
                        label="Address"
                        name="address"
                        placeholder="Enter Your Address"
                        required
                    />
                </Grid>

                {/* <Grid item xs={12} md={6} sx={{ alignSelf: "end" }}>
                    <ThemeProvider theme={labelTheme}>
                        <MkSwitch
                            switchColor={theme.palette.info.main}
                            label='Active'
                            checked={checked}
                            onChange={handleCheck}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </ThemeProvider>
                </Grid> */}
            </Grid>
        </Box>
    );
}

export default CompanyInputs;
