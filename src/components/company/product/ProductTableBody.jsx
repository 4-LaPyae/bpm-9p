import {
    Box,
    Chip,
    Stack,
    TableCell,
    TableRow,
    Typography,
    List,
    ListItem,
    ListItemText,
    Popover,
    Avatar,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import MkButton from "../../../app/assets/theme/MkButton";
import { useDispatch, useSelector } from "react-redux";
import IconWrap from "../../../app/components/IconWrap";
import ProductUpdateDrawer from "./ProductUpdateDrawer";

import { format } from "date-fns";
import { formatMoney } from "../../../app/helper/formatMoney";
import { BookDelete } from "../../../features/book/BookApi";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAlert from "../../../app/components/AlertBox/DeleteAlert";
import { imageApi } from "../../../app/hooks";
import InventoryIcon from "@mui/icons-material/Inventory";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import copy from "copy-to-clipboard";
function ProductTableBody({ item }) {
    const { companyDetail } = useSelector(
        (state) => state.companyDetail
    );
    const { books } = useSelector((state) => state.BookSlice);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [toolTipOpen, setToolTipOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setToolTipOpen(false);
    };

    const handleTooltipOpen = () => {
        setToolTipOpen(true);
    };

    const [openAlert, setOpenAlert] = useState(false);

    const first_three_author = item?.authors.slice(0, 2).map((i) => {
        return (
            <Typography key={i.id} variant="subtitle">
                {i.name}{" "}
            </Typography>
        );
    });

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const copyContent = (num) => {
        copy(num);
    };

    const open = Boolean(anchorEl);
    return (
        <TableRow key={item.id}>
            <TableCell align="center">
                <Stack direction={"column"} spacing={2}>
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            cursor: "pointer",
                            margin: "0 auto",
                        }}
                        variant="rounded"
                        alt={`${item?.book_title}`}
                        src={`${imageApi}${item?.cover_image}`}
                    />
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={toolTipOpen}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="Copied"
                    >
                        <Typography
                            variant="caption"
                            align="center"
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                                copyContent(item.serial);
                                handleTooltipOpen();
                                setTimeout(() => {
                                    setToolTipOpen(false);
                                }, 1000);
                            }}
                        >
                            {item.serial ?? "N/A"}
                        </Typography>
                    </Tooltip>
                </Stack>
            </TableCell>

            {/* <TableCell align="center">
                <Typography variant="caption">
                    {item.serial ?? "N/A"}
                </Typography>
            </TableCell> */}

            <TableCell>
                <Typography
                    variant="caption"
                    sx={{ marginBottom: "2px" }}
                >
                    {item.book_title}
                </Typography>
                <Box sx={{ marginTop: "10px" }}>
                    {first_three_author}
                    {first_three_author.length > 1 ? (
                        <Typography
                            variant="subtitle"
                            color="secondary"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            sx={{
                                cursor: "pointer",
                                marginTop: "10px",
                            }}
                        >
                            More ...
                        </Typography>
                    ) : (
                        ""
                    )}

                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            width: "500px",
                            pointerEvents: "none",
                            "&.MuiPopover-root	": {
                                margin: "-4px 0px",
                            },
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "center",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "center",
                            horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Box
                            sx={{
                                position: "relative",
                                mt: "10px",
                            }}
                        />
                        {item?.authors?.length > 0 ? (
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Authors"
                                        primaryTypographyProps={{
                                            fontSize: "12px",
                                            fontWeight: 900,
                                        }}
                                    />
                                </ListItem>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "20px",
                                        flexWrap: "wrap",
                                        width: "400px",
                                        padding: "0px 20px",
                                        // background: "red",
                                    }}
                                >
                                    {item?.authors.map(
                                        (item, index) => {
                                            return (
                                                <i
                                                    key={index}
                                                    className="pop-icon"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item?.name,
                                                    }}
                                                ></i>
                                            );
                                        }
                                    )}
                                </Box>
                            </List>
                        ) : (
                            ""
                        )}
                    </Popover>
                </Box>
            </TableCell>

            <TableCell align="left">
                <Stack direction={"column"} spacing={2}>
                    <Typography variant="caption">
                        {item.edition.name}
                    </Typography>
                    <Typography variant="caption">
                        {item.release ?? 0} ကြိမ်
                    </Typography>
                </Stack>
            </TableCell>

            {/* <TableCell align="center">
                <Typography variant="caption">
                    {item.release ?? 0} ကြိမ်
                </Typography>
            </TableCell> */}

            <TableCell align="center">
                <Typography variant="caption">
                    {item.book_release_date
                        ? format(
                              new Date(item.book_release_date),
                              "dd/MM/yyyy"
                          )
                        : "N/A"}
                </Typography>
            </TableCell>

            <TableCell align="center">
                <Typography variant="caption">
                    {item.sale_price
                        ? formatMoney(item.sale_price)
                        : 0}
                </Typography>
            </TableCell>

            <TableCell align="center">
                <Stack
                    direction={"row"}
                    spacing={0.3}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Box
                        sx={{
                            border: "1px solid blue",
                            width: 60,
                            background: "blue",
                            borderRadius: 1,
                            paddingX: 0.5,
                        }}
                    >
                        <Typography
                            variant="caption"
                            color={"#fff"}
                            textAlign={"center"}
                        >
                            {formatMoney(item.units) ?? "N/A"}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            border: "1px solid red",
                            width: 60,
                            background: "red",
                            borderRadius: 1,
                            paddingX: 0.5,
                        }}
                    >
                        <Typography
                            variant="caption"
                            color={"#fff"}
                            textAlign={"center"}
                        >
                            {formatMoney(item.units - item.instock) ??
                                "N/A"}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            border: "1px solid lime",
                            width: 60,
                            background: "lime",
                            borderRadius: 1,
                            paddingX: 0.5,
                        }}
                    >
                        <Typography
                            variant="caption"
                            color={"#000"}
                            textAlign={"center"}
                        >
                            {formatMoney(item.instock) ?? "N/A"}
                        </Typography>
                    </Box>
                    {/* <Box width={"30%"}> */}
                    {/* <Chip
                        color="primary"
                        label={formatMoney(item.units) ?? "N/A"}
                    /> */}
                    {/* </Box> */}
                    {/* <Box width={"30%"}> */}
                    {/* <Chip
                        color="error"
                        label={
                            formatMoney(item.units - item.instock) ??
                            "N/A"
                        }
                    /> */}
                    {/* </Box> */}
                    {/* <Box width={"30%"}> */}
                    {/* <Chip
                        color="success"
                        label={formatMoney(item.instock) ?? "N/A"}
                    /> */}
                    {/* </Box> */}
                </Stack>
            </TableCell>

            <TableCell align="center">
                <Typography variant="caption">
                    {item.units > 0
                        ? formatMoney(
                              Math.round(
                                  item.total_expenses / item.units
                              )
                          )
                        : "N/A"}
                </Typography>
            </TableCell>

            <TableCell align="center">
                <Typography variant="caption">
                    {item.total_expenses
                        ? formatMoney(item.total_expenses)
                        : 0}
                </Typography>
            </TableCell>

            <TableCell align="center">
                <Stack
                    direction="column"
                    justifyContent="center"
                    spacing={2}
                    alignItems="center"
                >
                    <ProductUpdateDrawer inputValues={item} />
                    <DeleteIcon
                        fontSize="small"
                        onClick={() => setOpenAlert(true)}
                        sx={{ cursor: "pointer", color: "red" }}
                    />

                    <DeleteAlert
                        openAlert={openAlert}
                        setOpenAlert={setOpenAlert}
                        companyDetail={companyDetail}
                        item={item}
                    />
                </Stack>
            </TableCell>
        </TableRow>
    );
}

export default ProductTableBody;
