import {
    Avatar,
    Box,
    Paper,
    Stack,
    TableContainer,
    TableHead,
    Typography,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Divider,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ComponenttoPrintTableBody from "./ComponenttoPrintTableBody";
import { formatMoney } from "../../../app/helper/formatMoney";
import {
    calculateInvoiceQty,
    calculateInvoiceTotalAmount,
    calculateInvoiceTotalDiscount,
    calculateInvoiceTotalNetAmount,
    dateFormat,
} from "../../../app/helper/invoiceCalculation";
import PhoneIcon from "@mui/icons-material/Phone";
import { imageApi } from "../../../app/hooks";
import "./printer.css";
const ComponenttoPrintData = ({ item }) => {
    const { user, publisher } = useSelector(
        (state) => state.loginInfo
    );
    const { companyDetail } = useSelector(
        (state) => state.companyDetail
    );
    const { setting } = useSelector((state) => state.SettingSlice);
    console.log(item);
    return (
        <>
            <Box
                sx={
                    setting?.printer_type === 0
                        ? {
                              padding: "35px",
                              height: "100%",
                          }
                        : setting?.printer_type === 1
                        ? {
                              padding: "25px",
                              height: "100%",
                          }
                        : {
                              padding: "5px",
                              height: "100%",
                          }
                }
            >
                <Box
                    sx={
                        setting?.printer_type === 0
                            ? { padding: "5px", height: "120px" }
                            : setting?.printer_type === 1
                            ? { padding: "5px", height: "80px" }
                            : { padding: "5px", height: "100px" }
                    }
                >
                    {setting?.printer_type === 3 ? (
                        <>
                            <Box width={"100%"}>
                                {setting.name ||
                                setting.publisher_logo ||
                                setting.address ? (
                                    <Stack
                                        direction={"row"}
                                        spacing={1}
                                        alignItems={"center"}
                                    >
                                        {setting.publisher_logo ? (
                                            <Avatar
                                                alt="logo"
                                                src={`${imageApi}${companyDetail?.publisher_logo}`}
                                                sx={
                                                    setting.printer_type ===
                                                    0
                                                        ? {
                                                              width: "100px",
                                                              height: "100px",
                                                          }
                                                        : setting.printer_type ===
                                                          1
                                                        ? {
                                                              width: "50px",
                                                              height: "50px",
                                                          }
                                                        : {
                                                              width: "50px",
                                                              height: "50px",
                                                          }
                                                }
                                            ></Avatar>
                                        ) : (
                                            <></>
                                        )}

                                        <Box>
                                            {setting.name ? (
                                                <Typography
                                                    fontWeight={
                                                        "bold"
                                                    }
                                                    // fontSize={"16px"}
                                                    fontSize={
                                                        setting.printer_type ===
                                                        0
                                                            ? "20px"
                                                            : setting.printer_type ===
                                                              1
                                                            ? "16px"
                                                            : "16px"
                                                    }
                                                    color={"#000000"}
                                                >
                                                    {
                                                        companyDetail?.name
                                                    }
                                                </Typography>
                                            ) : (
                                                <></>
                                            )}

                                            {setting.address ? (
                                                <Typography
                                                    fontWeight={
                                                        "bold"
                                                    }
                                                    color={"#000000"}
                                                    // fontSize={"16px"}
                                                    fontSize={
                                                        setting?.printer_type ===
                                                        0
                                                            ? "16px"
                                                            : setting?.printer_type ===
                                                              1
                                                            ? ""
                                                            : ""
                                                    }
                                                >
                                                    {
                                                        companyDetail?.phone
                                                    }
                                                </Typography>
                                            ) : (
                                                <></>
                                            )}

                                            {setting.address ? (
                                                <Typography
                                                    // fontSize={"10px"}
                                                    fontSize={
                                                        setting.printer_type ===
                                                        0
                                                            ? "14px"
                                                            : setting.printer_type ===
                                                              1
                                                            ? "10px"
                                                            : "10px"
                                                    }
                                                    color={"#000000"}
                                                >
                                                    {
                                                        companyDetail?.address
                                                    }
                                                </Typography>
                                            ) : (
                                                <></>
                                            )}
                                        </Box>
                                    </Stack>
                                ) : (
                                    <></>
                                )}
                            </Box>
                            <Box width={"100%"} sx={{ marginTop: 2 }}>
                                <Box>
                                    <Typography
                                        // fontSize={"12px"}
                                        fontSize={
                                            setting.printer_type === 0
                                                ? "14px"
                                                : setting.printer_type ===
                                                  1
                                                ? "12px"
                                                : "12px"
                                        }
                                        color={"#000000"}
                                    >
                                        Invoice:{" "}
                                        {item.value.invoice_code}
                                    </Typography>
                                    <Typography
                                        // fontSize={"12px"}
                                        fontSize={
                                            setting.printer_type === 0
                                                ? "14px"
                                                : setting.printer_type ===
                                                  1
                                                ? "12px"
                                                : "12px"
                                        }
                                        color={"#000000"}
                                    >
                                        Date:{" "}
                                        {item.value.created_at.substring(
                                            0,
                                            10
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box width={"100%"}>
                                <Typography
                                    color={"#000000"}
                                    fontSize={"10px"}
                                    fontWeight={"bold"}
                                    align="right"
                                >{`Page ${item.status} of ${item.value.invoice_code}`}</Typography>
                            </Box>
                            <Stack
                                justifyContent={"space-between"}
                                direction={"row"}
                                alignItems={"center"}
                            >
                                <Box width={"100%"}>
                                    {setting.name ||
                                    setting.publisher_logo ||
                                    setting.address ? (
                                        <Stack
                                            direction={"row"}
                                            spacing={1}
                                            alignItems={"center"}
                                        >
                                            {setting.publisher_logo ? (
                                                <Avatar
                                                    alt="logo"
                                                    src={`${imageApi}${companyDetail?.publisher_logo}`}
                                                    sx={
                                                        setting.printer_type ===
                                                        0
                                                            ? {
                                                                  width: "100px",
                                                                  height: "100px",
                                                              }
                                                            : setting.printer_type ===
                                                              1
                                                            ? {
                                                                  width: "50px",
                                                                  height: "50px",
                                                              }
                                                            : {}
                                                    }
                                                ></Avatar>
                                            ) : (
                                                <></>
                                            )}

                                            <Box>
                                                {setting.name ? (
                                                    <Typography
                                                        fontWeight={
                                                            "bold"
                                                        }
                                                        // fontSize={"16px"}
                                                        fontSize={
                                                            setting.printer_type ===
                                                            0
                                                                ? "20px"
                                                                : setting.printer_type ===
                                                                  1
                                                                ? "16px"
                                                                : ""
                                                        }
                                                        color={
                                                            "#000000"
                                                        }
                                                    >
                                                        {
                                                            companyDetail?.name
                                                        }
                                                    </Typography>
                                                ) : (
                                                    <></>
                                                )}

                                                {setting.address ? (
                                                    <Typography
                                                        fontWeight={
                                                            "bold"
                                                        }
                                                        color={
                                                            "#000000"
                                                        }
                                                        // fontSize={"16px"}
                                                        fontSize={
                                                            setting?.printer_type ===
                                                            0
                                                                ? "16px"
                                                                : setting?.printer_type ===
                                                                  1
                                                                ? ""
                                                                : ""
                                                        }
                                                    >
                                                        {
                                                            companyDetail?.phone
                                                        }
                                                    </Typography>
                                                ) : (
                                                    <></>
                                                )}

                                                {setting.address ? (
                                                    <Typography
                                                        // fontSize={"10px"}
                                                        fontSize={
                                                            setting.printer_type ===
                                                            0
                                                                ? "14px"
                                                                : setting.printer_type ===
                                                                  1
                                                                ? "10px"
                                                                : ""
                                                        }
                                                        color={
                                                            "#000000"
                                                        }
                                                    >
                                                        {
                                                            companyDetail?.address
                                                        }
                                                    </Typography>
                                                ) : (
                                                    <></>
                                                )}
                                            </Box>
                                        </Stack>
                                    ) : (
                                        <></>
                                    )}
                                </Box>
                                <Box width={"100%"}>
                                    <Stack
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <Box>
                                            <Typography
                                                // fontSize={"12px"}
                                                fontSize={
                                                    setting.printer_type ===
                                                    0
                                                        ? "14px"
                                                        : setting.printer_type ===
                                                          1
                                                        ? "12px"
                                                        : ""
                                                }
                                                color={"#000000"}
                                            >
                                                Invoice:{" "}
                                                {
                                                    item.value
                                                        .invoice_code
                                                }
                                            </Typography>
                                            <Typography
                                                // fontSize={"12px"}
                                                fontSize={
                                                    setting.printer_type ===
                                                    0
                                                        ? "14px"
                                                        : setting.printer_type ===
                                                          1
                                                        ? "12px"
                                                        : ""
                                                }
                                                color={"#000000"}
                                            >
                                                Date:{" "}
                                                {dateFormat(
                                                    item.value
                                                        .created_at
                                                )}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Stack>
                        </>
                    )}
                </Box>
                <Box
                    sx={
                        setting?.printer_type === 3
                            ? { marginTop: "30px", padding: "10px" }
                            : { marginTop: "10px", padding: "10px" }
                    }
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                    >
                        <Box>
                            <Typography
                                fontWeight={"bold"}
                                // fontSize={"20px"}
                                fontSize={
                                    setting.printer_type === 0
                                        ? "20px"
                                        : setting.printer_type === 1
                                        ? "16px"
                                        : ""
                                }
                                color={"#000000"}
                            >
                                {item.value.customer.name}
                            </Typography>
                            <Typography
                                // fontSize={"12px"}
                                fontSize={
                                    setting.printer_type === 0
                                        ? "14px"
                                        : setting.printer_type === 1
                                        ? "12px"
                                        : "12px"
                                }
                                color={"#000000"}
                            >
                                {item.value.customer.address},
                                {item.value.customer.township.name},
                                {item.value.customer.city.name}
                                {/* {item.customer.division.name} */}
                            </Typography>
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <PhoneIcon
                                    // fontSize={"12px"}
                                    fontSize={
                                        setting.printer_type === 0
                                            ? "14px"
                                            : setting.printer_type ===
                                              1
                                            ? "12px"
                                            : "12px"
                                    }
                                    color="primary"
                                    // sx={{ background: "#000000" }}
                                />{" "}
                                <Typography
                                    // fontSize={"12px"}
                                    fontSize={
                                        setting.printer_type === 0
                                            ? "14px"
                                            : setting.printer_type ===
                                              1
                                            ? "12px"
                                            : "12px"
                                    }
                                    color={"#000000"}
                                >
                                    :
                                </Typography>
                                <Typography
                                    // fontSize={"12px"}
                                    fontSize={
                                        setting.printer_type === 0
                                            ? "14px"
                                            : setting.printer_type ===
                                              1
                                            ? "12px"
                                            : ""
                                    }
                                    color={"#000000"}
                                >
                                    {item.value.customer.phone}
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
                {setting?.printer_type === 3 ? (
                    <>
                        {item?.value.sale_book === null ? (
                            <></>
                        ) : (
                            <Box
                                sx={{ padding: "0 10px" }}
                                marginTop={"10px"}
                            >
                                <Stack
                                    direction={"row"}
                                    justifyContent={"space-evenly"}
                                >
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                        fontSize={"12px"}
                                    >
                                        Qty
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        color={"#000000"}
                                        // fontWeight={"bold"}
                                        fontSize={"12px"}
                                    >
                                        Ks
                                    </Typography>
                                </Stack>
                                {item?.value.sale_book?.books?.map(
                                    (i) => {
                                        return (
                                            <>
                                                <Stack
                                                    direction={"row"}
                                                    spacing={2}
                                                    margin={"5px 0"}
                                                >
                                                    <Box
                                                        width={"10%"}
                                                    >
                                                        <Typography
                                                            color={
                                                                "#000000"
                                                            }
                                                            fontSize={
                                                                "10px"
                                                            }
                                                            align="right"
                                                        >
                                                            {i.qty}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        width={"70%"}
                                                    >
                                                        {i.qty > 1 ? (
                                                            <Stack>
                                                                <Typography
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontSize={
                                                                        "10px"
                                                                    }
                                                                >
                                                                    {
                                                                        i.book_title
                                                                    }
                                                                    @
                                                                    {
                                                                        i.sale_price
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontSize={
                                                                        "10px"
                                                                    }
                                                                >
                                                                    {i?.authors.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => {
                                                                            if (
                                                                                i
                                                                                    ?.authors
                                                                                    ?.length ===
                                                                                index +
                                                                                    1
                                                                            ) {
                                                                                return item.name;
                                                                            } else {
                                                                                return (
                                                                                    item.name +
                                                                                    ","
                                                                                );
                                                                            }
                                                                        }
                                                                    )}
                                                                </Typography>
                                                            </Stack>
                                                        ) : (
                                                            <Stack>
                                                                <Typography
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontSize={
                                                                        "10px"
                                                                    }
                                                                >
                                                                    {
                                                                        i.book_title
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontSize={
                                                                        "10px"
                                                                    }
                                                                >
                                                                    {i?.authors.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => {
                                                                            if (
                                                                                i
                                                                                    ?.authors
                                                                                    ?.length ===
                                                                                index +
                                                                                    1
                                                                            ) {
                                                                                return item.name;
                                                                            } else {
                                                                                return (
                                                                                    item.name +
                                                                                    ","
                                                                                );
                                                                            }
                                                                        }
                                                                    )}
                                                                </Typography>
                                                            </Stack>
                                                        )}
                                                    </Box>
                                                    <Box
                                                        width={"20%"}
                                                    >
                                                        <Typography
                                                            color={
                                                                "#000000"
                                                            }
                                                            fontSize={
                                                                "10px"
                                                            }
                                                            align="right"
                                                        >
                                                            {formatMoney(
                                                                i.total_amount
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </>
                                        );
                                    }
                                )}
                                <Divider
                                    sx={{
                                        borderBottom:
                                            "1px dotted #000000",
                                    }}
                                />
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    sx={{ marginTop: 1 }}
                                >
                                    <Box width={"10%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            align="right"
                                        >
                                            {item?.value.sale_book !=
                                            null
                                                ? calculateInvoiceQty(
                                                      item.value
                                                  )
                                                : 0}
                                        </Typography>
                                    </Box>
                                    <Box width={"70%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            fontWeight={"bold"}
                                        >
                                            Sub Total :
                                        </Typography>
                                    </Box>
                                    <Box width={"20%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            align="right"
                                        >
                                            {formatMoney(
                                                item.value
                                                    .net_amount -
                                                    item.value
                                                        .delivery_charges
                                            )}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    sx={{ marginTop: 1 }}
                                >
                                    <Box width={"10%"}></Box>
                                    <Box width={"70%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            fontWeight={"bold"}
                                        >
                                            Deli Charges :
                                        </Typography>
                                    </Box>
                                    <Box width={"20%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            align="right"
                                        >
                                            {formatMoney(
                                                item.value
                                                    .delivery_charges
                                            )}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    sx={{ marginTop: 1 }}
                                >
                                    <Box width={"10%"}></Box>
                                    <Box width={"70%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            fontWeight={"bold"}
                                        >
                                            Discount :
                                        </Typography>
                                    </Box>
                                    <Box width={"20%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            align="right"
                                        >
                                            {item?.value.sale_book !=
                                            null
                                                ? formatMoney(
                                                      Number(
                                                          calculateInvoiceTotalDiscount(
                                                              item.value
                                                          )
                                                      ) +
                                                          item.value
                                                              .normal_discount
                                                  )
                                                : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    sx={{ marginTop: 1 }}
                                >
                                    <Box width={"10%"}></Box>
                                    <Box width={"70%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            fontWeight={"bold"}
                                        >
                                            Reseller Discount :
                                        </Typography>
                                    </Box>
                                    <Box width={"20%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            align="right"
                                        >
                                            {formatMoney(
                                                item.value
                                                    .reseller_discount
                                            )}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    sx={{ marginTop: 1 }}
                                >
                                    <Box width={"10%"}></Box>
                                    <Box width={"70%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            fontWeight={"bold"}
                                        >
                                            Commercial Tax :
                                        </Typography>
                                    </Box>
                                    <Box width={"20%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"10px"}
                                            align="right"
                                        >
                                            {formatMoney(
                                                item.value
                                                    .commercial_tax
                                            )}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Divider
                                    sx={{
                                        borderBottom:
                                            "1px dotted #000000",
                                    }}
                                />
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    sx={{ marginTop: 1 }}
                                >
                                    <Box width={"10%"}></Box>
                                    <Box width={"70%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"14px"}
                                            fontWeight={"bold"}
                                        >
                                            Total :
                                        </Typography>
                                    </Box>
                                    <Box width={"20%"}>
                                        <Typography
                                            color={"#000000"}
                                            fontSize={"14px"}
                                            align="right"
                                            fontWeight={"bold"}
                                        >
                                            {formatMoney(
                                                Number(
                                                    item.value
                                                        .net_amount
                                                ) -
                                                    Number(
                                                        item.value
                                                            .reseller_discount
                                                    ) +
                                                    Number(
                                                        item.value
                                                            .commercial_tax
                                                    )
                                            )}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        )}
                    </>
                ) : (
                    <>
                        {item?.value.sale_book === null ? (
                            <></>
                        ) : (
                            <>
                                <Box sx={{ padding: "0 10px" }}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        width={
                                                            setting?.printer_type ===
                                                            3
                                                                ? "50%"
                                                                : "70%"
                                                        }
                                                        sx={{
                                                            borderBottomColor:
                                                                "#000000",
                                                        }}
                                                    >
                                                        <Typography
                                                            // fontSize={"12px"}
                                                            fontSize={
                                                                setting.printer_type ===
                                                                0
                                                                    ? "14px"
                                                                    : setting.printer_type ===
                                                                      1
                                                                    ? "12px"
                                                                    : "10px"
                                                            }
                                                            color={
                                                                "#000000"
                                                            }
                                                            fontWeight={
                                                                "bold"
                                                            }
                                                        >
                                                            Description
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        // width={"20%"}
                                                        width={
                                                            setting?.printer_type ===
                                                            3
                                                                ? "10%"
                                                                : "10%"
                                                        }
                                                        align="center"
                                                        sx={{
                                                            borderBottomColor:
                                                                "#000000",
                                                        }}
                                                    >
                                                        <Typography
                                                            // fontSize={"12px"}
                                                            fontSize={
                                                                setting.printer_type ===
                                                                0
                                                                    ? "14px"
                                                                    : setting.printer_type ===
                                                                      1
                                                                    ? "12px"
                                                                    : "10px"
                                                            }
                                                            color={
                                                                "#000000"
                                                            }
                                                            fontWeight={
                                                                "bold"
                                                            }
                                                        >
                                                            {setting?.printer_type ===
                                                            3
                                                                ? "Qty"
                                                                : "Qty"}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        // width={"20%"}
                                                        width={
                                                            setting?.printer_type ===
                                                            3
                                                                ? "20%"
                                                                : "10%"
                                                        }
                                                        align="right"
                                                        sx={{
                                                            borderBottomColor:
                                                                "#000000",
                                                        }}
                                                    >
                                                        <Typography
                                                            // fontSize={"12px"}
                                                            fontSize={
                                                                setting.printer_type ===
                                                                0
                                                                    ? "14px"
                                                                    : setting.printer_type ===
                                                                      1
                                                                    ? "12px"
                                                                    : "10px"
                                                            }
                                                            color={
                                                                "#000000"
                                                            }
                                                            fontWeight={
                                                                "bold"
                                                            }
                                                        >
                                                            {setting?.printer_type ===
                                                            3
                                                                ? "Cost"
                                                                : "Cost"}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell
                                                        // width={"20%"}
                                                        width={
                                                            setting?.printer_type ===
                                                            3
                                                                ? "20%"
                                                                : "10%"
                                                        }
                                                        align="right"
                                                        sx={{
                                                            borderBottomColor:
                                                                "#000000",
                                                        }}
                                                    >
                                                        <Typography
                                                            // fontSize={"12px"}
                                                            fontSize={
                                                                setting.printer_type ===
                                                                0
                                                                    ? "14px"
                                                                    : setting.printer_type ===
                                                                      1
                                                                    ? "12px"
                                                                    : "10px"
                                                            }
                                                            color={
                                                                "#000000"
                                                            }
                                                            fontWeight={
                                                                "bold"
                                                            }
                                                        >
                                                            Total
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {item?.value.sale_book?.books?.map(
                                                    (i, index) => (
                                                        <ComponenttoPrintTableBody
                                                            item={i}
                                                            index={
                                                                index
                                                            }
                                                        />
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                        {item.isTotal ? (
                                            <Box
                                                sx={{
                                                    marginTop: "10px",
                                                    height: "200px",
                                                }}
                                            >
                                                <Stack spacing={1.5}>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                        >
                                                            <Stack
                                                                direction={
                                                                    "row"
                                                                }
                                                                justifyContent={
                                                                    "space-between"
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                    // background: "red",
                                                                }}
                                                            >
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Subtotal
                                                                    :
                                                                </Typography>
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    sx={
                                                                        setting?.printer_type ===
                                                                        3
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "5%",
                                                                              }
                                                                            : setting?.printer_type ===
                                                                              0
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "2%",
                                                                              }
                                                                            : {
                                                                                  paddingRight:
                                                                                      "3%",
                                                                              }
                                                                    }
                                                                >
                                                                    {formatMoney(
                                                                        item
                                                                            .value
                                                                            .net_amount -
                                                                            item
                                                                                .value
                                                                                .delivery_charges
                                                                    )}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                            sx={{
                                                                borderTop:
                                                                    "1px solid #000000",
                                                            }}
                                                        ></Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                        >
                                                            <Stack
                                                                direction={
                                                                    "row"
                                                                }
                                                                justifyContent={
                                                                    "space-between"
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Deli
                                                                    Charges
                                                                </Typography>
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    sx={
                                                                        setting?.printer_type ===
                                                                        3
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "5%",
                                                                              }
                                                                            : setting?.printer_type ===
                                                                              0
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "2%",
                                                                              }
                                                                            : {
                                                                                  paddingRight:
                                                                                      "3%",
                                                                              }
                                                                    }
                                                                >
                                                                    {formatMoney(
                                                                        item
                                                                            .value
                                                                            .delivery_charges
                                                                    )}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                            sx={{
                                                                borderTop:
                                                                    "1px solid #000000",
                                                            }}
                                                        ></Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                        >
                                                            <Stack
                                                                direction={
                                                                    "row"
                                                                }
                                                                justifyContent={
                                                                    "space-between"
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Discount
                                                                    :
                                                                </Typography>
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    sx={
                                                                        setting?.printer_type ===
                                                                        3
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "5%",
                                                                              }
                                                                            : setting?.printer_type ===
                                                                              0
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "2%",
                                                                              }
                                                                            : {
                                                                                  paddingRight:
                                                                                      "3%",
                                                                              }
                                                                    }
                                                                >
                                                                    {item
                                                                        ?.value
                                                                        .sale_book !=
                                                                    null
                                                                        ? formatMoney(
                                                                              calculateInvoiceTotalDiscount(
                                                                                  item.value
                                                                              ) +
                                                                                  Number(
                                                                                      item
                                                                                          .value
                                                                                          .normal_discount
                                                                                  )
                                                                          )
                                                                        : formatMoney(
                                                                              0 +
                                                                                  Number(
                                                                                      item
                                                                                          .value
                                                                                          .normal_discount
                                                                                  )
                                                                          )}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                            sx={{
                                                                borderTop:
                                                                    "1px solid #000000",
                                                            }}
                                                        ></Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                        >
                                                            <Stack
                                                                direction={
                                                                    "row"
                                                                }
                                                                justifyContent={
                                                                    "space-between"
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Commercial
                                                                    Tax
                                                                    :
                                                                </Typography>
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    sx={
                                                                        setting?.printer_type ===
                                                                        3
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "5%",
                                                                              }
                                                                            : setting?.printer_type ===
                                                                              0
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "2%",
                                                                              }
                                                                            : {
                                                                                  paddingRight:
                                                                                      "3%",
                                                                              }
                                                                    }
                                                                >
                                                                    {formatMoney(
                                                                        item
                                                                            .value
                                                                            .commercial_tax
                                                                    )}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                            sx={{
                                                                borderTop:
                                                                    "1px solid #000000",
                                                            }}
                                                        ></Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                        >
                                                            <Stack
                                                                direction={
                                                                    "row"
                                                                }
                                                                justifyContent={
                                                                    "space-between"
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Reseller
                                                                    Discount
                                                                    :
                                                                </Typography>
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    sx={
                                                                        setting?.printer_type ===
                                                                        3
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "5%",
                                                                              }
                                                                            : setting?.printer_type ===
                                                                              0
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "2%",
                                                                              }
                                                                            : {
                                                                                  paddingRight:
                                                                                      "3%",
                                                                              }
                                                                    }
                                                                >
                                                                    {formatMoney(
                                                                        item
                                                                            .value
                                                                            .reseller_discount
                                                                    )}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                            sx={{
                                                                borderTop:
                                                                    "1px solid #000000",
                                                            }}
                                                        ></Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                        >
                                                            <Stack
                                                                direction={
                                                                    "row"
                                                                }
                                                                justifyContent={
                                                                    "space-between"
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Total
                                                                </Typography>
                                                                <Typography
                                                                    // fontSize={"12px"}
                                                                    fontSize={
                                                                        setting.printer_type ===
                                                                        0
                                                                            ? "14px"
                                                                            : setting.printer_type ===
                                                                              1
                                                                            ? "12px"
                                                                            : "10px"
                                                                    }
                                                                    color={
                                                                        "#000000"
                                                                    }
                                                                    sx={
                                                                        setting?.printer_type ===
                                                                        3
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "5%",
                                                                              }
                                                                            : setting?.printer_type ===
                                                                              0
                                                                            ? {
                                                                                  paddingRight:
                                                                                      "2%",
                                                                              }
                                                                            : {
                                                                                  paddingRight:
                                                                                      "3%",
                                                                              }
                                                                    }
                                                                >
                                                                    {formatMoney(
                                                                        Number(
                                                                            item
                                                                                .value
                                                                                .net_amount
                                                                        ) +
                                                                            Number(
                                                                                item
                                                                                    .value
                                                                                    .commercial_tax
                                                                            ) -
                                                                            Number(
                                                                                item
                                                                                    .value
                                                                                    .reseller_discount
                                                                            )
                                                                    )}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={5.5}
                                                        ></Grid>
                                                        <Grid
                                                            item
                                                            xs={6.5}
                                                            sx={{
                                                                borderTop:
                                                                    "1px solid #000000",
                                                            }}
                                                        ></Grid>
                                                    </Grid>
                                                </Stack>
                                            </Box>
                                        ) : (
                                            <></>
                                        )}
                                    </TableContainer>
                                </Box>
                            </>
                        )}
                    </>
                )}
            </Box>
        </>
    );
};

export default ComponenttoPrintData;
