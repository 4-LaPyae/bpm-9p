import {
    Box,
    Button,
    Checkbox,
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
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAddress } from "../../features/customer/CustomerSlice";
import { useSelector } from "react-redux";
import {
    PrintAllInvoices,
    allInvoices,
} from "../../features/invoices/invoicesApi";
import InvoiceTableItem from "../../components/sale/InvoiceTableItem";
import TableFooterPagination from "../../app/components/Table/TableFooterPagination";
import {
    addSelectedInvoices,
    clearInvoices,
    clearSelectedBook,
    clearSelectedInvoice,
} from "../../features/invoices/invoicesSlice";
import SimpleDateRangePicker from "../../app/components/SimpleDateRangePicker";
import CancelIcon from "@mui/icons-material/Cancel";
import format from "date-fns/format";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import MkAutoComplete from "../../app/assets/theme/MkAutoComplete";
import { dropdownCourisers } from "../../features/couriers/CouriersApi";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useReactToPrint } from "react-to-print";
import TableToolbar from "../../app/components/Table/TableToolbar";
import InvoiceTabView from "../../components/sale/InvoiceTabView";
import InvoiceTabLink from "../../components/sale/InvoiceTabLink";
import MkButton from "../../app/assets/theme/MkButton";
import ComponenttoPrint from "./A5/ComponenttoPrint";

const CompleteInvoiceTabview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        invoices,
        pagination,
        selectedInvoices,
        invoicesAll,
        getStatus,
    } = useSelector((state) => state.InvoicesSlice);
    const { divisionOptions } = useSelector(
        (state) => state.DivisionListSlice
    );
    const { usersList, allUser } = useSelector(
        (state) => state.companyUser
    );

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [startDate, setStartDate] = useState(
        format(new Date(), "yyyy-MM-dd")
    );
    const [endDate, setEndDate] = useState(
        format(new Date(), "yyyy-MM-dd")
    );
    const [showDateRange, setShowDateRange] = useState(false);
    const [invoiceCode, setInvoiceCode] = useState("");
    const [division, setDivision] = useState("");
    const [staff, setStaff] = useState("");
    const [checkAll, setCheckAll] = useState(false);
    const f1KeyPressed = useRef(false);
    console.log(selectedInvoices);
    const emptyRows =
        page > 0
            ? rowsPerPage - invoices?.length
            : rowsPerPage - invoices?.length;

    const handleChangePage = (event, newPage) => {
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

    const handleCheckAll = () => {
        if (invoices.length === selectedInvoices.length) {
            dispatch(addSelectedInvoices([]));
        } else {
            dispatch(addSelectedInvoices(invoices));
        }
    };

    useEffect(() => {
        dispatch(clearSelectedInvoice());
        if (invoices?.length === 0) {
            setRowsPerPage(10);
            setPage(0);
        }
    }, [pagination]);
    useEffect(() => {
        dispatch(
            PrintAllInvoices({
                start: startDate,
                end: endDate,
                code: invoiceCode,
                division: division ? division._id : "",
                staff: staff ? staff._id : "",
                status: 1,
            })
        );
    }, [startDate, endDate, invoiceCode, division, staff]);

    useEffect(() => {
        dispatch(resetAddress());
        dispatch(clearSelectedInvoice());
        dispatch(
            PrintAllInvoices({
                start: startDate,
                end: endDate,
                code: invoiceCode,
                division: division ? division._id : "",
                staff: staff ? staff._id : "",
                status: 1,
            })
        );
        dispatch(
            allInvoices({
                page: page + 1,
                limit: rowsPerPage,
                start: startDate,
                end: endDate,
                code: invoiceCode,
                division: division ? division._id : "",
                staff: staff ? staff._id : "",
                status: 1,
            })
        );
    }, [
        page,
        rowsPerPage,
        startDate,
        endDate,
        invoiceCode,
        division,
        staff,
    ]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "F1") {
                event.preventDefault();
                if (!f1KeyPressed.current) {
                    f1KeyPressed.current = true;
                    navigate("/sales/invoice");
                }
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === "F1") {
                f1KeyPressed.current = false;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        dispatch(clearSelectedBook());
        dispatch(dropdownCourisers());
        dispatch(clearSelectedInvoice());
    }, []);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            <Box display={"none"}>
                <ComponenttoPrint ref={componentRef} />
            </Box>
            <Box
                component={Paper}
                sx={{ padding: "20px 5px 25px 5px" }}
                mt={2}
            >
                <TableToolbar>
                    <Stack
                        direction="row"
                        alignItems={"center"}
                        // spacing={49}
                        width={"100%"}
                        justifyContent={"space-between"}
                    >
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                            width={"60%"}
                            // sx={{ background: "red" }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    mt: 0.5,
                                    width: "40%",
                                }}
                            >
                                <Chip
                                    sx={{
                                        width: "100%",
                                        padding: "20px",
                                        fontSize: "12px",
                                    }}
                                    // label={"Today"}
                                    label={
                                        startDate == endDate
                                            ? "Today"
                                            : `${startDate} ~ ${endDate}`
                                        // `Start ${startDate} ~ End ${endDate}`
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
                                        handleDateRange={
                                            handleDateRange
                                        }
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ width: "20%" }}>
                                <InputFormComponent
                                    value={invoiceCode}
                                    onChange={(e) =>
                                        setInvoiceCode(
                                            e.currentTarget.value
                                        )
                                    }
                                    label=""
                                    name="invoice_code"
                                    placeholder="Enter Invoice Code"
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
                            <Box sx={{ width: "20%" }}>
                                <MkAutoComplete
                                    name="staffs"
                                    fullWidth
                                    placeholder="Staff"
                                    options={allUser}
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
                                        setStaff(newValue);
                                    }}
                                    value={staff}
                                />
                            </Box>
                        </Stack>
                        <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            justifyContent={"flex-end"}
                            width={"40%"}
                        >
                            <Button
                                startIcon={<LocalPrintshopIcon />}
                                disabled={
                                    selectedInvoices.length > 0
                                        ? false
                                        : true
                                }
                                onClick={handlePrint}
                            >
                                Print
                            </Button>
                            <Link to={`/sales/invoice`}>
                                <MkButton
                                    mkcolor={`linear-gradient(310deg, #2152ff, #02c6f3)`}
                                    size="small"
                                    textTransform="capitalize"
                                >
                                    New (F1)
                                </MkButton>
                            </Link>
                        </Stack>
                    </Stack>
                </TableToolbar>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align={"center"}
                                    width={50}
                                >
                                    <Stack
                                        direction={"column"}
                                        alignItems={"center"}
                                    >
                                        <Typography
                                            variant="h4"
                                            fontWeight={"bold"}
                                        >
                                            Select All
                                        </Typography>
                                        <Stack
                                            direction={"row"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                        >
                                            <Checkbox
                                                checked={
                                                    invoicesAll?.length ===
                                                    0
                                                        ? false
                                                        : selectedInvoices.length ===
                                                          invoicesAll.length
                                                        ? true
                                                        : false
                                                }
                                                onChange={
                                                    handleCheckAll
                                                }
                                                inputProps={{
                                                    "aria-label":
                                                        "controlled",
                                                }}
                                            />
                                            <Typography>
                                                (
                                                {
                                                    selectedInvoices?.length
                                                }
                                                )
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </TableCell>
                                {titles.map((title) => (
                                    <TableCell
                                        key={title.id}
                                        align={title.align}
                                    >
                                        <Typography
                                            variant="h4"
                                            fontWeight={"bold"}
                                        >
                                            {title.label}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getStatus === "pending" ? (
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
                                    {invoices?.length > 0 ? (
                                        invoices?.map((item) => {
                                            return (
                                                <InvoiceTableItem
                                                    item={item}
                                                    checkAll={
                                                        checkAll
                                                    }
                                                />
                                            );
                                        })
                                    ) : (
                                        <TableCell
                                            colSpan={15}
                                            rowSpan={2}
                                            align="center"
                                        >
                                            <Typography
                                                variant="h1"
                                                fontWeight={"bold"}
                                            >
                                                No invoices
                                            </Typography>
                                        </TableCell>
                                    )}
                                </>
                            )}

                            {/* {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53.3 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={14} />
                                </TableRow>
                            )} */}
                        </TableBody>
                        {invoices?.length > 0 && (
                            <TableFooterPagination
                                rowsPerPageOptions={[
                                    10, 20, 30, 50, 100,
                                ]}
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
            </Box>
        </>
    );
};

export default CompleteInvoiceTabview;

const titles = [
    {
        id: "invoice",
        label: "Invoice",
        align: "center",
    },
    {
        id: "staff",
        label: "Staff",
        align: "center",
    },
    {
        id: "customer",
        label: "Customer",
        align: "center",
    },
    {
        id: "qty",
        label: "Qty",
        align: "center",
    },
    {
        id: "amount",
        label: "Amount",
        align: "center",
    },
    {
        id: "tracking_code",
        label: "Tracking Code",
        align: "center",
    },
    {
        id: "delivery_cost",
        label: "Deli Cost",
        align: "center",
    },
    {
        id: "delivery_charges",
        label: "Deli Charges",
        align: "center",
    },
    {
        id: "delivery_type",
        label: "Deli Type",
        align: "center",
    },
    {
        id: "discount",
        label: "Discount",
        align: "center",
    },
    {
        id: "delivery_date",
        label: "Deli Date",
        align: "center",
    },
    {
        id: "net_amount",
        label: "Net Amount",
        align: "center",
    },
    {
        id: "action",
        label: "Actions",
        align: "center",
    },
];
