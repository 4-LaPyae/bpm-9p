import {
    Box,
    Divider,
    IconButton,
    Paper,
    Popover,
    Stack,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    addSelectedBook,
    resetReturnStatus,
} from "../../features/invoices/invoicesSlice";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import SimpleInput from "../../app/components/SimpleInput";
import { formatMoney } from "../../app/helper/formatMoney";
import UndoIcon from "@mui/icons-material/Undo";
import ReturnPopOver from "./ReturnPopOver";
import ReplayIcon from "@mui/icons-material/Replay";
import MenuIcon from "@mui/icons-material/Menu";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function SaleBookTableItem({ item }) {
    const dispatch = useDispatch();
    const { selectedBooks, returnQty, returnStatus } = useSelector(
        (state) => state.InvoicesSlice
    );

    const [qty, setQty] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [editQty, setEditQty] = useState(false);
    const [editDis, setEditDis] = useState(false);
    const [focus, setFocus] = useState(false);
    const [popOver, setPopOver] = useState(false);
    const handleRemove = (id) => {
        dispatch(
            addSelectedBook(selectedBooks.filter((i) => i._id !== id))
        );
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const [isDamage, setIsDamage] = useState(false);
    const handleReturn = () => {
        setPopOver(true);
        handleClose();
        dispatch(resetReturnStatus());
        setIsDamage(false);
    };
    const handleDanger = () => {
        setPopOver(true);
        handleClose();
        dispatch(resetReturnStatus());
        setIsDamage(true);
    };
    useEffect(() => {
        if (editQty || editDis) {
            setFocus(true);
        } else {
            setFocus(false);
        }
    }, [editQty, editDis]);

    const handleIncrementQty = (item, val) => {
        const books = selectedBooks.map((i) => {
            console.log(i);
            console.log(item);
            if (i._id === item._id) {
                return {
                    ...i,
                    qty: Number(val),
                };
            } else {
                return i;
            }
        });
        dispatch(addSelectedBook(books));
    };

    const handleIncrementDiscount = (item, val) => {
        const books = selectedBooks.map((i) => {
            if (i._id === item._id) {
                return {
                    ...i,
                    discount: Number(val),
                };
            } else {
                return i;
            }
        });
        dispatch(addSelectedBook(books));
    };
    useEffect(() => {
        if (discount === "") {
            setDiscount(0);
        }
    }, []);
    return (
        <>
            <TableRow>
                <TableCell>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <HighlightOffIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleRemove(item._id)}
                        />
                        <Stack direction={"column"}>
                            <Typography
                                variant="caption"
                                fontSize={"18px"}
                                fontWeight={"bold"}
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {item?.book_title}
                            </Typography>
                            <Typography
                                variant="subtitl2"
                                mt={1}
                                fontSize={"12px"}
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                    lineHeight: 2,
                                }}
                            >
                                {item?.authors?.map((i, index) => {
                                    if (
                                        item?.authors?.length ===
                                        index + 1
                                    ) {
                                        return i.name;
                                    } else {
                                        return i.name + ",";
                                    }
                                })}
                            </Typography>
                        </Stack>
                    </Stack>
                </TableCell>
                <TableCell align="center">
                    <Typography variant="caption">
                        {formatMoney(item?.sale_price)}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Box
                        sx={{
                            width: "70px",
                            margin: "auto",
                        }}
                    >
                        <SimpleInput
                            type="number"
                            name="qty"
                            inputProps={{ min: 1 }}
                            placeholder="Qty"
                            value={item.qty ?? qty}
                            fullWidth
                            error={false}
                            onBlur={() => setEditQty(false)}
                            autoFocus={focus}
                            onChange={(e) => {
                                handleIncrementQty(
                                    item,
                                    e.target.value
                                );
                                setQty(e.target.value);
                            }}
                        />
                    </Box>
                </TableCell>
                <TableCell align="right">
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{
                            display: editDis ? "none" : "",
                        }}
                    >
                        <Typography
                            variant="caption"
                            onClick={() => setEditDis(true)}
                        >
                            {formatMoney(discount ?? item.discount)}
                        </Typography>
                    </Stack>
                    <Box
                        sx={{
                            width: "70px",
                            margin: "auto",
                            display: editDis ? "" : "none",
                        }}
                    >
                        <SimpleInput
                            name="discount"
                            placeholder="Discount"
                            value={discount ?? item.discount}
                            fullWidth
                            error={false}
                            onBlur={() => setEditDis(false)}
                            autoFocus={focus}
                            onChange={(e) => {
                                handleIncrementDiscount(
                                    item,
                                    e.target.value
                                );
                                setDiscount(e.target.value);
                            }}
                            onKeyPress={(event) => {
                                if (event.code === "Enter") {
                                    setEditDis(false);
                                    if (discount === "") {
                                        handleIncrementDiscount(
                                            item,
                                            0
                                        );
                                        setDiscount(0);
                                    }
                                }
                            }}
                        />
                    </Box>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="caption">
                        {formatMoney(
                            item?.sale_price * (qty ?? item.qty) -
                                (discount ?? item.discount)
                        )}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Box
                        sx={{ cursor: "pointer" }}
                        // onClick={() => handleUndo(item)}
                        onClick={handleClick}
                    >
                        <MenuIcon color="primary" />
                    </Box>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        // sx={{ background: "grey" }}
                    >
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                            p={2}
                            onClick={handleReturn}
                            sx={{ cursor: "pointer" }}
                        >
                            <ReplayIcon color="warning" />
                            <Typography fontWeight={"bold"}>
                                Return
                            </Typography>
                        </Stack>
                        <Divider />
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                            p={2}
                            onClick={handleDanger}
                            sx={{ cursor: "pointer" }}
                        >
                            <WarningAmberIcon color="error" />
                            <Typography fontWeight={"bold"}>
                                Damage
                            </Typography>
                        </Stack>
                    </Popover>
                </TableCell>
            </TableRow>
            <ReturnPopOver
                isDamage={isDamage}
                popOver={popOver}
                setPopOver={setPopOver}
                item={item}
            />
        </>
    );
}
