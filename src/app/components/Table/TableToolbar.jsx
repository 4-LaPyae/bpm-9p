import { FilterList } from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import AddCompany from "../../../components/company/AddCompany";

function TableToolbar({ children }) {
    const location = useLocation();

    return (
        <Toolbar>
            <Typography sx={{ flex: "1 1 100%" }} variant="h4" component="div">
                {children}
            </Typography>

            {location.pathname === "/companies" && <AddCompany />}
        </Toolbar>
    );
}

export default TableToolbar;
