import { useState } from "react";
import { useDispatch } from "react-redux";

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
} from "@mui/material";
import CompanyInputs from "./CompanyInputs";
import { addCompanyList } from "../../features/company/CompanyApi";
import { Add } from "@mui/icons-material";

export default function AddCompany() {
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(true);
    const dispatch = useDispatch();
    const [imageData, setImageData] = useState("#");
    const [township, setTownship] = useState(null);

    const handleClickOpen = () => {
        setCheck(true);
        setOpen(true);
        setImageData("#");
        setTownship(null);
    };

    const handleClose = () => {
        setCheck(true);
        setOpen(false);
        setTownship(null);
    };

    const handleCheck = (e) => {
        setCheck(e.target.checked);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("active", check == true ? Number(1) : Number(0));
        formData.append("township_id", township.id);
        formData.append("city_id", township.city_id);
        formData.append("division_id", township.division_id);
        // for (const pair of formData.entries()) {
        //     console.log(pair);
        // }
        dispatch(addCompanyList({ data: formData }));

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
                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                    >
                        <DialogContentText sx={{ padding: "20px 35px " }}>
                            Add Company
                        </DialogContentText>
                        <Box>
                            <label htmlFor="contained-button-file">
                                <Input
                                    // accept="image/*"
                                    inputProps={{ accept: "image/*" }}
                                    id="contained-button-file"
                                    type="file"
                                    name="company_logo"
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
                        </Box>
                    </Stack>
                    <CompanyInputs
                        handleCheck={handleCheck}
                        checked={check}
                        setTownship={setTownship}
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
