import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCustomerList } from "../../features/customer/CustomerApi";
import AddCustomer from "./AddCustomer";
import ListCustomer from "./ListCustomer";

const CustomerPopup = ({ open, setOpen, clear }) => {
    const [phNumber, setPhNumber] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const [from, setFrom] = useState(true);
    const dispatch = useDispatch();
    const { publisher } = useSelector((state) => state.loginInfo);
    const { customerList, getStatus, address } = useSelector(
        (state) => state.CustomerSlice
    );
    const [error, setError] = useState(false);
    const handleClose = () => {
        setPhNumber("");
        setOpen(false);
        setError(false);
    };
    const handleCheck = (e) => {
        e.preventDefault();
        console.log("enter");
        dispatch(
            getCustomerList({
                publisher_id: publisher[0]._id,
                phNumber: phNumber,
            })
        )
            .unwrap()
            .then((result) => {
                if (result.length > 0) {
                    setListOpen(true);
                    setOpen(false);
                    // setPhNumber("");
                } else {
                    setEditOpen(true);
                    setOpen(false);
                    // setPhNumber("");
                }
            });
    };
    useEffect(() => {
        console.log(clear);
        if (clear) {
            setPhNumber("");
        }
    }, []);
    return (
        <>
            {editOpen && (
                <AddCustomer
                    inputValue={customerList}
                    open={editOpen}
                    setOpen={setEditOpen}
                    publisher={publisher}
                    phNumber={phNumber}
                    setPhNumber={setPhNumber}
                    from={from}
                    setFrom={setFrom}
                ></AddCustomer>
            )}
            {listOpen && (
                <ListCustomer
                    open={listOpen}
                    setOpen={setListOpen}
                    setFrom={setFrom}
                    from={from}
                />
            )}
            {open && (
                <Dialog
                    open={open}
                    maxWidth="md"
                    component="form"
                    onClose={handleClose}
                    onSubmit={handleCheck}
                >
                    <DialogContent
                        sx={{ height: "300px", width: "500px" }}
                    >
                        <DialogContentText
                            sx={{ padding: "10px 35px " }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Search by Phone
                            </Typography>
                        </DialogContentText>
                        <Stack
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{ mt: 10 }}
                        >
                            <InputFormComponent
                                value={phNumber}
                                onChange={(e) =>
                                    setPhNumber(e.currentTarget.value)
                                }
                                label=""
                                name="Ph Number"
                                placeholder="Enter Phone Number"
                                onKeyPress={(event) => {
                                    if (
                                        event.key == "Enter" &&
                                        phNumber.length > 8 &&
                                        phNumber.length < 12
                                    ) {
                                        event.preventDefault();
                                        handleCheck(event);
                                    } else {
                                        if (
                                            !/[0-9]/.test(event.key)
                                        ) {
                                            event.preventDefault();
                                            setError(true);
                                            console.log(
                                                "invalid input value"
                                            );
                                        } else {
                                            setError(false);
                                        }
                                    }
                                }}
                            />
                            {error ? (
                                <Typography
                                    sx={{
                                        color: "red",
                                        fontSize: "16px",
                                    }}
                                >
                                    Please Type English Number Only.
                                </Typography>
                            ) : (
                                ""
                            )}
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ padding: "15px 35px" }}>
                        {getStatus === "pending" ? (
                            <Button disabled> Loading</Button>
                        ) : (
                            <>
                                <Button onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type="submit">Next</Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default CustomerPopup;
