import {
    AdminPanelSettings,
    Business,
    Dashboard,
    GroupSharp,
    MonetizationOn,
} from "@mui/icons-material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import PrintIcon from "@mui/icons-material/Print";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Routes = [
    {
        text: "Books",
        route: "books",
        icon: <MenuBookIcon style={{ color: "#000000" }} />,
    },

    {
        text: "Sale",
        route: "sales",
        icon: <MonetizationOn style={{ color: "#000000" }} />,
    },
    {
        text: "Return Books",
        route: "returnBooks",
        icon: <AssignmentReturnIcon style={{ color: "#000000" }} />,
    },
    {
        text: "Customers",
        route: "customers",
        icon: <PeopleIcon style={{ color: "#000000" }} />,
    },
    {
        text: "Users",
        route: "users",
        icon: (
            <SupervisedUserCircleIcon style={{ color: "#000000" }} />
        ),
    },
    {
        text: "Couriers",
        route: "couriers",
        icon: <LocalShippingIcon style={{ color: "#000000" }} />,
    },
    {
        text: "Print Setting",
        route: "setting",
        icon: <PrintIcon style={{ color: "#000000" }} />,
    },
    {
        text: "Publishers",
        route: "publishers",
        icon: <SettingsIcon style={{ color: "#000000" }} />,
    },
];
