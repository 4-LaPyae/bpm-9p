import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControlLabel,
    Input,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import { useDispatch } from "react-redux";
import {
    addSelectedBook,
    storeDamage,
    storeReturn,
} from "../../features/invoices/invoicesSlice";
import { useSelector } from "react-redux";

const ReturnPopOver = ({ popOver, setPopOver, item, isDamage }) => {
    const [remark, setRemark] = useState("");
    const [qty, setQty] = useState("");
    const [imageData, setImageData] = useState("#");
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [damage, setDamage] = useState(false);
    const { user } = useSelector((state) => state.loginInfo);
    const { selectedBooks } = useSelector(
        (state) => state.InvoicesSlice
    );
    const dispatch = useDispatch();
    const handleClose = () => {
        setPopOver(false);
        setRemark("");
        setQty("");
        setImageData("#");
        setDamage(false);
        setImageFile(null);
        setInputError(false);
    };
    const handleIncrementQty = (item, val) => {
        const books = selectedBooks.map((i) => {
            console.log(i);
            console.log(item);
            if (i._id === item._id) {
                return {
                    ...i,
                    qty: Number(val),
                };
            } else {
                return i;
            }
        });
        dispatch(addSelectedBook(books));
    };
    const handleAdd = (event) => {
        event.preventDefault();
        if (remark === "" || qty === "") {
            console.log(item);
            setInputError(true);
        } else {
            handleIncrementQty(item, Number(item.qty) - Number(qty));
            if (isDamage) {
                dispatch(
                    storeDamage({
                        damage: true,
                        image: imageFile,
                        remark: remark,
                        qty: qty,
                        book_id: item._id,
                        user_id: user._id,
                        damage_date: new Date(),
                    })
                );
                setPopOver(false);
                setRemark("");
                setQty("");
                setDamage(false);
                setImageData("#");
                setImageFile(null);
                setInputError(false);
            } else {
                dispatch(
                    storeReturn({
                        damage: false,
                        image: imageFile,
                        remark: remark,
                        qty: qty,
                        book_id: item._id,
                        user_id: user._id,
                        return_date: new Date(),
                    })
                );
                setPopOver(false);
                setRemark("");
                setQty("");
                setDamage(false);
                setImageData("#");
                setImageFile(null);
                setInputError(false);
            }
        }
    };
    const imageInputChange = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImageFile(reader.result);
        };
        setImageData(URL.createObjectURL(e.target.files[0]));
        // }
    };
    useEffect(() => {
        if (qty > item.qty) {
            setError(true);
        } else {
            setError(false);
        }
    }, [qty]);
    return (
        <Dialog
            open={popOver}
            maxWidth="md"
            component="form"
            onClose={handleClose}
            // onSubmit={handleAdd}
        >
            <DialogContent>
                <DialogContentText sx={{ padding: "10px 35px " }}>
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        {isDamage
                            ? `Damage Unit (${item.book_title})`
                            : `Return Unit (${item.book_title})`}
                    </Typography>
                </DialogContentText>
                <Box
                    sx={{
                        padding: "20px 0px",
                        width: "800px",
                        height: "300px",
                    }}
                >
                    <Stack
                        direction={"row"}
                        // alignItems={"center"}
                        justifyContent={"space-between"}
                        width={"100%"}
                    >
                        <Stack width={"48%"} spacing={1}>
                            <Box width={"100%"}>
                                <InputFormComponent
                                    value={qty}
                                    onKeyPress={(event) => {
                                        if (
                                            !/[0-9]/.test(event.key)
                                        ) {
                                            event.preventDefault();
                                            setError(true);
                                            setTimeout(() => {
                                                setError(false);
                                            }, 1000);
                                        } else {
                                            setError(false);
                                        }
                                    }}
                                    onChange={(e) =>
                                        setQty(e.currentTarget.value)
                                    }
                                    label="Units"
                                    name="units"
                                    placeholder="Enter Units"
                                />
                            </Box>
                            <Box width={"100%"}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(e) =>
                                                setDamage(
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    }
                                    label={
                                        <Typography>
                                            {isDamage
                                                ? "Damage"
                                                : "Return"}
                                        </Typography>
                                    }
                                ></FormControlLabel>
                            </Box>
                            <Box
                                width={"100%"}
                                sx={{ display: damage ? "" : "none" }}
                            >
                                <label htmlFor="contained-button-file">
                                    <Input
                                        // accept="image/*"
                                        inputProps={{
                                            accept: "image/*",
                                        }}
                                        id="contained-button-file"
                                        type="file"
                                        name="profile"
                                        required
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
                        </Stack>
                        <Box width={"48%"}>
                            <InputFormComponent
                                multiline
                                // rows={3}
                                value={remark}
                                onChange={(e) =>
                                    setRemark(e.currentTarget.value)
                                }
                                label="Remark"
                                name="remark"
                                placeholder="Enter Remark"
                                focus={true}
                            />
                        </Box>
                    </Stack>
                    {error && (
                        <Typography sx={{ color: "red" }}>
                            *Please Type Valid Unit*
                        </Typography>
                    )}
                    {inputError && (
                        <Typography sx={{ color: "red" }}>
                            *Please Fill Remark and Unit*
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={handleAdd}
                    disabled={error ? true : false}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReturnPopOver;
