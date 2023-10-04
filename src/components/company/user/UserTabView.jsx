import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CompanyUserTable from "./CompanyUserTable";
import {
    getCompanyDetail,
    getCompanyUserRole,
} from "../../../features/company/CompanyApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function UserTabView() {
    const { publisher } = useSelector((state) => state.loginInfo);
    const dispatch = useDispatch();
    return (
        <>
            <CompanyUserTable />
        </>
    );
}

export default UserTabView;
