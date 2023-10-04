import {
    Box,
    Checkbox,
    Grid,
    ListItemText,
    MenuItem,
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
import SaleBookTableItem from "./SaleBookTableItem";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import { useDispatch } from "react-redux";
import { searchBook } from "../../features/invoices/invoicesApi";
import { useSelector } from "react-redux";
import { useDebounceCallback } from "../../app/helper/delay";
import {
    addSelectedBook,
    clearSearchBook,
    storeDis,
    storeResellerDiscount,
    storeTax,
} from "../../features/invoices/invoicesSlice";
import MkButton from "../../app/assets/theme/MkButton";
import { formatMoney } from "../../app/helper/formatMoney";
import SimpleInput from "../../app/components/SimpleInput";

export default function SaleBookTable({ subtotal, deliCharge }) {
    const [search, setSearch] = useState(null);
    const dispatch = useDispatch();
    const debounceCallback = useDebounceCallback(2000);
    const { searchBooks, selectedBooks } = useSelector(
        (state) => state.InvoicesSlice
    );
    const { companyDetail, loading } = useSelector(
        (state) => state.companyDetail
    );
    const { setting, commercial } = useSelector(
        (state) => state.SettingSlice
    );
    const { address } = useSelector((state) => state.CustomerSlice);
    const [lodaing, setLoading] = useState(false);
    const [focus, setFocus] = useState(false);
    const [tax, setTax] = useState("");
    const [editTax, setEditTax] = useState(false);
    const [resDis, setResDis] = useState("");
    const [editResDis, setEditResDis] = useState(false);
    const [dis, setDis] = useState(0);
    const [editDis, setEditDis] = useState(false);
    const [qty, setQty] = useState("");

    const handleSelectedBook = (item) => {
        const exists = selectedBooks.findIndex(
            (i) => i._id === item._id
        );
        if (exists > -1) {
            dispatch(
                addSelectedBook(
                    selectedBooks.filter((i) => i._id !== item._id)
                )
            );
        } else {
            dispatch(
                addSelectedBook([
                    ...selectedBooks,
                    { ...item, qty: 1, discount: 0, balance_qty: 1 },
                ])
            );
        }
    };

    const determineMinusOrPlus = (val) => {
        if (val == 0) {
            return "";
        }
        if (val > 0) {
            return "+";
        }

        if (val < 0) {
            return "";
        }
    };
    useEffect(() => {
        setTax(companyDetail?.commercial_tax);
        setResDis(address?.reseller?.discount_amount);
        if (dis === "") {
            setDis(0);
        }
    }, [companyDetail, address]);
    useEffect(() => {
        dispatch(storeTax({ tax: (Number(tax) / 100) * subtotal }));
        dispatch(
            storeResellerDiscount({
                resDiscount: (Number(resDis) / 100) * subtotal,
            })
        );
        dispatch(storeDis({ discount: dis }));
    }, [tax, resDis, dis, subtotal]);
    useEffect(() => {
        if (editTax) {
            setFocus(true);
        } else {
            setFocus(false);
        }
    }, [editTax]);
    const getPersentage = (num1, total) => {
        return (num1 / 100) * total;
    };
    console.log(companyDetail?.commercial_tax);
    return (
        <Box
            sx={{
                mt: 2.4,
                width: "100%",
                paddingX: 1,
            }}
        >
            <Box sx={{ position: "relative" }}>
                <InputFormComponent
                    value={search ?? ""}
                    onChange={(e) => {
                        const v = e.currentTarget.value;
                        if (v.trim() !== "") {
                            setLoading(true);
                            setSearch(v);
                            debounceCallback(() =>
                                dispatch(
                                    searchBook({
                                        search: v,
                                    })
                                )
                                    .unwrap()
                                    .then((result) => {
                                        setLoading(false);
                                    })
                            );
                        } else {
                            setSearch(null);
                            dispatch(
                                searchBook({
                                    search: "",
                                })
                            );
                        }
                    }}
                    label=""
                    name="search"
                    placeholder="Search Book"
                />
                <Box
                    sx={{
                        width: "100%",
                        height: "400px",
                        position: "absolute",
                        overflow: "hidden",
                        overflowY: "auto",
                        zIndex: 1500,
                        top: 53,
                        background: "#808080",
                        borderRadius: "8px 8px 0px 0px",
                        padding: 2,
                        display: search != null ? "flex" : "none",
                        flexDirection: "column",
                        alignItems:
                            lodaing || searchBooks.length === 0
                                ? "center"
                                : "flex-end",
                    }}
                >
                    <MkButton
                        mkcolor={`linear-gradient(310deg, #2152ff, #02c6f3)`}
                        size="lg"
                        onClick={() => setSearch(null)}
                        sx={{
                            display:
                                lodaing || searchBooks.length === 0
                                    ? "none"
                                    : "",
                        }}
                    >
                        Done
                    </MkButton>
                    {lodaing ? (
                        <Stack
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Typography
                                variant="h1"
                                fontWeight={"bold"}
                                fontSize={"18px"}
                                mt={18}
                                sx={{ color: "#fff" }}
                            >
                                Searching...
                            </Typography>
                        </Stack>
                    ) : searchBooks.length > 0 ? (
                        searchBooks.map((item, index) => {
                            return (
                                <Box
                                    key={item._id}
                                    sx={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                        background: "#fff",
                                        padding: 1,
                                        borderRadius: 5,
                                        cursor: "pointer",
                                        my: 1,
                                    }}
                                    onClick={() =>
                                        handleSelectedBook(item)
                                    }
                                >
                                    <Stack
                                        width={"100%"}
                                        direction={"row"}
                                        justifyContent={
                                            "space-between"
                                        }
                                    >
                                        <Stack
                                            direction={"row"}
                                            justifyContent={
                                                "space-between"
                                            }
                                            alignItems={"center"}
                                        >
                                            <Checkbox
                                                checked={
                                                    selectedBooks.findIndex(
                                                        (i) =>
                                                            i._id ===
                                                            item._id
                                                    ) > -1
                                                }
                                            />
                                            <Stack
                                                direction={"column"}
                                            >
                                                <Typography
                                                    color={"white"}
                                                    fontSize={"15px"}
                                                    fontWeight={
                                                        "bold"
                                                    }
                                                >
                                                    {item?.book_title}{" "}
                                                    -
                                                    {
                                                        item?.edition
                                                            .name
                                                    }{" "}
                                                    (
                                                    {`${item?.release} ကြိမ်`}
                                                    )
                                                </Typography>
                                                <Stack
                                                    direction={"row"}
                                                    alignItems={
                                                        "center"
                                                    }
                                                    width={"100%"}
                                                >
                                                    <Typography
                                                        variant="subtitl2"
                                                        mt={1}
                                                        fontSize={
                                                            "12px"
                                                        }
                                                        sx={{
                                                            overflow:
                                                                "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                            display:
                                                                "-webkit-box",
                                                            WebkitLineClamp:
                                                                "1",
                                                            WebkitBoxOrient:
                                                                "vertical",
                                                        }}
                                                    >
                                                        {item?.authors.map(
                                                            (
                                                                i,
                                                                index
                                                            ) => {
                                                                if (
                                                                    item
                                                                        ?.authors
                                                                        ?.length ===
                                                                    index +
                                                                        1
                                                                ) {
                                                                    return i.name;
                                                                } else {
                                                                    return (
                                                                        i.name +
                                                                        ","
                                                                    );
                                                                }
                                                            }
                                                        )}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        {/* <Box width={"50%"}>
                                            <SimpleInput
                                                type="number"
                                                name="qty"
                                                inputProps={{
                                                    min: 1,
                                                }}
                                                placeholder="Qty"
                                                value={qty}
                                                fullWidth
                                                autoFocus={focus}
                                                onChange={(e) => {
                                                    setQty(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Box> */}
                                    </Stack>
                                </Box>
                            );
                        })
                    ) : (
                        <Stack
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Typography
                                variant="h1"
                                fontWeight={"bold"}
                                fontSize={"18px"}
                                mt={18}
                                sx={{ color: "#fff" }}
                            >
                                Not Found
                            </Typography>
                        </Stack>
                    )}
                </Box>
            </Box>
            <TableContainer sx={{ maxHeight: 340 }}>
                <Table sx={{ position: "relative" }}>
                    <TableHead
                        sx={{
                            position: "sticky",
                            width: "100%",
                            top: 0,
                            background: "white",
                            zIndex: 1000,
                        }}
                    >
                        <TableRow>
                            <TableCell width={"30%"}>
                                <Typography
                                    fontWeight={"bold"}
                                    variant="subtitle3"
                                >
                                    Book ({selectedBooks.length})
                                </Typography>
                            </TableCell>
                            <TableCell align="center" width={"20%"}>
                                <Typography
                                    fontWeight={"bold"}
                                    variant="subtitle3"
                                >
                                    Sale Price
                                </Typography>
                            </TableCell>
                            <TableCell align="center" width={"10%"}>
                                <Typography
                                    fontWeight={"bold"}
                                    variant="subtitle3"
                                >
                                    Qty
                                </Typography>
                            </TableCell>
                            <TableCell align="center" width={"20%"}>
                                <Typography
                                    fontWeight={"bold"}
                                    variant="subtitle3"
                                >
                                    Discount
                                </Typography>
                            </TableCell>
                            <TableCell align="right" width={"10%"}>
                                <Typography
                                    fontWeight={"bold"}
                                    variant="subtitle3"
                                >
                                    Total
                                </Typography>
                            </TableCell>
                            <TableCell align="right" width={"10%"}>
                                <Typography
                                    fontWeight={"bold"}
                                    variant="subtitle3"
                                >
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedBooks.length > 0 ? (
                            selectedBooks?.map((item) => {
                                return (
                                    <SaleBookTableItem item={item} />
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    rowSpan={3}
                                    align="center"
                                >
                                    <Typography
                                        variant="h1"
                                        fontWeight={"bold"}
                                        fontSize={"15px"}
                                        sx={{ color: "#000" }}
                                    >
                                        There are no sale books added.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedBooks.length > 0 && (
                <Grid container justifyContent={"end"}>
                    <Grid
                        xs={6}
                        sx={{
                            borderTop:
                                "1px solid rgba(224, 224, 224, 1)",
                        }}
                    ></Grid>
                    <Grid
                        item
                        xs={6}
                        padding={2}
                        sx={{
                            borderTop:
                                "1px solid rgba(224, 224, 224, 1)",
                        }}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography
                                fontWeight={"bold"}
                                variant="subtitle2"
                            >
                                Subtotal
                            </Typography>
                            <Typography
                                fontWeight={"bold"}
                                variant="subtitle3"
                            >
                                {determineMinusOrPlus(subtotal)}{" "}
                                {formatMoney(subtotal)}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={6}></Grid>
                    <Grid
                        item
                        xs={6}
                        padding={2}
                        sx={{
                            borderTop:
                                "1px solid rgba(224, 224, 224, 1)",
                        }}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography
                                fontWeight={"bold"}
                                variant="subtitle2"
                            >
                                Discount
                            </Typography>
                            <Box>
                                <Box
                                    sx={{
                                        cursor: "pointer",
                                        display: editDis
                                            ? "none"
                                            : "",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle3"
                                        fontWeight={"bold"}
                                        onClick={() => {
                                            setEditDis(true);
                                        }}
                                    >
                                        {dis}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: "70px",
                                        margin: "auto",

                                        display: editDis
                                            ? ""
                                            : "none",
                                    }}
                                >
                                    <SimpleInput
                                        name="tax"
                                        placeholder="Tax"
                                        value={dis}
                                        fullWidth
                                        error={false}
                                        onBlur={() =>
                                            setEditDis(false)
                                        }
                                        autoFocus={focus}
                                        onChange={(e) => {
                                            // handleIncrementDiscount(
                                            //     item,
                                            //     e.target.value
                                            // );
                                            setDis(e.target.value);
                                        }}
                                        onKeyPress={(event) => {
                                            if (
                                                event.code === "Enter"
                                            ) {
                                                setEditDis(false);
                                                if (dis === "") {
                                                    // handleIncrementDiscount(item, 0);
                                                    setDis(0);
                                                }
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid xs={6}></Grid>
                    <Grid
                        item
                        xs={6}
                        padding={2}
                        sx={{
                            borderTop:
                                "1px solid rgba(224, 224, 224, 1)",
                        }}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography
                                fontWeight={"bold"}
                                variant="subtitle2"
                            >
                                Delivery Charges
                            </Typography>
                            <Typography
                                fontWeight={"bold"}
                                variant="subtitle3"
                            >
                                {determineMinusOrPlus(deliCharge)}{" "}
                                {formatMoney(deliCharge)}
                            </Typography>
                        </Stack>
                    </Grid>
                    {address?.reseller ? (
                        <>
                            <Grid xs={6}></Grid>
                            <Grid
                                item
                                xs={6}
                                padding={2}
                                sx={{
                                    borderTop:
                                        "1px solid rgba(224, 224, 224, 1)",
                                }}
                            >
                                <Stack
                                    direction={"row"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                >
                                    <Stack
                                        direction={"row"}
                                        spacing={1}
                                        alignItems={"center"}
                                    >
                                        <Typography
                                            fontWeight={"bold"}
                                            variant="subtitle2"
                                        >
                                            Reseller Discount
                                        </Typography>
                                        <Box>
                                            <Box
                                                sx={{
                                                    cursor: "pointer",
                                                    display:
                                                        editResDis
                                                            ? "none"
                                                            : "",
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle3"
                                                    fontWeight={
                                                        "bold"
                                                    }
                                                    onClick={() => {
                                                        setEditResDis(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    ( {resDis} % )
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: "70px",
                                                    margin: "auto",

                                                    display:
                                                        editResDis
                                                            ? ""
                                                            : "none",
                                                }}
                                            >
                                                <SimpleInput
                                                    name="tax"
                                                    placeholder="Tax"
                                                    value={resDis}
                                                    fullWidth
                                                    error={false}
                                                    onBlur={() =>
                                                        setEditResDis(
                                                            false
                                                        )
                                                    }
                                                    autoFocus={focus}
                                                    onChange={(e) => {
                                                        // handleIncrementDiscount(
                                                        //     item,
                                                        //     e.target.value
                                                        // );
                                                        setResDis(
                                                            e.target
                                                                .value
                                                        );
                                                    }}
                                                    onKeyPress={(
                                                        event
                                                    ) => {
                                                        if (
                                                            event.code ===
                                                            "Enter"
                                                        ) {
                                                            setEditResDis(
                                                                false
                                                            );
                                                            if (
                                                                resDis ===
                                                                ""
                                                            ) {
                                                                // handleIncrementDiscount(item, 0);
                                                                setResDis(
                                                                    0
                                                                );
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Stack>
                                    <Typography
                                        fontWeight={"bold"}
                                        variant="subtitle3"
                                    >
                                        -{" "}
                                        {subtotal *
                                            (Number(resDis) / 100)}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </>
                    ) : (
                        <></>
                    )}

                    <Grid xs={6}></Grid>
                    <Grid
                        item
                        xs={6}
                        padding={2}
                        sx={{
                            borderTop:
                                "1px solid rgba(224, 224, 224, 1)",
                        }}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Stack
                                direction={"row"}
                                spacing={1}
                                alignItems={"center"}
                            >
                                <Typography
                                    fontWeight={"bold"}
                                    variant="subtitle2"
                                >
                                    Commercial Tax
                                </Typography>
                                <Box>
                                    <Box
                                        sx={{
                                            cursor: "pointer",
                                            display: editTax
                                                ? "none"
                                                : "",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle3"
                                            fontWeight={"bold"}
                                            onClick={() => {
                                                setEditTax(true);
                                            }}
                                        >
                                            ( {tax} % )
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "70px",
                                            margin: "auto",

                                            display: editTax
                                                ? ""
                                                : "none",
                                        }}
                                    >
                                        <SimpleInput
                                            name="tax"
                                            placeholder="Tax"
                                            value={tax}
                                            fullWidth
                                            error={false}
                                            onBlur={() =>
                                                setEditTax(false)
                                            }
                                            autoFocus={focus}
                                            onChange={(e) => {
                                                // handleIncrementDiscount(
                                                //     item,
                                                //     e.target.value
                                                // );
                                                setTax(
                                                    e.target.value
                                                );
                                            }}
                                            onKeyPress={(event) => {
                                                if (
                                                    event.code ===
                                                    "Enter"
                                                ) {
                                                    setEditTax(false);
                                                    if (tax === "") {
                                                        // handleIncrementDiscount(item, 0);
                                                        setTax(0);
                                                    }
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Stack>
                            <Typography
                                fontWeight={"bold"}
                                variant="subtitle3"
                            >
                                + {subtotal * (tax / 100)}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={6}></Grid>
                    <Grid
                        item
                        xs={6}
                        padding={2}
                        sx={{
                            borderTop:
                                "1px solid rgba(224, 224, 224, 1)",
                            borderBottom:
                                "1px solid rgba(224, 224, 224, 1)",
                        }}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Typography
                                fontWeight={"bold"}
                                variant="subtitle2"
                            >
                                Total
                            </Typography>
                            <Typography
                                fontWeight={"bold"}
                                variant="subtitle3"
                            >
                                {determineMinusOrPlus(
                                    subtotal + deliCharge
                                )}{" "}
                                {address?.reseller ? (
                                    <>
                                        {formatMoney(
                                            Number(subtotal) +
                                                getPersentage(
                                                    tax,
                                                    subtotal
                                                ) +
                                                Number(deliCharge) -
                                                getPersentage(
                                                    Number(resDis),
                                                    subtotal
                                                ) -
                                                Number(dis)
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {formatMoney(
                                            Number(subtotal) +
                                                getPersentage(
                                                    tax,
                                                    subtotal
                                                ) +
                                                Number(deliCharge) -
                                                Number(dis)
                                        )}
                                    </>
                                )}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}
