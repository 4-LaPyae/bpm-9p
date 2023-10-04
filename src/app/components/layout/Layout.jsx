import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Routes } from "./Data";

import {
    Box,
    CssBaseline,
    Divider,
    IconButton,
    List,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Avatar,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu, MenuOpen } from "@mui/icons-material";
import NavItem from "./NavItem";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { useDispatch } from "react-redux";
import {
    getCompanyDetail,
    getCompanyList,
    getCompanyUserRole,
    getUserList,
    getUserListNoPeg,
} from "../../../features/company/CompanyApi";
import { Cities } from "../../../features/cites/CitiesApi";
import Footer from "../Footer";
import logo from "../../assets/images/nineP.png";
import { getAdminList } from "../../../features/admin/AdminApi";
import { divisionOptions } from "../../../features/location/DivisionApi";
import { citiesDropdown } from "../../../features/location/CityApi";
import { allExpenseCategories } from "../../../features/expense_category/ExpenseCategoryApi";
import { EditionDropdownList } from "../../../features/edition/EditionApi";
import { ReleaseDropdownList } from "../../../features/release/ReleaseApi";
import { GenreDropdownList } from "../../../features/genre/GenreApi";
import Alert from "./../../components/Alert";
import { dropdownCourisers } from "../../../features/couriers/CouriersApi";
import {
    localStorageHandler,
    reloadHandler,
} from "../../../features/login/LoginSlice";
import { useSelector } from "react-redux";

const drawerWidth = 180;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div", {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    height: "65px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...(!open && { justifyContent: "center" }),
}));

const Main = styled("div", {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0 40px 30px",
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const SideNav = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function Layout() {
    const [open, setOpen] = useState(false);
    const { publisher } = useSelector((state) => state.loginInfo);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // console.log("Layout all api run");
        dispatch(getCompanyUserRole());
        dispatch(Cities());
        dispatch(getCompanyList());
        dispatch(divisionOptions());
        dispatch(citiesDropdown());
        dispatch(allExpenseCategories());
        dispatch(GenreDropdownList());
        dispatch(EditionDropdownList());
        dispatch(ReleaseDropdownList());
        dispatch(getUserListNoPeg());
        dispatch(getCompanyDetail({ id: publisher[0]?._id }));
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <SideNav
                variant="permanent"
                open={open}
                sx={{
                    "& .MuiDrawer-paper": {
                        bgcolor: "#fff",
                    },
                }}
            >
                <List open={open}>
                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            sx={{
                                transitionProperty: "justifyContent",
                                transitionDuration: "3s",
                                minHeight: 48,
                                justifyContent: open
                                    ? "space-between"
                                    : "center",
                                px: 2.5,
                            }}
                        >
                            <Avatar
                                sx={{
                                    transitionProperty: "display",
                                    transitionDuration: "3s",
                                    display: open ? "block" : "none",
                                    minWidth: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                }}
                                src={logo}
                                alt="Logo"
                            />
                            {open ? (
                                <IconButton
                                    aria-label="close drawer"
                                    onClick={handleDrawerClose}
                                >
                                    <MenuOpen
                                        style={{ color: "#000000" }}
                                    />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                >
                                    <Menu
                                        style={{ color: "#000000" }}
                                    />
                                </IconButton>
                            )}
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {Routes.map((item) => (
                        <NavItem item={item} key={item.text} />
                    ))}
                </List>
            </SideNav>
            <Main open={open}>
                <Box
                    component="header"
                    sx={{
                        borderRadius: "7px",
                        height: "65px",
                        // padding: "0 1.5rem",
                        padding: "0 0.5rem",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <LeftNav />
                    <RightNav />
                </Box>
                <Box mb={7}>
                    <Outlet />
                </Box>

                {/* alert */}
                <Alert />

                {/* footer */}
                <Footer />
            </Main>
        </Box>
    );
}
