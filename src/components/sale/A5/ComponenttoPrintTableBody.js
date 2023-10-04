import {
    Grid,
    Stack,
    TableCell,
    TableRow,
    Typography,
    Box,
    Divider,
} from "@mui/material";
import React from "react";
import { formatMoney } from "../../../app/helper/formatMoney";
import "./printer.css";
import { useSelector } from "react-redux";

const ComponenttoPrintTableBody = ({ item, index, pageBreak }) => {
    const { setting } = useSelector((state) => state.SettingSlice);
    return (
        <>
            {setting?.printer_type === 3 ? (
                <>
                    <TableRow>
                        <TableCell
                            width={"10%"}
                            align="right"
                            sx={{ border: 0 }}
                        >
                            <Typography
                                color={"#000000"}
                                fontSize={"10px"}
                            >
                                {item.qty}
                            </Typography>
                        </TableCell>
                        <TableCell width={"70%"} sx={{ border: 0 }}>
                            {item.qty > 1 ? (
                                <Typography
                                    color={"#000000"}
                                    fontSize={"10px"}
                                >
                                    {item.book_title} @
                                    {item.sale_price}
                                </Typography>
                            ) : (
                                <Typography
                                    color={"#000000"}
                                    fontSize={"10px"}
                                >
                                    {item.book_title}
                                </Typography>
                            )}
                        </TableCell>
                        <TableCell
                            width={"20%"}
                            align="right"
                            sx={{ border: 0 }}
                        >
                            <Typography
                                color={"#000000"}
                                fontSize={"10px"}
                            >
                                {formatMoney(item.total_amount)}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </>
            ) : (
                <TableRow>
                    <TableCell sx={{ borderBottomColor: "#000000" }}>
                        <Typography
                            fontSize={
                                setting.printer_type === 0
                                    ? "14px"
                                    : setting.printer_type === 1
                                    ? "12px"
                                    : "10px"
                            }
                            color={"#000000"}
                        >
                            {item.book_title}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottomColor: "#000000" }}>
                        <Typography
                            // fontSize={"12px"}
                            fontSize={
                                setting.printer_type === 0
                                    ? "14px"
                                    : setting.printer_type === 1
                                    ? "12px"
                                    : "10px"
                            }
                            color={"#000000"}
                            align="center"
                        >
                            {item.qty}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottomColor: "#000000" }}>
                        <Typography
                            // fontSize={"12px"}
                            fontSize={
                                setting.printer_type === 0
                                    ? "14px"
                                    : setting.printer_type === 1
                                    ? "12px"
                                    : "10px"
                            }
                            color={"#000000"}
                            align="right"
                        >
                            {formatMoney(item.sale_price)}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottomColor: "#000000" }}>
                        <Typography
                            // fontSize={"12px"}
                            fontSize={
                                setting.printer_type === 0
                                    ? "14px"
                                    : setting.printer_type === 1
                                    ? "12px"
                                    : "10px"
                            }
                            color={"#000000"}
                            align="right"
                        >
                            {formatMoney(item.total_amount)}
                        </Typography>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default ComponenttoPrintTableBody;
