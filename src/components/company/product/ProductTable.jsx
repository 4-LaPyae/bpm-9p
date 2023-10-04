import {
    Box,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody,
    Stack,
    IconButton,
    InputLabel,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ProductAddDrawer from "../../../components/company/product/ProductAddDrawer";
import MkButton from "../../../app/assets/theme/MkButton/index";
import TableBar from "../../../app/components/Table/TableBar";
import { allBook } from "../../../features/book/BookApi";
import ProductTableBody from "./ProductTableBody";
import TableFooterPagination from "../../../app/components/Table/TableFooterPagination";
import {
    changePaginationData,
    resetBook,
} from "../../../features/book/BookSlice";
import SimpleInput from "../../../app/components/SimpleInput";
import YearPicker from "../../../app/components/YearPicker";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import CircularProgress from "@mui/material/CircularProgress";
import { resetCompanyDetail } from "../../../features/company/CompanySlice";
import SimpleSelect from "../../../app/components/SimpleSelect";

function ProductTable() {
    const dispatch = useDispatch();
    const { books, pagination, getStatus } = useSelector(
        (state) => state.BookSlice
    );
    const { companyDetail, loading } = useSelector(
        (state) => state.companyDetail
    );
    const { publisher } = useSelector((state) => state.loginInfo);

    const { genres_dropdown } = useSelector(
        (state) => state.GenreSlice
    );
    const { editions_dropdown } = useSelector(
        (state) => state.EditionSlice
    );

    // console.log("all books ", books);
    console.log("genres_dropdown ", genres_dropdown);
    // console.log("publisherDetail ", companyDetail);
    // console.log("loading ", loading);
    /* +++++++++++++++++ Pagination +++++++++++++++++ */

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [bookTitle, setBookTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [releaseYear, setReleaseYear] = useState(null);
    const [genreOption, setGenreOption] = useState(null);
    const [editionOption, setEditionOption] = useState(null);
    const [release, setRelease] = useState("");
    const [error, setError] = useState(false);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0
            ? rowsPerPage - books?.length
            : rowsPerPage - books?.length;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const publisher_id = JSON.parse(localStorage.getItem("auth"))
        ?.publisher[0]?._id;

    useEffect(() => {
        if (books?.length === 0) {
            setRowsPerPage(10);
            setPage(0);
        }
    }, [pagination]);

    useEffect(() => {
        // dispatch(resetCompanyDetail());
        dispatch(
            allBook({
                // id: publisher_id,
                id: publisher_id,
                page: page + 1,
                limit: rowsPerPage,
                book_title: bookTitle ?? "",
                author_name: authorName ?? "",
                released_year: releaseYear?.$y ?? "",
                genre: genreOption?._id ?? "",
                edition: editionOption?._id ?? "",
                release,
            })
        );
        dispatch(
            changePaginationData({
                page: page + 1,
                limit: rowsPerPage,
            })
        );
    }, [page, rowsPerPage, loading, publisher_id]);

    return (
        <Box component={Paper} sx={{ padding: "20px 8px" }}>
            <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" alignItems={"center"}>
                    <Box sx={{ width: 195, marginLeft: 0 }}>
                        {/* <SimpleSelect
                            id="Genre"
                            name="genre_select"
                            autoFocus={false}
                            options={[
                                {
                                    _id: 0,
                                    name: "Choose Edition .. ",
                                },
                                ...genres_dropdown,
                            ]}
                            value={genreOption}
                            onChange={(e) =>
                                setBookEdition(e.target.value)
                            }
                            getOptionLabel="name"
                            endAdornment={
                                <IconButton
                                    sx={{
                                        visibility: genreOption
                                            ? "visible"
                                            : "hidden",
                                    }}
                                    onClick={() => {
                                        setGenreOption(0);
                                    }}
                                >
                                    <ClearIcon
                                        sx={{
                                            fontSize: "14.5px",
                                            marginRight: "3px",
                                        }}
                                    />
                                </IconButton>
                            }
                        /> */}
                        <MkAutoComplete
                            name="genre"
                            fullWidth
                            placeholder="Genre Name"
                            options={genres_dropdown}
                            isOptionEqualToValue={(option, value) => {
                                option?._id === value?._id;
                            }}
                            // disableClearable
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                                setGenreOption(newValue);
                                if (newValue === null) {
                                    dispatch(
                                        allBook({
                                            id: publisher[0]?._id,
                                            page: page + 1,
                                            limit: rowsPerPage,
                                            book_title:
                                                bookTitle ?? "",
                                            author_name:
                                                authorName ?? "",
                                            released_year:
                                                releaseYear?.$y ?? "",
                                            genre: "",
                                            edition:
                                                editionOption?.id ??
                                                "",
                                            release,
                                        })
                                    );
                                }
                            }}
                            value={genreOption}
                        />
                    </Box>
                    <Box sx={{ width: "150px", marginLeft: 0.5 }}>
                        <MkAutoComplete
                            name="edition"
                            fullWidth
                            placeholder="Edition"
                            options={editions_dropdown}
                            isOptionEqualToValue={(option, value) => {
                                option?._id === value?._id;
                            }}
                            // disableClearable
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                                setEditionOption(newValue);
                                if (newValue === null) {
                                    dispatch(
                                        allBook({
                                            id: publisher[0]?._id,
                                            page: page + 1,
                                            limit: rowsPerPage,
                                            book_title:
                                                bookTitle ?? "",
                                            author_name:
                                                authorName ?? "",
                                            released_year:
                                                releaseYear?.$y ?? "",
                                            genre:
                                                genreOption?._id ??
                                                "",
                                            edition: "",
                                            release,
                                        })
                                    );
                                }
                            }}
                            value={editionOption}
                        />
                    </Box>
                    <Box sx={{ width: "115px", marginLeft: 0.5 }}>
                        <SimpleInput
                            name="release"
                            placeholder="Release"
                            value={release}
                            onChange={(e) =>
                                setRelease(e.target.value)
                            }
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    setError(true);
                                } else {
                                    setError(false);
                                }
                            }}
                            endAdornment={
                                <IconButton
                                    sx={{
                                        visibility: release
                                            ? "visible"
                                            : "hidden",
                                    }}
                                    onClick={() => {
                                        setRelease("");
                                        dispatch(
                                            allBook({
                                                id: publisher[0]?._id,
                                                page: page + 1,
                                                limit: rowsPerPage,
                                                book_title: bookTitle,
                                                author_name:
                                                    authorName ?? "",
                                                released_year:
                                                    releaseYear?.$y ??
                                                    "",
                                                genre:
                                                    genreOption?._id ??
                                                    "",
                                                edition:
                                                    editionOption?._id ??
                                                    "",
                                                release: "",
                                            })
                                        );
                                    }}
                                >
                                    <ClearIcon
                                        sx={{
                                            fontSize: "14.5px",
                                        }}
                                    />
                                </IconButton>
                            }
                        />
                    </Box>
                    <Box sx={{ width: "135px", marginLeft: 0.5 }}>
                        <SimpleInput
                            name="book_title"
                            placeholder="Book Name"
                            value={bookTitle}
                            onChange={(e) =>
                                setBookTitle(e.target.value)
                            }
                            endAdornment={
                                <IconButton
                                    sx={{
                                        visibility: bookTitle
                                            ? "visible"
                                            : "hidden",
                                    }}
                                    onClick={() => {
                                        setBookTitle("");
                                        dispatch(
                                            allBook({
                                                id: publisher[0]?._id,
                                                page: page + 1,
                                                limit: rowsPerPage,
                                                book_title: "",
                                                author_name:
                                                    authorName ?? "",
                                                released_year:
                                                    releaseYear?.$y ??
                                                    "",
                                                genre:
                                                    genreOption?._id ??
                                                    "",
                                                edition:
                                                    editionOption?._id ??
                                                    "",
                                                release,
                                            })
                                        );
                                    }}
                                >
                                    <ClearIcon
                                        sx={{
                                            fontSize: "14.5px",
                                        }}
                                    />
                                </IconButton>
                            }
                        />
                    </Box>
                    <Box sx={{ width: "145px", marginLeft: 0.5 }}>
                        <SimpleInput
                            name="author_name"
                            placeholder="Author Name"
                            value={authorName}
                            onChange={(e) =>
                                setAuthorName(e.target.value)
                            }
                            endAdornment={
                                <IconButton
                                    sx={{
                                        visibility: authorName
                                            ? "visible"
                                            : "hidden",
                                    }}
                                    onClick={() => {
                                        setAuthorName("");
                                        dispatch(
                                            allBook({
                                                id: publisher[0]?._id,
                                                page: page + 1,
                                                limit: rowsPerPage,
                                                book_title:
                                                    bookTitle ?? "",
                                                author_name: "",
                                                released_year:
                                                    releaseYear?.$y ??
                                                    "",
                                                genre:
                                                    genreOption?._id ??
                                                    "",
                                                edition:
                                                    editionOption?._id ??
                                                    "",
                                                release,
                                            })
                                        );
                                    }}
                                >
                                    <ClearIcon
                                        sx={{
                                            fontSize: "14.5px",
                                        }}
                                    />
                                </IconButton>
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            width: "155px",
                            marginLeft: 0.5,
                        }}
                    >
                        <YearPicker
                            views={["year"]}
                            placeholder="Release Year"
                            value={releaseYear}
                            onChange={(newValue) => {
                                setReleaseYear(newValue);
                                // dispatch(
                                //     allBook({
                                //         id: publisher[0]?._id,
                                //         page: page + 1,
                                //         limit: rowsPerPage,
                                //         book_title: bookTitle ?? "",
                                //         author_name: authorName ?? "",
                                //         released_year: "",
                                //         genre: genreOption?._id ?? "",
                                //         edition:
                                //             editionOption?._id ?? "",
                                //         release,
                                //     })
                                // );
                            }}
                        />
                    </Box>
                    <MkButton
                        sx={{ marginLeft: 0.5 }}
                        mkcolor={`linear-gradient(310deg, #0adc7f, #02f377)`}
                        size="large"
                        textTransform="capitalize"
                        onClick={() => {
                            // console.log(editionOption);
                            dispatch(
                                allBook({
                                    id: publisher[0]?._id,
                                    page: page + 1,
                                    limit: rowsPerPage,
                                    book_title: bookTitle ?? "",
                                    author_name: authorName ?? "",
                                    released_year:
                                        releaseYear?.$y ?? "",
                                    genre: genreOption?._id ?? "",
                                    edition: editionOption?._id ?? "",
                                    release,
                                })
                            );
                        }}
                    >
                        Search
                    </MkButton>
                    <MkButton
                        sx={{
                            marginLeft: 0.5,
                            display:
                                bookTitle === "" &&
                                authorName === "" &&
                                releaseYear === null &&
                                genreOption === null &&
                                editionOption === null &&
                                release === ""
                                    ? "none"
                                    : "block",
                        }}
                        mkcolor={`linear-gradient(310deg, #EA0606, #f70707)`}
                        size="large"
                        textTransform="capitalize"
                        onClick={() => {
                            setBookTitle("");
                            setAuthorName("");
                            setReleaseYear(null);
                            setGenreOption(null);
                            setEditionOption(null);
                            setRelease("");
                        }}
                    >
                        Clear
                    </MkButton>
                </Stack>
                <Box>
                    <ProductAddDrawer />
                </Box>
            </Stack>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    // background: "red",
                                    width: "10%",
                                }}
                                align="center"
                            >
                                <Typography variant="subtitle2">
                                    Cover/စာစဥ်
                                </Typography>
                            </TableCell>

                            <TableCell
                                sx={{
                                    width: "15%",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    Title
                                </Typography>
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{
                                    width: "10%",
                                    // background: "red",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    Edition / Release
                                </Typography>
                            </TableCell>

                            <TableCell
                                align="left"
                                sx={{
                                    width: "10%",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    align="center"
                                >
                                    Release Date
                                </Typography>
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{
                                    width: "10%",
                                    // background: "red",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textAlign="center"
                                    // width="100px"
                                >
                                    COGS
                                    {/* COGS <br />
                                    (Cost Of Goods Sold) */}
                                </Typography>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    width: "15%",
                                    // background: "red",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    align="center"
                                >
                                    Units
                                </Typography>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    width: "10%",
                                    // background: "red",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    UCost
                                </Typography>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    width: "10%",
                                    // background: "red",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    align="center"
                                >
                                    Expenses
                                </Typography>
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{
                                    width: "10%",
                                    // background: "red",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* {loading || getStatus ? ( */}
                        {getStatus ? (
                            <TableRow>
                                <TableCell
                                    colSpan={15}
                                    rowSpan={3}
                                    align="center"
                                >
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : books?.length === 0 ? (
                            <Typography
                                sx={{
                                    fontSize: "1.4rem",
                                    textAlign: "center",
                                    padding: "60px",
                                }}
                            >
                                Books are coming soon.
                            </Typography>
                        ) : (
                            books?.map((row, index) => (
                                <ProductTableBody
                                    item={row}
                                    key={index}
                                    companyDetail={companyDetail}
                                />
                            ))
                        )}

                        {/* {emptyRows > 0 && (
                            <TableRow
                                style={{ height: 53.3 * emptyRows }}
                            >
                                <TableCell colSpan={11} />
                            </TableRow>
                        )} */}
                    </TableBody>

                    {books?.length > 0 && !getStatus ? (
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
                    ) : (
                        <></>
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ProductTable;
