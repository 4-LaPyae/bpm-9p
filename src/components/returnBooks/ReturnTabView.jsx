import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReturnList } from "../../features/returnBooks/ReutrnApi";
import format from "date-fns/format";
import {
    Box,
    Chip,
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
import TableToolbar from "../../app/components/Table/TableToolbar";
import SimpleDateRangePicker from "../../app/components/SimpleDateRangePicker";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import MkAutoComplete from "../../app/assets/theme/MkAutoComplete";
import ReturnBooksTable from "./ReturnBooksTable";
import TableFooterPagination from "../../app/components/Table/TableFooterPagination";

const ReturnTabView = () => {
    const { returnList, returnPagination, getReuturnStatus } =
        useSelector((state) => state.ReturnDamageListSlice);
    const { allUser } = useSelector((state) => state.companyUser);
    const dispatch = useDispatch();
    const [staff, setStaff] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [startDate, setStartDate] = useState(
        format(new Date(), "yyyy-MM-dd")
    );
    const [endDate, setEndDate] = useState(
        format(new Date(), "yyyy-MM-dd")
    );
    const [showDateRange, setShowDateRange] = useState(false);
    const [invoiceCode, setInvoiceCode] = useState("");
    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClick = () => {
        setShowDateRange(!showDateRange);
    };

    const handleClose = () => {
        setShowDateRange(false);
    };

    const handleDateRange = (data) => {
        const { startDate, endDate } = data;
        setStartDate(format(startDate, "yyyy-MM-dd"));
        setEndDate(format(endDate, "yyyy-MM-dd"));
    };
    useEffect(() => {
        if (returnList?.length === 0) {
            setRowsPerPage(10);
            setPage(0);
        }
    }, [returnPagination]);

    useEffect(() => {
        dispatch(
            ReturnList({
                page: Number(page + 1),
                limit: Number(rowsPerPage),
                start: startDate,
                end: endDate,
                code: invoiceCode,
                staff: staff ? staff._id : "",
            })
        );
    }, [page, rowsPerPage, startDate, endDate, invoiceCode, staff]);
    console.log(returnList);

    return (
        <Box
            component={Paper}
            sx={{ padding: "20px 5px 25px 5px" }}
            mt={2}
        >
            <TableToolbar>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                >
                    <Box
                        sx={{
                            position: "relative",
                            mt: 0.5,
                            width: "20%",
                        }}
                    >
                        <Chip
                            sx={{
                                width: "100%",
                                padding: "20px",
                                fontSize: "12px",
                            }}
                            label={
                                startDate == endDate
                                    ? "Today"
                                    : `${startDate} ~ ${endDate}`
                            }
                            onClick={handleClick}
                            variant="outlined"
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: 50,
                                zIndex: 10000,
                            }}
                        >
                            <SimpleDateRangePicker
                                show={showDateRange}
                                close={handleClose}
                                handleDateRange={handleDateRange}
                            />
                        </Box>
                    </Box>
                    <Box width={"15%"}>
                        <InputFormComponent
                            value={invoiceCode}
                            onChange={(e) =>
                                setInvoiceCode(e.currentTarget.value)
                            }
                            label=""
                            name="invoice_code"
                            placeholder="Enter Invoice Code"
                        />
                    </Box>
                    <Box width={"15%"}>
                        <MkAutoComplete
                            name="staffs"
                            fullWidth
                            placeholder="Staff"
                            options={allUser}
                            getOptionLabel={(option) =>
                                option?.name ?? option
                            }
                            isOptionEqualToValue={(option, value) => {
                                option._id === value._id;
                            }}
                            onChange={(event, newValue) => {
                                setStaff(newValue);
                            }}
                            value={staff}
                        />
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="h4"
                                    fontWeight={"bold"}
                                >
                                    Book Title
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="h4"
                                    fontWeight={"bold"}
                                >
                                    Invoice Code
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography
                                    variant="h4"
                                    fontWeight={"bold"}
                                >
                                    Return Book Qty
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getReuturnStatus === "pending" ? (
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
                                {returnList?.length > 0 ? (
                                    <>
                                        {returnList?.map((item) => {
                                            return (
                                                <ReturnBooksTable
                                                    item={item}
                                                />
                                            );
                                        })}
                                    </>
                                ) : (
                                    <TableCell
                                        colSpan={20}
                                        rowSpan={2}
                                        align="center"
                                    >
                                        <Typography
                                            variant="h1"
                                            fontWeight={"bold"}
                                        >
                                            No Return Books
                                        </Typography>
                                    </TableCell>
                                )}
                            </>
                        )}
                    </TableBody>
                    {returnList?.length > 0 && (
                        <TableFooterPagination
                            rowsPerPageOptions={[
                                10, 20, 50, 100, 300,
                            ]}
                            tableList={returnPagination?.total}
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
        </Box>
    );
};

export default ReturnTabView;
