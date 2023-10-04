import PropTypes from 'prop-types';
import {useTheme} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';
import ProfileInputs from './ProfileInputs';
import ProfilePasswordInputs from './ProfilePasswordInputs';

function TabPanel(props) {
    const {children, value, index, ...other} = props;
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

function ProfileTabView({tabIndex, setTabIndex}) {
    const theme = useTheme();

    return (
        <Box>
            <TabPanel
                value={tabIndex}
                index={0}
                dir={theme.direction}
            >
                <Typography variant="body2">
                    <ProfileInputs />
                </Typography>
            </TabPanel>
            {/* <TabPanel value={tabIndex} index={1} dir={theme.direction}>
                <Typography variant="body2">
                    <ProfilePasswordInputs />
                </Typography>
            </TabPanel> */}
        </Box>
    );
}

export default ProfileTabView;
