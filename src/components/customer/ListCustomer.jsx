import {
    DialogContent,
    Dialog,
    Button,
    Typography,
    Card,
    CardContent,
    Stack,
    Checkbox,
    FormControl,
    FormControlLabel,
    Divider,
    Box,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
    chooseAddress,
    chooseUpdateAddress,
    resetAddress,
    resetCustomerList,
} from "../../features/customer/CustomerSlice";
import { Add } from "@mui/icons-material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCustomer from "./AddCustomer";
import UpdateCustomer from "./UpdateCustomer";
import {
    allCustomers,
    defaultAddress,
    deleteCustomer,
    getCustomerList,
} from "../../features/customer/CustomerApi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const ListCustomer = ({ open, setOpen, from, setFrom }) => {
    const dispatch = useDispatch();
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const {
        customerList,
        updateAddress,
        address,
        loading,
        getStatus,
    } = useSelector((state) => state.CustomerSlice);

    const handleClose = () => {
        setOpen(false);
        // dispatch(resetCustomerList());
    };
    const handleClick = (list) => {
        console.log(list);
        if (!from) {
            dispatch(chooseAddress(list));
            setOpen(false);
        } else {
            const existingList = customerList?.filter(
                (i) => i._id !== list._id
            );
            const data = {
                publisher_id: list.publisher_id,
                phone: list.phone,
                customer_id: list._id,
                existingIds: existingList.map((i) => i._id),
            };
            console.log(data);
            // return;
            handleClose();
            dispatch(defaultAddress({ data }))
                .unwrap()
                .then((result) => {
                    if (!result.error) {
                        // dispatch(
                        //     getCustomerList({
                        //         publisher_id: list.publisher_id,
                        //         phNumber: list.phone,
                        //     })
                        // );
                        dispatch(
                            allCustomers({
                                page: 1,
                                limit: 10,
                                filterName: "",
                                divisionId: "",
                            })
                        );
                    }
                });
        }
    };

    const handleAdd = () => {
        console.log("to add");
        // console.log(customerList);
        setAddOpen(true);
        // setOpen(false);
    };
    const handleUpdate = (list) => {
        console.log(list);
        setEditOpen(true);
        dispatch(chooseUpdateAddress(list));
    };

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteCustomer({ id: id }));
        dispatch(resetAddress());
    };

    return (
        <Dialog
            open={open}
            maxWidth="1000px"
            component="form"
            onClose={handleClose}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ padding: " 10px 25px" }}
                alignItems="center"
            >
                <Typography variant="h1">
                    <strong>
                        Customer Info{" "}
                        {customerList[0]?.phone ? (
                            <>({customerList[0]?.phone})</>
                        ) : (
                            <></>
                        )}
                    </strong>
                </Typography>
                <Button startIcon={<Add />} onClick={handleAdd}>
                    Add
                </Button>
            </Stack>
            {from ? (
                <Typography
                    variant="h2"
                    sx={{ padding: " 10px 25px" }}
                >
                    Address List
                </Typography>
            ) : (
                <Typography
                    variant="h2"
                    sx={{ padding: " 10px 25px" }}
                >
                    Select Your Address
                </Typography>
            )}
            <DialogContent
                sx={{ maxHeight: "400px", overflowY: "auto" }}
            >
                {loading === "pending" || getStatus === "pending" ? (
                    <Box sx={{ marginLeft: "50%", width: "100%" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {customerList?.map((list) => (
                            <Box key={list._id}>
                                <Card
                                    sx={{
                                        width: "500px",
                                        cursor: "pointer",
                                        userSelect: "none",
                                        marginTop: 2,
                                        marginBottom: 3,
                                        background: {},
                                        "&:hover": {
                                            background: "whitesmoke",
                                        },
                                        boxShadow:
                                            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box
                                            sx={
                                                list.default_address ===
                                                1
                                                    ? {
                                                          position:
                                                              "absolute",
                                                          top: -18,
                                                          left: -30,
                                                          width: 150,
                                                          height: 130,
                                                          overflow:
                                                              "hidden",
                                                          "&::before, &::after":
                                                              {
                                                                  position:
                                                                      "absolute",
                                                                  zIndex: -2,
                                                                  content:
                                                                      '""',
                                                                  display:
                                                                      "block",
                                                                  border: "5px solid #2980b9",
                                                              },
                                                          "&::before":
                                                              {
                                                                  top: 0,
                                                                  right: 0,
                                                              },
                                                          "&::after":
                                                              {
                                                                  bottom: 0,
                                                                  left: 0,
                                                              },
                                                          "& span": {
                                                              position:
                                                                  "absolute",
                                                              display:
                                                                  "block",
                                                              width: 225,
                                                              padding:
                                                                  "4px 0",
                                                              backgroundColor:
                                                                  "green",
                                                              boxShadow:
                                                                  "0 5px 10px rgba(0,0,0,.1)",
                                                              color: "#fff",
                                                              fontFamily:
                                                                  "Lato",
                                                              fontWeight: 700,
                                                              fontSize: 10,
                                                              // lineHeight: 1,
                                                              textShadow:
                                                                  "0 1px 1px rgba(0,0,0,.2)",
                                                              textTransform:
                                                                  "uppercase",
                                                              textAlign:
                                                                  "center",
                                                              right: -25,
                                                              top: 30,
                                                              transform:
                                                                  "rotate(-45deg)",
                                                          },
                                                      }
                                                    : {}
                                            }
                                        >
                                            {list.default_address ===
                                                1 && (
                                                <span>Default</span>
                                            )}
                                        </Box>
                                        <CardContent
                                            sx={{
                                                paddingLeft: 5,
                                                paddingTop: 1,
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Box
                                                    onClick={() =>
                                                        handleClick(
                                                            list
                                                        )
                                                    }
                                                >
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        sx={{
                                                            paddingBottom: 3,
                                                        }}
                                                    ></Stack>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                    >
                                                        <Typography
                                                            variant="h3"
                                                            sx={{
                                                                paddingBottom: 2,
                                                            }}
                                                        >
                                                            <strong>
                                                                Type
                                                            </strong>{" "}
                                                            :{" "}
                                                            {list.reseller ? (
                                                                <strong>
                                                                    Reseller
                                                                </strong>
                                                            ) : (
                                                                <strong>
                                                                    Normal
                                                                    Customer
                                                                </strong>
                                                            )}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                    >
                                                        <Typography
                                                            variant="h3"
                                                            sx={{
                                                                paddingBottom: 2,
                                                            }}
                                                        >
                                                            <strong>
                                                                Name
                                                            </strong>{" "}
                                                            :{" "}
                                                            {
                                                                list.name
                                                            }{" "}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                    >
                                                        <Typography
                                                            variant="h3"
                                                            sx={{
                                                                paddingBottom: 2,
                                                            }}
                                                        >
                                                            <strong>
                                                                Address
                                                            </strong>
                                                            :
                                                            {
                                                                list.address
                                                            }{" "}
                                                            {/* <br /> */}
                                                            {
                                                                list
                                                                    .township
                                                                    .name
                                                            }{" "}
                                                            ၊
                                                            {
                                                                list
                                                                    .city
                                                                    .name
                                                            }{" "}
                                                            ၊
                                                            {
                                                                list
                                                                    .division
                                                                    .name
                                                            }
                                                        </Typography>
                                                    </Stack>
                                                </Box>
                                                <Box>
                                                    <Stack
                                                        spacing={5}
                                                    >
                                                        <EditIcon
                                                            fontSize="small"
                                                            sx={{
                                                                cursor: "pointer",
                                                                color: "blue",
                                                            }}
                                                            onClick={() => {
                                                                handleUpdate(
                                                                    list
                                                                );
                                                            }}
                                                        />
                                                        <DeleteIcon
                                                            fontSize="small"
                                                            sx={{
                                                                cursor: "pointer",
                                                                color: "red",
                                                            }}
                                                            onClick={() => {
                                                                handleDelete(
                                                                    list._id
                                                                );
                                                            }}
                                                        />
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Box>
                                </Card>
                                <Divider
                                    sx={{
                                        margin: "10px 0 10px 0",
                                        background: "black",
                                    }}
                                />
                            </Box>
                        ))}
                    </>
                )}

                <AddCustomer
                    open={addOpen}
                    setOpen={setAddOpen}
                    inputValue={customerList}
                ></AddCustomer>
                <UpdateCustomer
                    open={editOpen}
                    setOpen={setEditOpen}
                ></UpdateCustomer>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}> Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ListCustomer;
