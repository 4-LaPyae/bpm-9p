import { Edit } from "@mui/icons-material";
import { Box, Button, Grid, createTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkButton from "../../../app/assets/theme/MkButton";
import MkSwitch from "../../../app/assets/theme/MkSwitch";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/styles";
import { useTheme } from "@mui/system";
import { edit_tandc } from "../../../features/company/TandcApi";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function TandcEdit({ item }) {
    const theme = useTheme();
    // const { item } = useSelector((state) => state.tandcList);
    const dispatch = useDispatch();
    const { campaignInfo } = useSelector((state) => state.campaignDetail);

    const [description, setDescription] = useState(
        item?.description ? item?.description : ""
    );
    const [checked, setChecked] = useState(item?.active ? true : false);

    useEffect(() => {
        setDescription(item?.description ? item?.description : "");
        setChecked(item?.active ? true : false);
    }, [item?.description, item?.active]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            campaign_id: item.campaign_id,
            description: description,
            active: checked ? 1 : 0,
        };
        dispatch(edit_tandc({ data: data, id: item.id }));
    };
    return (
        <Grid spacing={2} container component="form" onSubmit={handleSubmit}>
            <Grid item xs={12}>
                <InputFormComponent
                    placeholder="Description"
                    name="description"
                    label="Description"
                    focus={true}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ display: campaignInfo.finish === 1 ? "none" : "block" }}
            >
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        label="Active"
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </ThemeProvider>
            </Grid>
            <Grid
                item
                md={12}
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                }}
            >
                <MkButton
                    type="submit"
                    sx={{
                        width: "60px",
                        fontSize: "10px",
                        display: campaignInfo.finish === 1 ? "none" : "",
                    }}
                    size="sm"
                    variant="contained"
                    mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                >
                    Update
                </MkButton>
            </Grid>
        </Grid>
    );
}

export default TandcEdit;
