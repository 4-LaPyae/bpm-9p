import {
    Box,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    Toolbar,
    TableBody,
    Stack,
    IconButton,
    InputLabel,
    CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCouriersList } from "../features/couriers/CouriersApi";
import CouriersTableBody from "../components/couriers/CouriersTableBody";
import AddCourier from "../components/couriers/AddCourier";
import TableFooterPagination from "../app/components/Table/TableFooterPagination";
import InputFormComponent from "../app/components/Form/InputFormComponent";

const Couriers = ({ setTabIndex }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [name, setName] = useState("");
    const { publisher } = useSelector((state) => state.loginInfo);
    const { couriers, pagination, getStatus } = useSelector(
        (state) => state.CouriersSlice
    );
    const { companyDetail } = useSelector(
        (state) => state.companyDetail
    );
    const emptyRows =
        page > 0
            ? rowsPerPage - couriers?.length
            : rowsPerPage - couriers?.length;
    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(
            getCouriersList({
                id: publisher[0]?._id,
                page: page + 1,
                limit: rowsPerPage,
                filterName: name,
            })
        );
    }, [page, rowsPerPage, name]);

    return (
        <Box
            component={Paper}
            sx={{ padding: "0px 25px 25px 25px" }}
            mt={5}
        >
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
                            Couriers List
                        </Typography>
                        <Box sx={{ width: "20%" }}>
                            <InputFormComponent
                                value={name}
                                onChange={(e) =>
                                    setName(e.currentTarget.value)
                                }
                                label=""
                                name="name"
                                placeholder="Enter Name"
                            />
                        </Box>
                    </Stack>

                    <AddCourier />
                </Stack>
            </Toolbar>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">
                                    Charges
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "250px" }}>
                                <Typography variant="subtitle2">
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2">
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {getStatus === "pending" ? (
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
                                {couriers?.length > 0 ? (
                                    <>
                                        {couriers?.map(
                                            (row, index) => (
                                                <CouriersTableBody
                                                    item={row}
                                                    key={index}
                                                    // setTabIndex={setTabIndex}
                                                    companyDetail={
                                                        companyDetail
                                                    }
                                                />
                                            )
                                        )}
                                    </>
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: "1.4rem",
                                            textAlign: "center",
                                            marginTop: "80px",
                                        }}
                                    >
                                        There is no courier.
                                    </Typography>
                                )}
                            </>
                        )}

                        {/* {emptyRows > 0 && (
                            <TableRow style={{ height: 53.3 * emptyRows }}>
                                <TableCell colSpan={4} />
                            </TableRow>
                        )} */}
                    </TableBody>
                    {couriers?.length > 0 && (
                        <TableFooterPagination
                            rowsPerPageOptions={[
                                10, 20, 50, 100, 300,
                            ]}
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
};

export default Couriers;

// const title = [];
