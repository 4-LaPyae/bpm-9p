import React from "react";
import { Box, Grid, InputLabel } from "@mui/material";
import { useTheme, createTheme } from "@mui/material/styles";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkDatePicker from "../../../app/assets/theme/MkDatePicker";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function CampaignInputs({ startDate, endDate, setStartDate, setEndDate }) {
    const theme = useTheme();

    return (
        <Box sx={{ padding: "35px" }}>
            <Grid container rowSpacing={1} columnSpacing={3}>
                <Grid item xs={12}>
                    <InputFormComponent
                        label="Event Name"
                        name="event_title"
                        placeholder="Event Name"
                        focus={true}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputFormComponent
                        placeholder="Enter Description"
                        label="Description"
                        name="description"
                        multiline={true}
                        rows={4}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputFormComponent
                        label="Callback URL"
                        name="callback_url"
                        placeholder="Callback URL"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel sx={{ mb: 1, fontSize: "1rem" }}>
                        Start Date
                    </InputLabel>
                    <MkDatePicker
                        minDate={new Date()}
                        name="start"
                        value={startDate}
                        onChange={(newValue) => {
                            setStartDate(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel sx={{ mb: 1, fontSize: "1rem" }}>
                        End Date
                    </InputLabel>
                    <MkDatePicker
                        minDate={new Date()}
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default CampaignInputs;
