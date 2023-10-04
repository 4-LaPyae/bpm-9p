import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Paper,
    Toolbar,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Button,
    Stack,
    IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import PromotionTableitem from "./PromotionTableItem";
import { Add, ReadMore, Settings, TableRows } from "@mui/icons-material";
import PromotionAdd from "./PromotionAdd";
import { styled } from "@mui/material/styles";

const MkToolbar = styled(Toolbar)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        padding: "0px",
    },
}));

function PromotionTable({ setTabIndex }) {
    const { promotionList } = useSelector((state) => state.promotions);
    const { campaignInfo } = useSelector((state) => state.campaignDetail);

    return (
        <Box component={Paper} elevation={2} sx={{ mt: 3 }}>
            <Box sx={{ padding: "20px" }}>
                <MkToolbar sx={{ padding: 0 }}>
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="subtitle1"
                        component="div"
                    >
                        Promotion List
                    </Typography>
                    <Stack direction="row">
                        <PromotionAdd />
                        <IconButton onClick={() => setTabIndex(5)}>
                            <Settings sx={{ color: "#2152ff" }} />
                        </IconButton>
                    </Stack>
                </MkToolbar>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "30%" }}>
                                    <Typography variant="subtitle2">
                                        Title
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{}} align="right">
                                    <Typography variant="subtitle2">
                                        Amount
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{}} align="right">
                                    <Typography variant="subtitle2">
                                        Percent
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{}} align="right">
                                    <Typography variant="subtitle2">
                                        Winning Count
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        display:
                                            campaignInfo.finish === 1
                                                ? "none"
                                                : "",
                                    }}
                                    align="right"
                                >
                                    <Typography variant="subtitle2">
                                        Slient
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        display:
                                            campaignInfo.finish === 1
                                                ? "none"
                                                : "",
                                    }}
                                    align="right"
                                >
                                    <Typography variant="subtitle2">
                                        Disabled
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {promotionList.map((item, index) => {
                                return (
                                    <PromotionTableitem
                                        key={index}
                                        item={item}
                                    />
                                );
                            })}
                            <TableRow style={{ height: 85 * 1 }}>
                                <TableCell colSpan={8} />
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default PromotionTable;
