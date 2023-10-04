import { Tabs, Tab, Box } from "@mui/material";
import {
    createTheme,
    ThemeProvider,
    styled,
} from "@mui/material/styles";

const STab = styled(Tab)(({ theme }) => {
    return {
        fontSize: "14px",
        fontWeight: "bold",
    };
});

export default function CompanyLinkTab({ setTabIndex, tabIndex }) {
    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
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
                {/* <STab
                    value={0}
                    label="Books"
                    sx={{textTransform: 'capitalize'}}
                /> */}
                <STab
                    value={0}
                    label="Commercial Tax"
                    sx={{ textTransform: "capitalize" }}
                />
                {/* <STab
                    value={1}
                    label="Couriers"
                    sx={{ textTransform: "capitalize" }}
                />
                <STab
                    value={2}
                    label="Settings"
                    sx={{ textTransform: "capitalize" }}
                /> */}
            </Tabs>
        </Box>
    );
}
