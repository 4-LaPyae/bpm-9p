import React, { useState, useEffect } from "react";
import {
    useTheme,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import { TableCell, TableRow, Typography } from "@mui/material";
import MkSwitch from "../../app/assets/theme/MkSwitch";
import { formatMoney } from "../../app/helper/formatMoney";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import UpdateCourier from "./UpdateCourier";
import {
    CourierDelete,
    getCouriersList,
} from "../../features/couriers/CouriersApi";
import { useSelector } from "react-redux";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

const CouriersTableBody = ({ item, companyDetail }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [editOpen, setEditOpen] = useState(false);
    const { publisher } = useSelector((state) => state.loginInfo);
    console.log(item.status);
    const [check, setCheck] = useState(
        item.status === 0 ? false : true
    );

    // console.log({ check });
    const handleCheck = (e) => {
        setCheck(e.target.checked);
        dispatch(
            CourierDelete({
                id: item._id,
                publisher_id: publisher[0]._id,
            })
        )
            .unwrap()
            .then((result) => {
                console.log("In Courier Table Body", { result });
                if (result.data) {
                    // dispatch(
                    //     getCouriersList({
                    //         id: publisher[0]._id,
                    //         page: 1,
                    //         limit: 10,
                    //     })
                    // );
                }
            });
    };

    const handleClick = () => {
        setEditOpen(true);
    };

    return (
        <TableRow key={item._id}>
            <TableCell>
                <Typography
                    variant="caption"
                    sx={{ marginBottom: "3px" }}
                >
                    {item.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="caption"
                    sx={{ marginBottom: "3px" }}
                >
                    {formatMoney(item.charges)}
                </Typography>
            </TableCell>
            <TableCell>
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        checked={check}
                        onChange={(e) => {
                            handleCheck(e);
                        }}
                        inputProps={{
                            "aria-label": "controlled",
                        }}
                    />
                </ThemeProvider>
            </TableCell>
            <TableCell align="center">
                <EditIcon
                    fontSize="small"
                    sx={{ cursor: "pointer", color: "#2152ff" }}
                    onClick={handleClick}
                />
            </TableCell>
            <UpdateCourier
                open={editOpen}
                setOpen={setEditOpen}
                item={item}
            />
        </TableRow>
    );
};

export default CouriersTableBody;
