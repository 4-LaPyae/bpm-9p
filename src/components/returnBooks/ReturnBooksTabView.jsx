import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import ReturnTabView from "./ReturnTabView";
import DamageTabView from "./DamageTabView";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function ReturnBooksTabView({ tabIndex, setTabIndex }) {
    const theme = useTheme();

    return (
        <Box>
            <TabPanel
                value={tabIndex}
                index={0}
                dir={theme.direction}
            >
                <ReturnTabView setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel
                value={tabIndex}
                index={1}
                dir={theme.direction}
            >
                <DamageTabView setTabIndex={setTabIndex} />
            </TabPanel>
        </Box>
    );
}

export default ReturnBooksTabView;
