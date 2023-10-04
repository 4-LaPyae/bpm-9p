import { Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    Grid,
    createTheme,
    Typography,
    Stack,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkButton from "../../../app/assets/theme/MkButton";
import MkSwitch from "../../../app/assets/theme/MkSwitch";
import { useState, useEffect } from "react";
import { edit_promotion } from "../../../features/company/CampaignApi";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/styles";
import { useTheme } from "@mui/system";
import ColorPicker from "../../../app/components/colorPicker";
import {
    onChangeBackground,
    onChangeForeground,
} from "../../../features/company/CampaignSlice";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function PromotionEdit({ listItem }) {
    const theme = useTheme();
    const diaptch = useDispatch();
    const { campaignInfo } = useSelector((state) => state.campaignDetail);
    const { selectedPromotion } = useSelector((state) => state.promotions);
    const [color, setColor] = useState(
        selectedPromotion.font_color ?? listItem.font_color
    );
    const [bgColor, setBgColor] = useState(
        selectedPromotion.bg_color ?? listItem.bg_color
    );

    const [fontsize, setFontsize] = useState(listItem.font_size);
    const user = useSelector((state) => state.loginInfo);
    const dispatch = useDispatch();

    const [title, setTitle] = useState(listItem.title ? listItem.title : "");
    const [description, setDescription] = useState(
        listItem.description ? listItem.description : ""
    );
    const [percent, setPercent] = useState(
        listItem.precent ? listItem.precent : 0
    );
    const [amount, setAmount] = useState(listItem.amount ? listItem.amount : 0);

    useEffect(() => {
        setTitle(listItem.title ? listItem.title : "");
        setDescription(listItem.description ? listItem.description : "");
        setAmount(listItem.amount ? listItem.amount : 0);
        setPercent(listItem.percent ? listItem.percent : 0);
        setBgColor(selectedPromotion.bg_color ?? listItem.bg_color);
        setColor(selectedPromotion.font_color ?? listItem.font_color);
    }, [listItem, selectedPromotion]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("admin_id", user.user.id);
        formData.append("campaign_id", campaignInfo.id);
        if (!parseInt(amount) || !parseInt(percent)) {
            formData.delete("amount");
            formData.delete("percent");
        }
        formData.append("description", "test");
        formData.append("amount", parseInt(amount));
        formData.append("percent", parseInt(percent));
        formData.append("bg_color", bgColor);
        formData.append("font_color", color);
        formData.append("font_size", fontsize);
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        dispatch(edit_promotion({ data: formData, id: listItem.id }));
    };

    const changeForeground = (color) => {
        setColor(color);
    };

    const changeBackground = (color) => {
        setBgColor(color);
    };

    const font = (e) => {
        setFontsize(e.target.value);
    };

    return (
        <Grid spacing={2} container component="form" onSubmit={handleSubmit}>
            <Grid item xs={12} md={6}>
                <InputFormComponent
                    placeholder="Event Name"
                    name="title"
                    label="Event Name"
                    focus={true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputFormComponent
                    type="number"
                    inputProps={{ min: 0 }}
                    placeholder="amount"
                    name="amount"
                    label="Amount Discount"
                    value={amount.toString()}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    readOnly={percent > 0 ? true : false}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputFormComponent
                    placeholder="percent"
                    inputProps={{ min: 0 }}
                    name="percent"
                    type="number"
                    label="Percent Discount"
                    value={percent.toString()}
                    onChange={(e) => setPercent(Number(e.target.value))}
                    required
                    readOnly={amount > 0 ? true : false}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputFormComponent
                    placeholder="Font Size"
                    inputProps={{ min: 0 }}
                    type="number"
                    label="font_size"
                    name="font_size"
                    value={fontsize}
                    onChange={font}
                />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: campaignInfo.finish === 1 ? "none" : "block",
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    sx={{ height: "100%" }}
                >
                    <ColorPicker
                        colorCode={color}
                        listItem={listItem}
                        changeColorCode={changeForeground}
                        onChangeAction={onChangeForeground}
                    />
                    <Typography variant="span" sx={{ ml: 2 }}>
                        Text Color
                    </Typography>
                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: campaignInfo.finish === 1 ? "none" : "block",
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    sx={{ height: "100%" }}
                >
                    <ColorPicker
                        colorCode={bgColor}
                        listItem={listItem}
                        changeColorCode={changeBackground}
                        onChangeAction={onChangeBackground}
                        side="left"
                    />
                    <Typography variant="span" sx={{ ml: 2 }}>
                        Background Color
                    </Typography>
                </Stack>
            </Grid>
            {/* <Grid item xs={12} md={6}>
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        label="Slient"
                        // checked={checked}
                        // onChange={handleCheck}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </ThemeProvider>
            </Grid> */}
            {/* <Grid item xs={12} md={6}>
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        label="Hide"
                        // checked={checked}
                        // onChange={handleCheck}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </ThemeProvider>
            </Grid> */}
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
                {/* <MkButton
                    sx={{ width: "60px", fontSize: "10px", marginLeft: "15px" }}
                    size="sm"
                    variant="outlined"
                    mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                >
                    Delete
                </MkButton> */}
            </Grid>
        </Grid>
    );
}

export default PromotionEdit;
