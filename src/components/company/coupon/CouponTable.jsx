import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Toolbar,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Button,
    Stack,
    IconButton,
    InputLabel,
    Popover,
    Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Add, FileDownload, FilterList, Settings } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import { useDispatch } from "react-redux";
import {
    add_coupon,
    edit_coupon,
    coupon_list,
    Coupon_List,
} from "../../../features/company/CouponApi";
import CouponTableItem from "./CouponTableItem";
import MkButton from "../../../app/assets/theme/MkButton";
import { removeSelectedCoupon } from "../../../features/company/CouponSlice";
import CouponTableFooter from "./CouponTableFooter";
import TableFooterPagination from "../../../app/components/Table/TableFooterPagination";
import ExportCoupon from "./ExportCoupon";
import { export_coupon } from "../../../features/csvexport/csvApi";

const MkToolbar = styled(Toolbar)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        padding: "0px",
    },
}));

function CouponTable({ setTabIndex }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { campaignInfo } = useSelector((state) => state.campaignDetail);
    const { coupon_list, coupon_pagination } = useSelector(
        (state) => state.couponList
    );
    const user = useSelector((state) => state.loginInfo);
    const [spendingAmount, setSpendingAmount] = useState("");
    const [invoiceID, setInvoiceID] = useState("");

    const handleAdd = () => {
        const data = {
            admin_id: user.user.id,
            campaign_id: campaignInfo.id,
            invoice_id: invoiceID,
            spending_amount: Number(spendingAmount),
        };
        dispatch(add_coupon({ data: data }));
        setSpendingAmount("");
        setInvoiceID("");
    };

    // pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [use, setUse] = useState(2);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? rowsPerPage - coupon_list.length : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(
            Coupon_List({
                page: page + 1,
                limit: rowsPerPage,
                campaign_id: campaignInfo.id,
                use: use,
            })
        );
    }, [page, rowsPerPage, use]);

    useEffect(() => {
        dispatch(export_coupon({ id: campaignInfo.id }));
    }, []);

    return (
        <Box component={Paper} sx={{ mt: 3 }}>
            <Box sx={{ padding: "20px" }}>
                <MkToolbar sx={{ padding: 0 }}>
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="subtitle1"
                        component="div"
                    >
                        Coupon List
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={handleClick}>
                            <FilterList sx={{ color: "#2152ff" }} />
                        </IconButton>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            sx={{
                                mt: "10px",
                                boxShadow:
                                    "0px 0px 50px 0px rgb(82 63 105 / 15%)",
                            }}
                        >
                            <Stack
                                divider={
                                    <Divider
                                        flexItem
                                        orientation="horizontal"
                                    />
                                }
                            >
                                <Button
                                    sx={{
                                        color: "#333",
                                        width: "100%",
                                    }}
                                    onClick={() => {
                                        setUse(2);
                                        setAnchorEl(null);
                                    }}
                                >
                                    <Typography variant="caption">
                                        All Coupon
                                    </Typography>
                                </Button>
                                <Button
                                    sx={{
                                        color: "#333",
                                        width: "100%",
                                    }}
                                    onClick={() => {
                                        setUse(1);
                                        setAnchorEl(null);
                                    }}
                                >
                                    <Typography variant="caption">
                                        Used coupon
                                    </Typography>
                                </Button>
                                <Button
                                    sx={{
                                        color: "#333",
                                        width: "100%",
                                    }}
                                    onClick={() => {
                                        setUse(0);
                                        setAnchorEl(null);
                                    }}
                                >
                                    <Typography variant="caption">
                                        Unuse coupon
                                    </Typography>
                                </Button>
                            </Stack>
                        </Popover>
                        {/* <IconButton onClick={() => setTabIndex(6)}>
                            <FileDownload sx={{ color: "#2152ff" }} />
                        </IconButton> */}
                        <ExportCoupon />
                    </Stack>
                </MkToolbar>
                <Box
                    sx={{
                        marginBottom: "20px",
                        display: campaignInfo.finish === 1 ? "none" : "block",
                    }}
                >
                    <Stack direction="row" gap={2}>
                        <InputFormComponent
                            placeholder="Enter Invoice Id"
                            label=""
                            name="invoice_id"
                            value={invoiceID}
                            onChange={(e) => {
                                setInvoiceID(e.target.value);
                            }}
                            style={{ marginBottom: 0 }}
                        />
                        <InputFormComponent
                            type="number"
                            placeholder="Enter Spending Amount"
                            label=""
                            name="spending_amount"
                            value={spendingAmount}
                            onChange={(e) => {
                                setSpendingAmount(e.target.value);
                            }}
                            inputProps={{ min: 0 }}
                            style={{ marginBottom: 0 }}
                        />
                        <MkButton
                            mkcolor={`linear-gradient(310deg, ${theme.palette.gradientDark.main}, ${theme.palette.gradientDark.light})`}
                            size="small"
                            onClick={handleAdd}
                        >
                            Add
                        </MkButton>
                    </Stack>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "10%" }}>
                                    <Typography variant="subtitle2">
                                        Coupon Code
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "10%" }}>
                                    <Typography variant="subtitle2">
                                        Invoice ID
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "10%" }}>
                                    <Typography variant="subtitle2">
                                        Consumer Name
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "10%" }}>
                                    <Typography variant="subtitle2">
                                        Consumer Phone
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{ textAlign: "right", width: "10%" }}
                                >
                                    <Typography variant="subtitle2">
                                        Spending Amount
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{ textAlign: "right", width: "10%" }}
                                >
                                    <Typography variant="subtitle2">
                                        Winning Amount
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coupon_list?.map((item, index) => {
                                return (
                                    <CouponTableItem
                                        key={index}
                                        item={item}
                                        user={user}
                                    />
                                );
                            })}
                        </TableBody>
                        <TableFooterPagination
                            rowsPerPageOptions={[10, 20]}
                            tableList={coupon_pagination?.total}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default CouponTable;
