import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Box,
    Input,
    Stack,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Avatar,
    IconButton,
    Typography,
    Grid,
    InputLabel,
} from "@mui/material";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkDatePicker from "../../../app/assets/theme/MkDatePicker";
import MkButton from "../../../app/assets/theme/MkButton";
import { imageApi } from "../../../app/hooks";
// import imageLogo from "../../../app/assets/images/ImageIcon.png";

import { format } from "date-fns";
import { EditCampaignDetail } from "../../../features/company/CampaignApi";
import { Edit } from "@mui/icons-material";
import { changeCampaignInfo } from "../../../features/company/CampaignSlice";
import { useTheme, createTheme } from "@mui/material/styles";
import PlaceholderImage from "../../../app/assets/images/placeholderImage.png";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

export default function CmapaignEdit({ item }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {
        campaignInfo: {
            id,
            event_title,
            description,
            logo,
            start,
            end,
            callback_url,
            company_id,
            outlet_id,
            banner_image,
        },
    } = useSelector((state) => state.campaignDetail);
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState("#");
    const [title, setTitle] = useState(event_title ? event_title : "");
    const [desc, setDesc] = useState(description ? description : "");
    const [callbackUrl, setCallbackUrl] = useState(
        callback_url ? callback_url : ""
    );
    const [startDate, setStartDate] = useState(start ? start : "");
    const [endDate, setEndDate] = useState(end ? end : "");
    const [imageChange, setImageChange] = useState(false);

    useEffect(() => {
        setTitle(event_title ? event_title : "");
        setDesc(description ? description : "");
        setCallbackUrl(callback_url ? callback_url : "");
        setImageData(
            banner_image ? `${imageApi}/${banner_image}` : PlaceholderImage
        );
        setStartDate(start ? start : "");
        setEndDate(end ? end : "");
        setImageChange(false);
    }, [event_title, logo, start, end]);

    //imageInput change
    const imageInputChange = (e) => {
        const [file] = e.target.files;
        if (file) {
            setImageChange(true);
            setImageData(URL.createObjectURL(file));
        }
    };

    const handleClickOpen = () => {
        dispatch(changeCampaignInfo(item));
        setOpen(true);
        setImageData(
            banner_image ? `${imageApi}/${banner_image}` : PlaceholderImage
        );
    };

    const handleClose = () => {
        setImageChange(false);
        setImageData("#");
        setOpen(false);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("company_id", company_id);
        formData.append("outlet_id", outlet_id == null ? 0 : outlet_id);
        const start = format(new Date(startDate), "yyyy-MM-dd HH:mm:ss");
        const end = format(
            new Date(endDate === null ? startDate : endDate),
            "yyyy-MM-dd HH:mm:ss"
        );
        formData.append("start", start);
        formData.append("end", end);
        if (!imageChange) {
            formData.delete("logo");
        }
        dispatch(EditCampaignDetail({ data: formData, id: id }));
        setOpen(false);
    };

    return (
        <>
            <MkButton
                mkcolor={`linear-gradient(310deg, #2152ff, #02c6f3)`}
                size="small"
                onClick={handleClickOpen}
            >
                Edit
            </MkButton>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                component="form"
                onSubmit={handleAdd}
            >
                <DialogContent>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                    >
                        <DialogContentText sx={{ padding: "20px 35px " }}>
                            Edit Campaign
                        </DialogContentText>
                        {/* <Box>
                            <label htmlFor="contained-button-file">
                                <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    type="file"
                                    name="logo"
                                    sx={{
                                        display: "none",
                                    }}
                                    onChange={imageInputChange}
                                />
                                <Avatar
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        cursor: "pointer",
                                    }}
                                    variant="rounded"
                                    src={imageData}
                                />
                            </label>
                        </Box> */}
                    </Stack>
                    <Box sx={{ width: "100%", padding: "0px 35px" }}>
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
                    <Box sx={{ padding: "35px" }}>
                        <Grid container rowSpacing={1} columnSpacing={3}>
                            <Grid item xs={12}>
                                <InputFormComponent
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.currentTarget.value)
                                    }
                                    label="Event Title"
                                    name="event_title"
                                    placeholder="Enter Event Title"
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
                                    value={desc}
                                    onChange={(e) =>
                                        setDesc(e.currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputFormComponent
                                    value={callbackUrl}
                                    onChange={(e) =>
                                        setCallbackUrl(e.currentTarget.value)
                                    }
                                    label="Callback URL"
                                    name="callback_url"
                                    placeholder="Callback URL"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    sx={{
                                        mb: 1,
                                        fontSize: "1rem",
                                    }}
                                >
                                    Start Date
                                </InputLabel>
                                <MkDatePicker
                                    fullWidth
                                    value={startDate}
                                    onChange={(newValue) => {
                                        setStartDate(newValue);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel
                                    sx={{
                                        mb: 1,
                                        fontSize: "1rem",
                                    }}
                                >
                                    End Date
                                </InputLabel>
                                <MkDatePicker
                                    fullWidth
                                    value={endDate}
                                    onChange={(newValue) => {
                                        setEndDate(newValue);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: "15px 35px" }}>
                    <MkButton
                        variant="outlined"
                        mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                        onClick={handleClose}
                    >
                        Cancel
                    </MkButton>
                    <MkButton
                        mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                        type="submit"
                    >
                        Update
                    </MkButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
