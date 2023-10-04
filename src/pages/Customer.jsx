import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TableFooterPagination from "../app/components/Table/TableFooterPagination";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { allCustomers } from "../features/customer/CustomerApi";
import CustomersTable from "../components/customer/CustomersTable";
import TableToolbar from "../app/components/Table/TableToolbar";
import InputFormComponent from "../app/components/Form/InputFormComponent";
import MkAutoComplete from "../app/assets/theme/MkAutoComplete";
import AddIcon from "@mui/icons-material/Add";
import AddCustomer from "../components/customer/AddCustomer";
import CustomerPopup from "../components/customer/CustomerPopup";

const Customer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [name, setName] = useState("");
    const [division, setDivision] = useState(null);
    const [open, setOpen] = useState(false);
    const [phNumber, setPhNumber] = useState("");

    const dispatch = useDispatch();
    const { pagination, customers, getAllStatus, loading } =
        useSelector((state) => state.CustomerSlice);
    const { divisionOptions } = useSelector(
        (state) => state.DivisionListSlice
    );
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        dispatch(
            allCustomers({
                page: page + 1,
                limit: rowsPerPage,
                filterName: name,
                divisionId: division?._id ?? "",
            })
        );
    }, [page, rowsPerPage, name, division]);
    console.log(divisionOptions);
    return (
        <Box
            component={Paper}
            sx={{ padding: "25px 25px 25px 25px" }}
            // mt={5}
        >
            <TableToolbar>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                        width={"100%"}
                    >
                        <Typography
                            fontSize={"16px"}
                            fontWeight={"bold"}
                        >
                            Customers List
                        </Typography>
                        <Box sx={{ width: "20%" }}>
                            <InputFormComponent
                                value={name}
                                onChange={(e) =>
                                    setName(e.currentTarget.value)
                                }
                                label=""
                                name="name"
                                placeholder="Enter Phone Number"
                            />
                        </Box>
                        <Box sx={{ width: "20%" }}>
                            <MkAutoComplete
                                name="divisions"
                                noOptionsText="No related Division"
                                fullWidth
                                placeholder="Division"
                                options={divisionOptions}
                                getOptionLabel={(option) =>
                                    option?.name ?? option
                                }
                                isOptionEqualToValue={(
                                    option,
                                    value
                                ) => {
                                    option._id === value._id;
                                }}
                                onChange={(event, newValue) => {
                                    setDivision(newValue);
                                }}
                                value={division}
                            />
                        </Box>
                    </Stack>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}
                    >
                        Add
                    </Button>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={"15%"}>
                                <Typography fontWeight={"bold"}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell width={"15%"}>
                                <Typography fontWeight={"bold"}>
                                    Phone
                                </Typography>
                            </TableCell>
                            <TableCell width={"65%"}>
                                <Typography fontWeight={"bold"}>
                                    Address
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getAllStatus === "pending" ||
                        loading === "pending" ? (
                            <TableRow>
                                <TableCell
                                    colSpan={15}
                                    rowSpan={3}
                                    align="center"
                                >
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {customers?.length > 0 ? (
                                    <>
                                        {customers?.map((item) => {
                                            return (
                                                <CustomersTable
                                                    item={item}
                                                />
                                            );
                                        })}
                                    </>
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: "1.4rem",
                                            textAlign: "center",
                                            padding: "60px",
                                        }}
                                    >
                                        There is no Customers
                                    </Typography>
                                )}
                            </>
                        )}
                    </TableBody>
                    {customers?.length > 0 && (
                        <TableFooterPagination
                            rowsPerPageOptions={[10, 20, 30]}
                            tableList={pagination?.total}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={
                                handleChangeRowsPerPage
                            }
                        />
                    )}
                </Table>
            </TableContainer>
            <CustomerPopup
                open={open}
                setOpen={setOpen}
                clear={true}
            />
        </Box>
    );
};

export default Customer;
