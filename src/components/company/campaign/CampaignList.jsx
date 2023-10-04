import {
    Avatar,
    Box,
    Button,
    Popover,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MkSwitch from "../../../app/assets/theme/MkSwitch";
import { format } from "date-fns";
import {
    finishCampaign,
    statusCampaign,
} from "../../../features/company/CampaignApi";
import { changeCampaignInfo } from "../../../features/company/CampaignSlice";
import CmapaignEdit from "./CampaignEdit";
import { formatMoney } from "../../../app/helper/formatMoney";
import { imageApi } from "../../../app/hooks";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function CampaignList({ item, setTabIndex, permi }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [checkDisable, setCheckDisable] = useState(
        item.disable === 0 ? false : true
    );
    const [checkFinish, setCheckFinish] = useState(
        item.finish === 0 ? false : true
    );

    const handleCheckDisable = (e) => {
        setCheckDisable(e.target.checked);
        dispatch(statusCampaign({ id: item.id }));
    };
    const handleCheckFinish = (e) => {
        setCheckFinish(e.target.checked);
        dispatch(finishCampaign({ id: item.id }));
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        item;
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        setCheckDisable(item.disable === 0 ? false : true);
        setCheckFinish(item.finish === 0 ? false : true);
    }, [item]);

    const handleCampaignInfo = () => {
        dispatch(changeCampaignInfo(item));
        setTabIndex(4);
    };

    return (
        <TableRow>
            <TableCell>
                <Link to={`#`}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        onClick={handleCampaignInfo}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                sx={{ width: 30, height: 30 }}
                                variant="rounded"
                                src={`${imageApi}/${item.banner_image}`}
                                alt={item.event_title}
                            />
                        </Box>
                        <Box>
                            <Typography
                                variant="caption"
                                component="div"
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    color: "#67748e",
                                }}
                            >
                                {item.event_title}
                            </Typography>
                        </Box>
                    </Stack>
                </Link>
            </TableCell>
            <TableCell>
                <Typography variant="caption">
                    {format(new Date(item?.start), "dd/MM/yyyy")}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="caption">
                    {format(new Date(item?.end), "dd/MM/yyyy")}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {formatMoney(item?.promotions_count)}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {formatMoney(item?.coupons_count)}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.total_winning_amount === null
                        ? 0
                        : formatMoney(item?.total_winning_amount)}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item?.total_spending_amount === null
                        ? 0
                        : formatMoney(item?.total_spending_amount)}
                </Typography>
            </TableCell>
            <TableCell>
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        checked={checkDisable}
                        onChange={handleCheckDisable}
                        inputProps={{
                            "aria-label": "controlled",
                        }}
                    />
                </ThemeProvider>
            </TableCell>
            <TableCell>
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        checked={checkFinish}
                        onChange={handleCheckFinish}
                        inputProps={{
                            "aria-label": "controlled",
                        }}
                    />
                </ThemeProvider>
            </TableCell>
            {/* <TableCell sx={{ textAlign: "right" }}>
                <CmapaignEdit item={item} />
            </TableCell> */}
        </TableRow>
    );
}

export default CampaignList;
