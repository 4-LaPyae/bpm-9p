import {
    Avatar,
    Box,
    Button,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import {
    useTheme,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MkSwitch from "../../../app/assets/theme/MkSwitch";
import { getUserRole } from "../../../app/helper/getUserRole";
import { imageApi } from "../../../app/hooks";
import { companyUserDetailActions } from "../../../features/company/CompanySlice";
import { statusCompanyUser } from "../../../features/company/CompanyApi";
import EditCompanyUser from "./EditCompanyUser";
import MkButton from "../../../app/assets/theme/MkButton";
import EditIcon from "@mui/icons-material/Edit";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function CompanyUserList({ item }) {
    const navigate = useNavigate();
    const { roles } = useSelector((state) => state.companyUserRole);

    const { companyDetail, loading } = useSelector(
        (state) => state.companyDetail
    );
    const { user, publisher } = useSelector(
        (state) => state.loginInfo
    );
    const { changeUserInfo } = companyUserDetailActions;
    const theme = useTheme();
    const dispatch = useDispatch();
    const [check, setCheck] = useState(
        item?.active == 0 ? false : true
    );
    const handleCheck = (e) => {
        setCheck(e.target.checked);
        // console.log({ check });
        dispatch(
            statusCompanyUser({
                id: item?._id,
                company_id: publisher[0]._id,
            })
        );
    };
    // console.log(item?.authorities);

    const itemRole = item?.authorities.find(
        (itm) => itm.publisher_id === publisher[0]._id
    );

    // const userRole = roles.find((itm) => itm?._id === item?.role_id);
    console.log(itemRole);
    console.log(roles);
    const userRole = roles.find(
        (itm) => itm.id === itemRole?.role._id
    );

    const loginUser = user?.id === item?._id;

    const handleUserInfo = () => {
        dispatch(changeUserInfo(item));
    };

    console.log({ userRole });

    useEffect(() => {
        setCheck(item?.active == 0 ? false : true);
    }, [item]);

    // console.log({ item });

    return (
        <TableRow>
            <TableCell>
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        cursor: "pointer",
                    }}
                    variant="rounded"
                    alt={`${item?.first_name}`}
                    src={`${imageApi}/${item?.profile}`}
                />
            </TableCell>
            <TableCell>
                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "left",
                    }}
                >
                    {`${item?.name}`}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="caption"
                    component="div"
                    textAlign="left"
                >
                    {item?.phone}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="caption">
                    {itemRole?.role.description}
                    {/* {item.role.description} */}
                </Typography>
            </TableCell>
            <TableCell>
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        checked={check}
                        onChange={handleCheck}
                        inputProps={{
                            "aria-label": "controlled",
                        }}
                        disabled={loginUser}
                    />
                </ThemeProvider>
            </TableCell>
            <TableCell align="center">
                {loginUser ? (
                    <EditIcon
                        fontSize="small"
                        onClick={() =>
                            navigate("/profile", { state: true })
                        }
                        sx={{ cursor: "pointer", color: "#2152ff" }}
                    />
                ) : (
                    <EditCompanyUser
                        item={item}
                        roles={roles}
                        userRole={userRole}
                    />
                )}
            </TableCell>
        </TableRow>
    );
}

export default CompanyUserList;
