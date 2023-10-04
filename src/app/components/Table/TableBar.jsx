import { FilterList } from "@mui/icons-material";
import { IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import AddCompany from "../../../components/company/AddCompany";

function TableBar({ children }) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: "15px 0px" }}
        >
            <Typography variant="h2" component="div">
                {children[0]}
            </Typography>

            {children[1]}
        </Stack>
    );
}

export default TableBar;
