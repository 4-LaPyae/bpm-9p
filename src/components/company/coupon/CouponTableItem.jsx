import {
    Avatar,
    Box,
    Button,
    IconButton,
    Popover,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CopyAll, Edit, EditAttributes } from "@mui/icons-material";
import { onSelectCoupon } from "../../../features/company/CouponSlice";
import { edit_coupon } from "../../../features/company/CouponApi";
import { formatMoney } from "../../../app/helper/formatMoney";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function CouponTableItem({ item, user }) {
    const { campaignInfo } = useSelector((state) => state.campaignDetail);
    const [editMode, setEditMode] = useState(false);
    const [clickedInvoice, setClickedInvoice] = useState(false);
    const dispatch = useDispatch();
    const copy = (id) => {
        const el = document.createElement("input");
        el.value = `https://mmspin.com/${campaignInfo.api_id}/${id}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };
    const [editSpendingAmount, setEditSpendingAmount] = useState(
        item.spending_amount
    );
    const [editInvoice, setEditInvoice] = useState(item.invoice_id);

    const usedCoupon = item.promotion_id && item.consumer_id;

    const handleEdit = () => {
        const data = {
            admin_id: user.user.id,
            campaign_id: campaignInfo.id,
            invoice_id: editInvoice,
            spending_amount: Number(editSpendingAmount),
        };
        dispatch(edit_coupon({ data: data, id: item.id }));
    };

    const changeSpandingAmount = (e) => {
        handleEdit();
        setEditMode(false);
    };

    const changeInvoice = (e) => {
        handleEdit();
        setClickedInvoice(false);
    };

    return (
        <TableRow>
            <TableCell align="right">
                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "left",
                        color: usedCoupon ? "#ef1212" : "#0030d8",
                    }}
                >
                    {item.code}
                    <Tooltip title="Copy Link">
                        <IconButton
                            onClick={() => {
                                copy(item.code);
                            }}
                        >
                            <CopyAll
                                fontSize="small"
                                sx={{ color: "#2152ff" }}
                            />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </TableCell>
            <TableCell sx={{ cursor: "pointer" }}>
                {clickedInvoice ? (
                    <input
                        id="table-input"
                        onBlur={changeInvoice}
                        autoFocus
                        value={editInvoice}
                        onChange={(e) => setEditInvoice(e.target.value)}
                    />
                ) : (
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "left",
                        }}
                        onClick={() => setClickedInvoice(!usedCoupon)}
                    >
                        {item.invoice_id ?? "N/A"}
                    </Typography>
                )}
            </TableCell>
            <TableCell>
                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "left",
                    }}
                >
                    {item.consumer_name ?? "N/A"}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "left",
                    }}
                >
                    {item.consumer_phone ?? "N/A"}
                </Typography>
            </TableCell>
            <TableCell align="right" sx={{ cursor: "pointer" }}>
                {editMode ? (
                    <input
                        type="number"
                        id="table-input"
                        onBlur={changeSpandingAmount}
                        autoFocus
                        value={editSpendingAmount}
                        onChange={(e) => setEditSpendingAmount(e.target.value)}
                    />
                ) : (
                    <Typography
                        variant="caption"
                        onClick={() => setEditMode(!usedCoupon)}
                    >
                        {formatMoney(item.spending_amount)}
                    </Typography>
                )}
            </TableCell>
            <TableCell align="right">
                {formatMoney(item.winning_amount)}
            </TableCell>
        </TableRow>
    );
}

export default CouponTableItem;
