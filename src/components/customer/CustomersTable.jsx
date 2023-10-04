import {
    Stack,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch } from "react-redux";
import { getCustomerList } from "../../features/customer/CustomerApi";
import ListCustomer from "./ListCustomer";
import { useSelector } from "react-redux";

const CustomersTable = ({ item }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { publisher } = useSelector((state) => state.loginInfo);
    const handleSearch = (i) => {
        dispatch(
            getCustomerList({
                publisher_id: publisher[0]._id,
                phNumber: i.phone,
            })
        );
        setOpen(true);
    };
    return (
        <>
            <TableRow>
                <TableCell
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleSearch(item)}
                >
                    <Stack direction={"row"} spacing={1}>
                        {item.reseller ? (
                            <StoreMallDirectoryIcon color="success" />
                        ) : (
                            <AccountBoxIcon color="primary" />
                        )}
                        <Typography>{item.name}</Typography>
                    </Stack>
                </TableCell>
                <TableCell
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleSearch(item)}
                >
                    <Typography>{item.phone}</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{`${item.address},${item.township.name},${item.city.name},${item.division.name}`}</Typography>
                </TableCell>
            </TableRow>
            <ListCustomer
                open={open}
                setOpen={setOpen}
                from={true}
            ></ListCustomer>
        </>
    );
};

export default CustomersTable;
