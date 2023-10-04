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
import MkSwitch from "../../../app/assets/theme/MkSwitch";
import { formatMoney } from "../../../app/helper/formatMoney";

import {
    disabled_promotion,
    silent_promotion,
} from "../../../features/company/CampaignApi";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function PromotionTableitem({ item, setTabIndex }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { campaignInfo } = useSelector((state) => state.campaignDetail);

    const [checkSilent, setCheckSilent] = useState(
        item.silent === 0 ? false : true
    );
    const [checkDisabled, setCheckDisabled] = useState(
        item.disabled === 0 ? false : true
    );

    const handleCheckSilent = (e) => {
        setCheckSilent(e.target.checked);
        dispatch(silent_promotion({ id: item.id }));
    };
    const handleCheckDisabled = (e) => {
        setCheckDisabled(e.target.checked);
        dispatch(disabled_promotion({ id: item.id }));
    };

    useEffect(() => {
        setCheckSilent(item.silent === 0 ? false : true);
        setCheckDisabled(item.disabled === 0 ? false : true);
    }, [item]);

    return (
        <TableRow>
            <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box>
                        <Typography
                            variant="caption"
                            component="div"
                            sx={{
                                fontWeight: "bold",
                                textAlign: "left",
                            }}
                        >
                            {item.title}
                        </Typography>
                    </Box>
                </Stack>
            </TableCell>
            <TableCell align="right">
                <Typography variant="caption">
                    {formatMoney(item.amount)}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Typography variant="caption">{item.percent}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">{item.winning_count}</Typography>
            </TableCell>
            <TableCell
                align="right"
                sx={{
                    display: campaignInfo.finish === 1 ? "none" : "",
                }}
            >
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        size="small"
                        checked={checkSilent}
                        onChange={handleCheckSilent}
                        inputProps={{
                            "aria-label": "controlled",
                        }}
                    />
                </ThemeProvider>
            </TableCell>
            <TableCell
                align="center"
                sx={{
                    display: campaignInfo.finish === 1 ? "none" : "",
                }}
            >
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        size="small"
                        checked={checkDisabled}
                        onChange={handleCheckDisabled}
                        inputProps={{
                            "aria-label": "controlled",
                        }}
                    />
                </ThemeProvider>
            </TableCell>
        </TableRow>
    );
}

export default PromotionTableitem;
