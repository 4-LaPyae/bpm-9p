import { useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
    ArrowForwardIosSharp,
    Business,
    NotificationsRounded,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import LogoutAlert from "../AlertBox/LogoutAlert";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { imageApi } from "../../../app/hooks";
import { getCompanyList } from "../../../features/company/CompanyApi";
import { useDispatch } from "react-redux";
import {
    localStorageHandler,
    onSetPublisher,
} from "../../../features/login/LoginSlice.js";
import LogoutIcon from "@mui/icons-material/Logout";
import { resetBook } from "../../../features/book/BookSlice";
import { resetCompanyDetail } from "../../../features/company/CompanySlice";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    // "&:not(:last-child)": {
    //     borderBottom: 0,
    // },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={
            <ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />
        }
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0)"
            : "rgba(0, 0, 0, 0)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function RightNav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState("");
    const [profile, setProfile] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.loginInfo);
    const navigate = useNavigate();
    const { companyList } = useSelector((state) => state.companyList);

    const { companyDetail } = useSelector(
        (state) => state.companyDetail
    );

    const { usersList } = useSelector((state) => state.companyUser);

    const [currentUser, setCurrentUser] = useState(
        usersList?.find((ad) => ad._id === user?.user?._id)
    );

    const auth = JSON.parse(localStorage.getItem("auth"));
    // console.log({ auth });

    const handlePublisherClick = (id) => {
        setAnchorEl(null);
        setExpanded("");
        console.log({ id });
        const filter = companyList.filter((item) => item._id === id);
        console.log(filter);

        dispatch(resetCompanyDetail());
        dispatch(resetBook());
        dispatch(onSetPublisher(filter));

        // const expiredTime = new Date(new Date().getTime() + 86400 * 1000);
        const expiredTime = new Date(
            new Date().getTime() + 1209600 * 1000
        );
        dispatch(localStorageHandler(expiredTime));
        navigate("/companies");
    };

    useEffect(() => {
        setProfile(companyDetail?.active == 1 ? true : false);
    }, [companyDetail]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setExpanded("");
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [openAlert, setOpenAlert] = useState(false);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    // useEffect(() => {
    //   setCurrentUser(usersList?.find((ad) => ad.id === user.user.id));
    // }, [usersList]);

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                divider={<Divider flexItem orientation="vertical" />}
            >
                <IconButton>
                    <NotificationsRounded />
                </IconButton>
                <>
                    <Avatar
                        src={`${imageApi}/${user?.profile}`}
                        onClick={handleClick}
                    >
                        {user?.name?.slice(0, 1)}
                    </Avatar>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        sx={{
                            mt: "10px",
                            boxShadow:
                                "0px 0px 50px 0px rgb(82 63 105 / 15%)",
                        }}
                    >
                        <Stack
                            divider={
                                <Divider
                                    flexItem
                                    orientation="horizontal"
                                />
                            }
                        >
                            <Box
                                sx={{
                                    color: "#333",
                                    padding:
                                        "0.75rem 3rem 0.75rem 1rem",
                                }}
                            >
                                <Typography sx={{ fontSize: "1rem" }}>
                                    {`${user?.name}`}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.75rem",
                                        color: "#333",
                                    }}
                                >
                                    {user?.phone}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    padding: "1rem",
                                }}
                            >
                                <Link
                                    // to={profile ? "/profile" : "#"}
                                    to={"/profile"}
                                    onClick={() => handleClose()}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                    >
                                        <AccountCircleIcon
                                            sx={{
                                                color: "#333",
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                color: "#333",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Profile
                                        </Typography>
                                    </Stack>
                                </Link>
                            </Box>

                            <Accordion
                                style={{ boxShadow: "none" }}
                                expanded={expanded === "panel1"}
                                onChange={handleChange("panel1")}
                            >
                                <AccordionSummary
                                    aria-controls="panel1d-content"
                                    id="panel1d-header"
                                >
                                    <Typography
                                        sx={{ color: "#333" }}
                                    >
                                        Publisher List{" "}
                                    </Typography>
                                </AccordionSummary>

                                {companyList?.map((company) => {
                                    return (
                                        <AccordionDetails>
                                            <Stack
                                                // key={company._id}
                                                // component={Link}
                                                // to={"/companies"}

                                                sx={{
                                                    color: "#333",
                                                    cursor: "pointer",
                                                }}
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                                onClick={() => {
                                                    // dispatch(resetBook());
                                                    handlePublisherClick(
                                                        company?._id
                                                    );
                                                }}
                                            >
                                                <Business />
                                                <Typography>
                                                    {company?.name}
                                                </Typography>
                                            </Stack>
                                        </AccordionDetails>
                                    );
                                })}
                            </Accordion>

                            <Box sx={{ padding: "1rem" }}>
                                <Stack direction="row" spacing={1}>
                                    <LogoutIcon />
                                    <Typography
                                        onClick={() => {
                                            setAnchorEl(null);
                                            //open logout alert
                                            setOpenAlert(true);
                                        }}
                                        sx={{
                                            color: "#333",
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Logout
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Popover>
                </>
            </Stack>
            <LogoutAlert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
            />
        </>
    );
}

export default RightNav;
