import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Input,
    Stack,
} from "@mui/material";
import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import CampaignInputs from "./CampaignInputs";
import { addCampaign } from "../../../features/company/CampaignApi";
import { format, parseISO } from "date-fns";
import PlaceholderImage from "../../../app/assets/images/placeholderImage.png";

function CampaignAdd() {
    const { companyDetail } = useSelector((state) => state.companyDetail);
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(true);
    const dispatch = useDispatch();
    const [imageData, setImageData] = useState("#");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleClickOpen = () => {
        setCheck(true);
        setOpen(true);
        setImageData(PlaceholderImage);
    };

    const handleClose = () => {
        setCheck(true);
        setOpen(false);
        setImageData("#");
    };

    const handleCheck = (e) => {
        setCheck(e.target.checked);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("company_id", companyDetail.id);

        const start = format(new Date(startDate), "yyyy-MM-dd HH:mm:ss");
        const end = format(
            new Date(endDate === null ? startDate : endDate),
            "yyyy-MM-dd HH:mm:ss"
        );
        //change date format from datepick and Post form data to backend
        formData.append("start", start);
        formData.append("end", end);
        formData.append("disable", 1);
        formData.append("finish", 0);
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ", " + pair[1]);
        // }
        dispatch(addCampaign(formData));
        setStartDate(null);
        setEndDate(null);
        //close the model box
        setOpen(false);
    };

    const imageInputChange = (e) => {
        const [file] = e.target.files;
        if (file) {
            // setImageChange(true);
            setImageData(URL.createObjectURL(file));
        }
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
                    <Stack direction="row" justifyContent="space-between">
                        <DialogContentText sx={{ padding: "20px 35px " }}>
                            Add Campaign
                        </DialogContentText>
                    </Stack>
                    <Box sx={{ padding: "0px 35px", width: "100%" }}>
                        <label htmlFor="contained-button-file">
                            <Input
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                name="banner_image"
                                sx={{
                                    display: "none",
                                }}
                                onChange={imageInputChange}
                            />
                            <Avatar
                                sx={{
                                    width: "100%",
                                    height: 200,
                                    cursor: "pointer",
                                }}
                                variant="rounded"
                                src={imageData}
                            />
                        </label>
                    </Box>
                    <CampaignInputs
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </DialogContent>
                <DialogActions sx={{ padding: "15px 35px" }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CampaignAdd;
