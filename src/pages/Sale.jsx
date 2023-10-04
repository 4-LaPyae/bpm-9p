import {
    Box,
    Button,
    Checkbox,
    Chip,
    Paper,
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
import { Link, useNavigate } from "react-router-dom";
import MkButton from "../app/assets/theme/MkButton";
import { useDispatch } from "react-redux";
import { resetAddress } from "../features/customer/CustomerSlice";
import { useSelector } from "react-redux";
import { allInvoices } from "../features/invoices/invoicesApi";
import InvoiceTableItem from "../components/sale/InvoiceTableItem";
import TableFooterPagination from "../app/components/Table/TableFooterPagination";
import {
    addSelectedInvoices,
    clearSelectedBook,
    clearSelectedInvoice,
} from "../features/invoices/invoicesSlice";
import SimpleDateRangePicker from "../app/components/SimpleDateRangePicker";
import CancelIcon from "@mui/icons-material/Cancel";
import format from "date-fns/format";
import InputFormComponent from "../app/components/Form/InputFormComponent";
import MkAutoComplete from "../app/assets/theme/MkAutoComplete";
import { dropdownCourisers } from "../features/couriers/CouriersApi";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useReactToPrint } from "react-to-print";
import TableToolbar from "../app/components/Table/TableToolbar";
import InvoiceTabView from "../components/sale/InvoiceTabView";
import InvoiceTabLink from "../components/sale/InvoiceTabLink";
import { getCompanyDetail } from "../features/company/CompanyApi";
import { localStorageHandler } from "../features/login/LoginSlice";

const Sale = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div>
            <Box>
                <InvoiceTabLink
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
            </Box>
            <Box>
                <InvoiceTabView
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
            </Box>
        </div>
    );
};

export default Sale;
