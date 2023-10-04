import { Add } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MkButton from "../../../app/assets/theme/MkButton";
import AlertBox from "../../../app/components/AlertBox/AlertBox";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import { addPromotion } from "../../../features/company/CampaignApi";
import generateColor from "../../../app/helper/generateColor";

export default function PromotionAdd() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state).loginInfo;
    const { campaignInfo } = useSelector((state) => state.campaignDetail);

    const { promotionList } = useSelector((state) => state.promotions);
    const [alertState, setAlertState] = useState();
    //for validation
    const [percent, setPercent] = useState(0);
    const [amount, setAmount] = useState(0);
    const [disablePercent, setDisablePercent] = useState(
        amount === 0 ? false : true
    );
    const [disableAmount, setDisableAmount] = useState(
        percent === 0 ? false : true
    );

    useEffect(() => {
        setDisablePercent(amount === 0 ? false : true);
        setDisableAmount(percent === 0 ? false : true);
    }, [percent, amount]);

    const handleClose = () => {
        setOpen(false);
        setAmount(0);
        setPercent(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        const color = generateColor();
        const formData = new FormData(event.currentTarget);
        formData.append("admin_id", user.user.id);
        formData.append("campaign_id", campaignInfo.id);
        console.log(color);
        formData.append("bg_color", `#${color}`);
        if (!amount) {
            formData.delete("amount");
            formData.append("amount", 0);
        }
        if (!percent) {
            formData.delete("percent");
            formData.append("percent", 0);
        }
        if (
            formData.get("title") === "" ||
            formData.get("description") === ""
        ) {
            setAlertState({
                open: true,
                vertical: "top",
                horizontal: "right",
                variant: "error",
                message: "Please fill Title and Description!",
            });
            return;
        }
        if (promotionList.length >= 15) {
            setAlertState({
                open: true,
                vertical: "top",
                horizontal: "right",
                variant: "error",
                message: "Promotion Limited at 15!",
            });
            return;
        }
        dispatch(addPromotion({ data: formData }));
        setOpen(false);
        setAmount(0);
        setPercent(0);
    };

    return (
        <>
            <IconButton
                onClick={handleClickOpen}
                sx={{ display: campaignInfo.finish === 1 ? "none" : "" }}
            >
                <Add sx={{ color: "#2152ff" }} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                component="form"
                onSubmit={handleAdd}
            >
                <DialogContent>
                    <Box sx={{ padding: "25px 10px" }}>
                        <Box>
                            <Typography variant="h4" mb={3}>
                                Add New Promotion
                            </Typography>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{
                                    xs: 1,
                                    sm: 2,
                                    md: 22,
                                }}
                            >
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        label="Title"
                                        name="title"
                                        placeholder="Enter Promotion Title"
                                        focus={true}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        label="description"
                                        name="description"
                                        placeholder="Enter Description"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        inputProps={{ min: 0 }}
                                        type="number"
                                        onChange={(e) => {
                                            setPercent(Number(e.target.value));
                                        }}
                                        label="Percent"
                                        name="percent"
                                        placeholder="Enter Percent"
                                        readOnly={disablePercent}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        inputProps={{ min: 0 }}
                                        type="number"
                                        onChange={(e) => {
                                            setAmount(
                                                Number(e.currentTarget.value)
                                            );
                                        }}
                                        label="Amount"
                                        name="amount"
                                        placeholder="Enter Amount"
                                        readOnly={disableAmount}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: "15px 35px" }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
            <AlertBox alertState={alertState} />
        </>
    );
}
