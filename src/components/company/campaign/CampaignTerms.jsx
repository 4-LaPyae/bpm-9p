import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import MkButton from "../../../app/assets/theme/MkButton";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function CampaignTerms() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state).loginInfo;
    const { campaignInfo } = useSelector((state) => state.campaignDetail);
    //for validation
    // const [percent, setPercent] = useState(0);
    // const [amount, setAmount] = useState(0);
    // const [disablePercent, setDisablePercent] = useState(
    //     amount === 0 ? false : true
    // );
    // const [disableAmount, setDisableAmount] = useState(
    //     percent === 0 ? false : true
    // );

    // useEffect(() => {
    //     setDisablePercent(amount === 0 ? false : true);
    //     setDisableAmount(percent === 0 ? false : true);
    // }, [percent, amount]);

    const handleClose = () => {
        setOpen(false);
        // setAmount(0);
        // setPercent(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("admin_id", user.user.id);
        formData.append("campaign_id", campaignInfo.id);
        // for (const pair of data.entries()) {
        //      console.log(`${pair[0]}, ${pair[1]}`);
        // }
        dispatch(addPromotion({ data: formData }));
        setOpen(false);
        // setAmount(0);
        // setPercent(0);
    };
    return (
        <>
            <Button startIcon={<Add />} onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                component="form"
                onSubmit={handleAdd}
            >
                <DialogContent>
                    <Box sx={{ padding: " 10px", mt: 5 }}>
                        <Box>
                            <Typography variant="h4" mb={3}>
                                Add Terms & Conditions
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
                                        label="Pre-text"
                                        name="title"
                                        placeholder="Terms & Conditions Pre-text"
                                        focus={true}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        label="description"
                                        name="description"
                                        placeholder="Enter Description"
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        // inputProps={{ min: 0, max: 10 }}
                                        // value={percent}
                                        // onChange={(e) => {
                                        //     setPercent(Number(e.target.value));
                                        // }}
                                        label="Percent"
                                        name="percent"
                                        placeholder="Enter Percent"
                                        required
                                        // readOnly={disablePercent}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        // value={amount}
                                        // onChange={(e) => {
                                        //     setAmount(
                                        //         Number(e.currentTarget.value)
                                        //     );
                                        // }}
                                        label="Amount"
                                        name="amount"
                                        placeholder="Enter Amount"
                                        required
                                        // readOnly={disableAmount}
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
        </>
    );
}

export default CampaignTerms;
