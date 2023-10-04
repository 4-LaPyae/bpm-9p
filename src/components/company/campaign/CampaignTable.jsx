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
} from "@mui/material";
import { useSelector } from "react-redux";
import CampaignList from "./CampaignList";
import CampaignAdd from "./CampaignAdd";
import { permission } from "../../../app/helper/permission";

function CampaignTable({ setTabIndex }) {
    const { campaignList } = useSelector((state) => state.campaignList);
    const { usersList } = useSelector((state) => state.companyUser);
    const { user } = useSelector((state) => state.loginInfo);
    const { roles } = useSelector((state) => state.companyUserRole);
    const getLoginUser = usersList.find((userList) => userList.id === user.id);
    const permi = permission(getLoginUser.role_id, roles);

    return (
        <Box component={Paper} sx={{ padding: "25px", mt: 5 }}>
            <Toolbar sx={{ padding: 0 }}>
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="subtitle1"
                    component="div"
                >
                    Campaign List
                </Typography>

                {/* <CampaignAdd /> */}
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "15%" }}>
                                <Typography variant="subtitle2">
                                    Campaign
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "10%" }}>
                                <Typography variant="subtitle2">
                                    Start Date
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "10%" }}>
                                <Typography variant="subtitle2">
                                    End Date
                                </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ width: "15%" }}>
                                <Typography variant="subtitle2">
                                    Total Promotion
                                </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ width: "10%" }}>
                                <Typography variant="subtitle2">
                                    Total Coupon
                                </Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ width: "15%" }}>
                                <Typography variant="subtitle2">
                                    Total Winning Amount
                                </Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ width: "15%" }}>
                                <Typography variant="subtitle2">
                                    Total Spending Amount
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">
                                    Enable
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">
                                    Finish
                                </Typography>
                            </TableCell>
                            {/* <TableCell align="center" width="100px">
                                <Typography variant="subtitle2">
                                    Actions
                                </Typography>
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campaignList?.map((item, index) => {
                            return (
                                <CampaignList
                                    key={index}
                                    setTabIndex={setTabIndex}
                                    item={item}
                                />
                            );
                        })}
                        {campaignList?.length <= 5 && (
                            <TableRow
                                style={{
                                    height: 85 * (5 - campaignList.length),
                                }}
                            >
                                <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default CampaignTable;
