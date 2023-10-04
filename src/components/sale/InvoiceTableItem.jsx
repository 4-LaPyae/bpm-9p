import React, { useState } from "react";
import {
    Checkbox,
    ClickAwayListener,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { formatMoney } from "../../app/helper/formatMoney";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import {
    calculateInvoiceQty,
    calculateInvoiceTotalAmount,
    calculateInvoiceTotalDiscount,
    calculateInvoiceTotalNetAmount,
} from "../../app/helper/invoiceCalculation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSelectedInvoices } from "../../features/invoices/invoicesSlice";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function InvoiceTableItem({ item }) {
    const dispatch = useDispatch();

    const { selectedInvoices, tax, dis, resellerDiscount } =
        useSelector((state) => state.InvoicesSlice);
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const handleChange = (item) => {
        const exists = selectedInvoices.findIndex(
            (i) => i._id === item._id
        );
        if (exists > -1) {
            dispatch(
                addSelectedInvoices(
                    selectedInvoices.filter((i) => i._id !== item._id)
                )
            );
        } else {
            dispatch(
                addSelectedInvoices([...selectedInvoices, item])
            );
        }
    };

    const handleCheck = (item) => {
        const exists = selectedInvoices.findIndex(
            (i) => i._id === item._id
        );
        if (exists > -1) {
            return true;
        } else {
            return false;
        }
    };
    console.log(item);
    return (
        <TableRow>
            <TableCell align="center">
                <Checkbox
                    checked={handleCheck(item)}
                    onChange={() => handleChange(item)}
                    inputProps={{ "aria-label": "controlled" }}
                />
            </TableCell>
            <TableCell
                align="center"
                onClick={handleTooltipOpen}
                sx={{ cursor: "pointer" }}
            >
                {item.completedInvoice ? (
                    <ClickAwayListener
                        onClickAway={handleTooltipClose}
                    >
                        <div>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={`${
                                    item.completedInvoice?.user.name
                                } confirm Invoice at ${new Date(
                                    item.completedInvoice?.completedTime
                                ).toLocaleString("en-GB", {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                    hour12: true,
                                })}`}
                            >
                                <Stack direction={"column"}>
                                    <Typography
                                        variant="caption"
                                        onClick={handleTooltipOpen}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        {item?.invoice_code}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        onClick={handleTooltipOpen}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <CalendarMonthIcon />
                                        {format(
                                            new Date(
                                                item?.created_at
                                            ),
                                            "yyyy-MM-dd"
                                        )}
                                    </Typography>
                                </Stack>
                            </Tooltip>
                        </div>
                    </ClickAwayListener>
                ) : (
                    <Stack direction={"column"} spacing={2}>
                        <Typography
                            variant="caption"
                            onClick={handleTooltipOpen}
                            sx={{ cursor: "pointer" }}
                            textAlign={"left"}
                        >
                            {item?.invoice_code}
                        </Typography>
                        <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            // justifyContent={"center"}
                        >
                            <CalendarMonthIcon color="success" />
                            <Typography
                                variant="caption"
                                onClick={handleTooltipOpen}
                                sx={{ cursor: "pointer" }}
                            >
                                {format(
                                    new Date(item?.created_at),
                                    "yyyy-MM-dd"
                                )}
                            </Typography>
                        </Stack>
                    </Stack>
                )}
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.user?.name ?? "N/A"}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.customer?.name}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.sale_book ? calculateInvoiceQty(item) : 0}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.sale_book != null
                        ? formatMoney(
                              calculateInvoiceTotalAmount(item)
                          )
                        : 0}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.tracking_code ?? "N/A"}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {formatMoney(item?.courier?.charges)}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {formatMoney(item?.delivery_charges)}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.courier?.name}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.sale_book != null
                        ? formatMoney(
                              Number(
                                  calculateInvoiceTotalDiscount(item)
                              ) + Number(item.normal_discount)
                          )
                        : formatMoney(
                              0 + Number(item.normal_discount)
                          )}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.delivery_date}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {formatMoney(
                        Number(calculateInvoiceTotalNetAmount(item)) +
                            Number(item.commercial_tax) -
                            Number(item.reseller_discount)
                    )}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Link to={`INVOICE-${item._id}`}>
                    <EditIcon
                        fontSize="small"
                        sx={{ cursor: "pointer", color: "#2152ff" }}
                    />
                </Link>
            </TableCell>
        </TableRow>
    );
}
