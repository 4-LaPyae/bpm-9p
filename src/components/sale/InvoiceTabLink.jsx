import { Tabs, Tab, Box } from "@mui/material";
import {
    createTheme,
    ThemeProvider,
    styled,
} from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { clearInvoices } from "../../features/invoices/invoicesSlice";

const STab = styled(Tab)(({ theme }) => {
    return {
        fontSize: "14px",
        fontWeight: "bold",
    };
});

export default function InvoiceTabLink({ setTabIndex, tabIndex }) {
    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
        dispatch(clearInvoices());
    };

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
            >
                <STab
                    value={0}
                    label="Draft Invoices"
                    sx={{ textTransform: "capitalize" }}
                />
                <STab
                    value={1}
                    label="Complete Invoices"
                    sx={{ textTransform: "capitalize" }}
                />
                <STab
                    value={2}
                    label="Book View"
                    sx={{ textTransform: "capitalize" }}
                />
            </Tabs>
        </Box>
    );
}
