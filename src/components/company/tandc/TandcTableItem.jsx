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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { format } from "date-fns";
import MkButton from "../../../app/assets/theme/MkButton/index";
import { statusCampaign } from "../../../features/company/CampaignApi";
import { changeCampaignInfo } from "../../../features/company/CampaignSlice";
import { Edit } from "@mui/icons-material";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function TandcTableitem({ item, setTabIndex }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [checkDisable, setCheckDisable] = useState(
        item.disable === 0 ? false : true
    );

    const handleCheckDisable = (e) => {
        setCheckDisable(e.target.checked);
        dispatch(statusCampaign({ id: item.id }));
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        setCheckDisable(item.disable === 0 ? false : true);
    }, [item]);

    const handleCampaignInfo = () => {
        dispatch(changeCampaignInfo(item));
        setTabIndex(4);
    };

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
                            {item.description}
                        </Typography>
                    </Box>
                </Stack>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        // checked={checkDisable}
                        // onChange={handleCheckDisable}
                        inputProps={{
                            "aria-label": "controlled",
                        }}
                    />
                </ThemeProvider>
            </TableCell>
        </TableRow>
    );
}

export default TandcTableitem;
