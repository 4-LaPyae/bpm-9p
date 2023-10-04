import {
    Box,
    CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyUser from "./CompanyUser";
import AddCompanyUser from "./AddCompanyUser";
import {
    getCompanyUserRole,
    getUserList,
} from "../../../features/company/CompanyApi";
import TableFooterPagination from "../../../app/components/Table/TableFooterPagination";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";

function CompanyUserTable() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [name, setName] = useState("");
    const { usersList, pagination, getStatus } = useSelector(
        (state) => state.companyUser
    );
    const { companyDetail, loading } = useSelector(
        (state) => state.companyDetail
    );
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    console.log({ usersList });
    useEffect(() => {
        dispatch(
            getUserList({
                page: page + 1,
                limit: rowsPerPage,
                filterName: name,
            })
        );
        dispatch(getCompanyUserRole());
    }, [page, rowsPerPage, name]);

    return (
        <Box component={Paper} sx={{ padding: "0px 25px 25px 25px" }}>
            <Toolbar>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                >
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                        width={"100%"}
                    >
                        <Typography
                            variant="subtitle1"
                            component="div"
                        >
                            Company Users List
                        </Typography>
                        <Box sx={{ width: "20%" }}>
                            <InputFormComponent
                                value={name}
                                onChange={(e) =>
                                    setName(e.currentTarget.value)
                                }
                                label=""
                                name="name"
                                placeholder="Enter Name or Phone"
                            />
                        </Box>
                    </Stack>

                    <AddCompanyUser />
                </Stack>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "10%" }}>
                                <Typography variant="subtitle2">
                                    Profile
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "20%" }}>
                                <Typography variant="subtitle2">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "20%" }}>
                                <Typography variant="subtitle2">
                                    Phone
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    width: "20%",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    Role
                                </Typography>
                            </TableCell>
                            <TableCell width="10%">
                                <Typography variant="subtitle2">
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="center" width="10%">
                                <Typography variant="subtitle2">
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getStatus == "pending" ? (
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginLeft: 40,
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                {usersList?.map((row, index) => (
                                    <CompanyUser
                                        item={row}
                                        key={index}
                                        // setTabIndex={setTabIndex}
                                    />
                                ))}
                                {/* {usersList?.length <= 5 && (
                                    <TableRow
                                        style={{
                                            height:
                                                85 *
                                                (5 -
                                                    usersList.length),
                                        }}
                                    >
                                        <TableCell colSpan={5} />
                                    </TableRow>
                                )} */}
                            </>
                        )}
                    </TableBody>
                    {usersList?.length > 0 && (
                        <TableFooterPagination
                            rowsPerPageOptions={[10, 20, 30]}
                            tableList={pagination?.total}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={
                                handleChangeRowsPerPage
                            }
                        />
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
}

export default CompanyUserTable;
