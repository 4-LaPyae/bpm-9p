import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    Box,
    Divider,
    Drawer,
    Grid,
    IconButton,
    InputLabel,
    Stack,
    Typography,
    List,
    ListItem,
    ListItemButton,
    TextField,
    CircularProgress,
    Button,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MkButton from "../../../app/assets/theme/MkButton";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { styled, useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import { searchAuthor } from "../../../features/author/AuthorApi";
import { onInitSearchAuthor } from "../../../features/author/AuthorSlice";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkDatePicker from "../../../app/assets/theme/MkDatePicker";
import { format } from "date-fns";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddExpense from "./AddExpense";
import { formatMoney } from "../../../app/helper/formatMoney";
import { DeleteForever, Edit } from "@mui/icons-material";
import { allBook } from "../../../features/book/BookApi";
import {
    ExpensesDelete,
    GetExpensesList,
    GetExpensesDetail,
} from "../../../features/expenses/expensesApi";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import FrontImageFile from "./FrontImageFile";
// import BackImageFile from "./BackImageFile";
import CoverImageFile from "./CoverImageFile";
import { imageApi } from "../../../app/hooks";
import SimpleSelect from "../../../app/components/SimpleSelect";
import ClearIcon from "@mui/icons-material/Clear";
import SelectCategoriesFullScreen from "./SelectCategoriesFullScreen";
import {
    overwriteCategories,
    initialSelectCategories,
} from "./SelectCategoriesFullScreenSlice";
import {
    addError,
    clearError,
    showAlert,
    showSuccess,
} from "../../../app/components/Alert/alertSlice";
import { resetExpenseDetail } from "../../../features/expenses/expensesSlice";
import { isNonNullChain } from "typescript";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
}));

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    width: 500,
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
    boxShadow: "none",
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={
            <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
        }
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
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
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function ProductDrawer({
    open: drawerOpen,
    onClose: drawerOnClose,
    inputValues = null,
    action,
    children,
}) {
    const dispatch = useDispatch();
    const theme = useTheme();

    //accordion
    const [expanded, setExpanded] = useState("panel1");
    const [expandedEx, setExpandedEx] = useState("panel3");

    const { expense_categories_dropdown } = useSelector(
        (state) => state.ExpenseCategorySlice
    );

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // console.log({ inputValues });

    const handleChangeDetail = (panel) => (event, newExpanded) => {
        console.log("handle change");
        setExpandedEx(newExpanded ? panel : false);
        if (newExpanded) {
            console.log({ panel });
            console.log({ inputValues });
            dispatch(resetExpenseDetail());

            dispatch(
                GetExpensesDetail({
                    id: panel,
                    book_id: inputValues?._id,
                    publisher_id: companyDetail?._id,
                })
            );
        }

        console.log(inputValues, "expandedEx");
    };

    // extra
    const { searchAuthorList, loading } = useSelector(
        (state) => state.SearchAuthorSlice
    );

    const { companyDetail } = useSelector(
        (state) => state.companyDetail
    );

    const { expensesList, expensesDetail, status, listStatus } =
        useSelector((state) => state.ExpensesSlice);

    const { paginationData, bookStatus } = useSelector(
        (state) => state.BookSlice
    );
    const { publisher } = useSelector((state) => state.loginInfo);

    const { genres_dropdown } = useSelector(
        (state) => state.GenreSlice
    );

    const { editions_dropdown } = useSelector(
        (state) => state.EditionSlice
    );

    // const { releases_dropdown } = useSelector((state) => state.ReleaseSlice);

    //select categories full screen data
    const { select_categories } = useSelector(
        (state) => state.SelectCategoryListSlice
    );

    //console.log("select_categories", select_categories);
    // console.log("edition_dropdown", editions_dropdown);
    // console.log("release_dropdown", releases_dropdown);
    /* +++++++++++++++++ Product +++++++++++++++++ */
    const [bookTitle, setBookTitle] = useState(null);
    const [bookEdition, setBookEdition] = useState(null);
    const [bookRelease, setBookRelease] = useState(1);
    const [salePrice, setSalePrice] = useState(null);
    const [bookAuthors, setBookAuthors] = useState([]);
    const [bookReviewLink, setBookReviewLink] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [units, setUnits] = useState(null);
    // const [genreOption, setGenreOption] = useState(null);
    const [bookGenre, setBookGenre] = useState([]);
    const [open, setOpen] = useState(false);
    const [exDetail, setExDetail] = useState([]);
    const [exList, setExList] = useState([]);
    const [serial, setSerial] = useState(null);
    const [deLoading, setDeloading] = useState(false);
    const [render, setRender] = useState(false);
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setRender(true);
        }, 1000);
        return () => clearTimeout(timeoutID);
    }, [status]);

    // image management
    // const [frontImage, setFrontImage] = useState(null);
    // const [backImage, setBackImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);

    // console.log("genres_dropdown", genres_dropdown);

    // author search
    const [options, setOptions] = useState([]);

    // console.log({ status });

    const closeNow = () => {
        setBookTitle(null);
        setBookEdition(null);
        setBookRelease(1);
        setSalePrice(null);
        setBookAuthors([]);
        drawerOnClose();
        setReleaseDate(null);
        setCoverImage(null);
        setBookGenre([]);
        setUnits(null);
        dispatch(onInitSearchAuthor());
        dispatch(initialSelectCategories());
        setExpandedEx("");
        setSerial(null);
        setDeloading(false);
        setBookReviewLink(null);

        console.log("close");
    };

    let authorData;
    if (inputValues) {
        // console.log(bookAuthors);
        authorData = bookAuthors?.map(
            (i) =>
                (i = {
                    author_id: i.author_id
                        ? i.author_id
                        : i._id
                        ? i._id
                        : null,
                    name: i.name,
                })
        );
    } else {
        authorData = bookAuthors?.map(
            (i) =>
                (i = {
                    author_id: i._id ? i._id : null,
                    name: i.name,
                })
        );
    }
    let requiredGenre;
    if (bookGenre) {
        requiredGenre = bookGenre?.map(
            (i) =>
                (i = {
                    genre_id: i._id,
                    name: i.name,
                })
        );
    }

    // console.log(requiredGenre);
    const authorClick = () => {
        console.log(publisher);
        const data = {
            publisher: {
                publisher_id: publisher[0]._id,
                name: publisher[0].name,
            },
            book_title: bookTitle,
            genres: [...requiredGenre],
            edition: {
                edition_id: bookEdition._id,
                name: bookEdition.name,
            },
            release: bookRelease,
            sale_price: +salePrice,
            units: +units,
            authors: authorData,
            review_link: bookReviewLink ? bookReviewLink : null,
            serial: serial,
            book_release_date: releaseDate
                ? format(new Date(releaseDate), "yyyy-MM-dd")
                : null,

            cover_image: coverImage?.startsWith("data")
                ? coverImage
                : null,
            book_image_front: null,
            book_image_back: null,
            total_expenses: 0,
            status: 1,
        };
        console.log(data);

        // For update
        if (bookAuthors.length > 0 && bookGenre.length > 0) {
            if ((bookTitle, bookRelease, data["edition"])) {
                // For update
                if (inputValues?._id) {
                    dispatch(
                        action({
                            data: data,
                            id: inputValues?._id,
                            // page: paginationData.page,
                            // limit: paginationData.limit,
                        })
                    )
                        .unwrap()
                        .then((result) => {
                            if (result.error || result.errors) {
                                dispatch(
                                    addError(
                                        "Something wrong. Try Again!"
                                    )
                                );
                            } else {
                                dispatch(
                                    showSuccess(
                                        "Book updated successfully."
                                    )
                                );
                                dispatch(clearError());
                            }
                            dispatch(showAlert());
                            closeNow();
                            return;
                        });
                }
                // For add
                dispatch(
                    action({
                        data: data,
                        page: paginationData.page,
                        limit: paginationData.limit,
                    })
                )
                    .unwrap()
                    .then((result) => {
                        console.log("res ", result);
                        if (result.error) {
                            dispatch(addError(result.message));
                        } else if (result.errors) {
                            dispatch(addError("There was an error"));
                        } else {
                            dispatch(
                                showSuccess(
                                    "Book created successfully"
                                )
                            );
                            dispatch(clearError());
                        }
                        dispatch(showAlert());
                        closeNow();
                        return;
                    });
            } else {
                dispatch(showAlert());
                dispatch(addError("Some fields are required"));
            }
        } else {
            dispatch(showAlert());
            dispatch(addError("Some fields is required"));
        }
        // closeNow();
    };

    const freeSoloProductAdd = (event, newValue) => {
        dispatch(onInitSearchAuthor());
        let modify;
        if (
            !newValue[newValue.length - 1]?.id &&
            event.target.value
        ) {
            modify = [
                ...newValue.slice(0, newValue.length - 1),
                { name: newValue[newValue.length - 1] },
            ];
            console.log(modify);
            setBookAuthors(modify);
            return;
        }
        setBookAuthors(newValue);
    };

    /* ----------------------------------------------------  */

    /* +++++++++++++++++ This will set up default value +++++++++++++++++ */

    useEffect(() => {
        if (inputValues) {
            console.log({ inputValues });
            setBookTitle(inputValues.book_title);
            setBookEdition(inputValues?.edition);
            setBookRelease(inputValues.release);
            setSalePrice(inputValues.sale_price);
            setBookAuthors(inputValues.authors);
            setBookReviewLink(inputValues.review_link);
            setSerial(inputValues.serial);
            setReleaseDate(
                format(
                    new Date(inputValues?.book_release_date),
                    "yyyy-MM-dd"
                )
            );

            setCoverImage(`${imageApi}${inputValues.cover_image}`);
            setUnits(inputValues.units);
            setExpanded("panel2");
            setBookGenre(inputValues?.genres);
            setExDetail(expense_categories_dropdown);
            dispatch(
                GetExpensesList({
                    book_id: inputValues?._id,
                    publisher_id: companyDetail?._id,
                })
            );
        }
    }, [drawerOpen]);

    /* --------------------------------------------  */

    // search author set up value
    useEffect(() => {
        if (loading === false) {
            setOptions([...searchAuthorList]);
        }
    }, [loading, searchAuthorList]);

    useEffect(() => {
        setBookGenre(select_categories);
    }, [select_categories]);

    // search author set up value
    useEffect(() => {
        setExList(expensesDetail);
        setExDetail(expense_categories_dropdown);
        // setExDetail(expensesDetail);
    }, [expensesList, expensesDetail]);

    const findMatch = (id) => {
        const matchObj = expensesList?.data?.find(
            (i) => i.expense_list_id === id
        );
        return matchObj
            ? matchObj.totalAmount
                ? matchObj.totalAmount
                : 0
            : 0;
    };

    return (
        <div>
            {children}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={closeNow}
            >
                <DrawerHeader
                    sx={{
                        position: "sticky",
                        top: 0,
                        borderBottom:
                            "0.2px solid rgba(0, 0, 0, 0.12)",
                        background: "#fff",
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <IconButton onClick={closeNow}>
                        <CloseIcon />
                    </IconButton>

                    {/* here is as your desire */}

                    {/* <Typography variant='subtitle2' sx={{ marginRight: "40px" }}>
            {inputValues?.book_title
              ? `${inputValues?.book_title} `
              : "Add New Book"}
          </Typography> */}

                    {/* --------------------------------------------  */}
                </DrawerHeader>
                <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                >
                    <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                    >
                        <Typography>
                            {inputValues
                                ? `Edit: ${inputValues.book_title}`
                                : "New Book"}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box
                            sx={{
                                width: 450,
                            }}
                        >
                            {/* here is as your desire */}

                            <Stack
                                direction="column"
                                spacing={2}
                                justifyContent="center"
                                // sx={{padding: 5}}
                            >
                                <Stack
                                    direction="row"
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    sx={{ flex: "1 1 100%" }}
                                >
                                    <Box
                                        sx={{
                                            width: "200px",
                                            marginLeft: "20px",
                                        }}
                                    >
                                        <InputLabel
                                            sx={{
                                                ml: 6,
                                                fontSize: "14.5px",
                                                p: 1,
                                            }}
                                        >
                                            Cover Photo
                                        </InputLabel>
                                        <CoverImageFile
                                            coverImageData={
                                                coverImage
                                            }
                                            onChange={(data) =>
                                                setCoverImage(data)
                                            }
                                        />
                                    </Box>
                                </Stack>

                                <Box sx={{ height: 65 }}>
                                    <InputFormComponent
                                        value={bookTitle}
                                        onChange={(e) =>
                                            setBookTitle(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Book Title"
                                        name="book_title"
                                        placeholder="Enter Book Title"
                                        focus={true}
                                        required
                                    />
                                </Box>

                                <Box sx={{ height: 65 }}>
                                    <InputFormComponent
                                        value={serial}
                                        onChange={(e) =>
                                            setSerial(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Serial Number or ISBN"
                                        name="serial number or ISBN"
                                        placeholder="Enter Serial"
                                    />
                                </Box>

                                <Grid item xs={12} md={6}>
                                    <InputLabel
                                        sx={{
                                            mb: 1,
                                            fontSize: "14.5px",
                                        }}
                                    >
                                        Select Genres
                                    </InputLabel>

                                    <MkAutoComplete
                                        multiple
                                        name="genres"
                                        fullWidth
                                        placeholder="Choose Genres"
                                        options={genres_dropdown}
                                        isOptionEqualToValue={(
                                            option,
                                            value
                                        ) =>
                                            option?._id === value?._id
                                        }
                                        getOptionLabel={(option) =>
                                            option.name
                                        }
                                        onOpen={() => {
                                            setOpen(true);
                                            dispatch(
                                                overwriteCategories(
                                                    bookGenre.map(
                                                        (i) => {
                                                            return {
                                                                ...i,
                                                                related_category_id:
                                                                    i.id,
                                                            };
                                                        }
                                                    )
                                                )
                                            );
                                        }}
                                        onChange={(
                                            event,
                                            newValue
                                        ) => {
                                            setBookGenre(newValue);
                                            dispatch(
                                                overwriteCategories(
                                                    newValue
                                                )
                                            );
                                        }}
                                        value={bookGenre || null}
                                    />
                                </Grid>

                                <SelectCategoriesFullScreen
                                    open={open}
                                    close={() => setOpen(false)}
                                    options={genres_dropdown}
                                    inputValues={bookGenre}
                                />

                                <Stack
                                    direction="row"
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                    sx={{ flex: "2 1 100%" }}
                                >
                                    <Box item xs={12} md={6}>
                                        <InputLabel
                                            htmlFor="edition_select"
                                            sx={{
                                                fontSize: "14.5px",
                                            }}
                                        >
                                            Edition
                                        </InputLabel>

                                        <MkAutoComplete
                                            name="edition"
                                            fullWidth
                                            placeholder="Choose Edition"
                                            options={
                                                editions_dropdown
                                            }
                                            isOptionEqualToValue={(
                                                option,
                                                value
                                            ) =>
                                                option?._id ===
                                                value?._id
                                            }
                                            getOptionLabel={(
                                                option
                                            ) => option.name}
                                            onChange={(
                                                event,
                                                newValue
                                            ) => {
                                                console.log(newValue);
                                                setBookEdition(
                                                    newValue
                                                );
                                            }}
                                            value={bookEdition}
                                            sx={{ width: "200px" }}
                                        />
                                    </Box>

                                    <Box item xs={12} md={6}>
                                        <Box item xs={12} md={6}>
                                            <InputFormComponent
                                                type="number"
                                                value={bookRelease}
                                                onChange={(e) =>
                                                    setBookRelease(
                                                        e
                                                            .currentTarget
                                                            .value
                                                    )
                                                }
                                                label="Release"
                                                name="book_release"
                                                placeholder="Enter Book Release"
                                                onWheel={() =>
                                                    document.activeElement.blur()
                                                }
                                            />
                                        </Box>
                                    </Box>
                                </Stack>

                                <Box>
                                    <InputLabel
                                        sx={{ fontSize: "14.5px" }}
                                    >
                                        Search Author
                                    </InputLabel>
                                    <MkAutoComplete
                                        multiple
                                        freeSolo
                                        name="author"
                                        fullWidth={true}
                                        placeholder="Typing Author Name"
                                        options={options}
                                        // filter Options return the data from server
                                        // because we filter from the server
                                        filterOptions={(
                                            option,
                                            state
                                        ) => {
                                            console.log(option);
                                            console.log(state);
                                            return options;
                                        }}
                                        filterSelectedOptions={true}
                                        getOptionLabel={(option) => {
                                            return option?.name;
                                        }}
                                        onChange={(
                                            event,
                                            newValue
                                        ) => {
                                            // const changeValue = {
                                            //   _id: newValue._id,
                                            //   name: newValue.name,
                                            // };
                                            freeSoloProductAdd(
                                                event,
                                                newValue
                                            );
                                            // freeSoloProductAdd(event, changeValue);
                                        }}
                                        onTextChange={(e) =>
                                            dispatch(
                                                searchAuthor({
                                                    name:
                                                        e.target
                                                            .value ||
                                                        null,
                                                })
                                            )
                                        }
                                        value={bookAuthors || null}
                                    />
                                </Box>

                                <Box sx={{ height: 65 }}>
                                    <InputLabel
                                        sx={{ fontSize: "14.5px" }}
                                    >
                                        Book Release Date
                                    </InputLabel>

                                    <TextField
                                        fullWidth
                                        type="date"
                                        value={releaseDate}
                                        onChange={(e) => {
                                            setReleaseDate(
                                                e.target.value
                                            );
                                        }}
                                        placeholder="Choose Release Date"
                                    />
                                </Box>

                                <Box sx={{ height: 65 }}>
                                    <InputFormComponent
                                        type="number"
                                        value={salePrice}
                                        onChange={(e) =>
                                            setSalePrice(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Book Sale Price"
                                        name="book_sale_price"
                                        placeholder="Enter Book Sale Price"
                                        onWheel={() =>
                                            document.activeElement.blur()
                                        }
                                    />
                                </Box>

                                <Box sx={{ height: 65 }}>
                                    <InputFormComponent
                                        type="number"
                                        value={units}
                                        onChange={(e) =>
                                            setUnits(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Units"
                                        name="units"
                                        placeholder="Enter Units"
                                        onWheel={() =>
                                            document.activeElement.blur()
                                        }
                                    />
                                </Box>

                                <Box sx={{ height: 65 }}>
                                    <InputFormComponent
                                        value={bookReviewLink}
                                        onChange={(e) =>
                                            setBookReviewLink(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Book Review Link"
                                        name="book_review_link"
                                        placeholder="Enter Book Review Link"
                                    />
                                </Box>
                                {bookStatus === "pending" ? (
                                    <Button
                                        disabled
                                        variant="gradient"
                                        fullWidth
                                        sx={{
                                            mt: 2,
                                            color: "linear-gradient(310deg, #2152ff, #02c6f3)",
                                        }}
                                    >
                                        Loading
                                    </Button>
                                ) : (
                                    <MkButton
                                        mkcolor={`linear-gradient(310deg, #2152ff, #02c6f3)`}
                                        size="small"
                                        onClick={authorClick}
                                    >
                                        {inputValues?.book_title
                                            ? `Update`
                                            : "Add"}
                                    </MkButton>
                                )}
                            </Stack>

                            {/* --------------------------------------------  */}
                        </Box>
                    </AccordionDetails>
                </Accordion>
                {/* expense */}
                <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                    sx={{ visibility: inputValues ? "" : "hidden" }}
                >
                    <AccordionSummary
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                    >
                        <Stack
                            width="100%"
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems={"center"}
                        >
                            <Typography>Expense Costs</Typography>
                            {expensesList === [] ? (
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <Typography
                                    fontSize="1.2rem"
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    Total Amount ={" "}
                                    {formatMoney(
                                        expensesList?.totalSum
                                    )}
                                </Typography>
                            )}
                        </Stack>
                    </AccordionSummary>
                    {listStatus === "pending" ? (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 10,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <AccordionDetails>
                            <Box
                                sx={{
                                    with: 450,
                                    padding: "5px 5px 20px 5px",
                                    overflowX: "scroll",
                                    height: "650px",
                                }}
                            >
                                <Stack
                                    direction="column"
                                    sx={{ marginTop: "10px" }}
                                >
                                    {exDetail?.map((item) => {
                                        return (
                                            <Grid
                                                key={item._id}
                                                container
                                                sx={{
                                                    marginBottom:
                                                        "5px",
                                                    position:
                                                        "relative",
                                                }}
                                            >
                                                <Accordion
                                                    expanded={
                                                        expandedEx ===
                                                        item?._id
                                                    }
                                                    onChange={handleChangeDetail(
                                                        item?._id
                                                    )}
                                                >
                                                    <AccordionSummary
                                                        aria-controls="panel3d-content"
                                                        id={item?._id}
                                                        key={
                                                            item?._id
                                                        }
                                                    >
                                                        <Stack
                                                            width="85%"
                                                            direction="row"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            spacing={
                                                                2
                                                            }
                                                            justifyContent="space-between"
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                {
                                                                    item.name
                                                                }
                                                            </Typography>

                                                            <Typography
                                                                sx={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    textAlign:
                                                                        "end",
                                                                    marginLeft:
                                                                        "100px",
                                                                }}
                                                            >
                                                                {formatMoney(
                                                                    findMatch(
                                                                        item._id
                                                                    )
                                                                )}
                                                            </Typography>
                                                        </Stack>
                                                    </AccordionSummary>

                                                    <AccordionDetails>
                                                        {status ===
                                                        "success" ? (
                                                            <Box
                                                                sx={{
                                                                    paddingBottom:
                                                                        "40px",
                                                                }}
                                                            >
                                                                {!exList?.error ? (
                                                                    <>
                                                                        {" "}
                                                                        {exList
                                                                            ?.data
                                                                            ?.expenses
                                                                            ?.length ===
                                                                        0 ? (
                                                                            <>
                                                                                No
                                                                                Expenses
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                {render && (
                                                                                    <>
                                                                                        {exList?.data?.expenses?.map(
                                                                                            (
                                                                                                detail,
                                                                                                index
                                                                                            ) => {
                                                                                                return (
                                                                                                    <Box
                                                                                                        key={
                                                                                                            index
                                                                                                        }
                                                                                                        // direction="row"
                                                                                                        // alignItems={"right"}
                                                                                                        sx={{
                                                                                                            width: "100%",
                                                                                                        }}
                                                                                                    >
                                                                                                        <List>
                                                                                                            <ListItem
                                                                                                                disablePadding
                                                                                                                sx={{
                                                                                                                    display:
                                                                                                                        "block",
                                                                                                                    borderBottom:
                                                                                                                        "1px solid",
                                                                                                                    cursor: "pointer",
                                                                                                                    marginTop:
                                                                                                                        "10px",
                                                                                                                }}
                                                                                                            >
                                                                                                                <Stack
                                                                                                                    direction="row"
                                                                                                                    spacing={
                                                                                                                        2
                                                                                                                    }
                                                                                                                    justifyContent="space-between"
                                                                                                                    alignItems={
                                                                                                                        "center"
                                                                                                                    }
                                                                                                                >
                                                                                                                    <Stack
                                                                                                                        direction="column"
                                                                                                                        spacing={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        justifyContent="space-between"
                                                                                                                        // alignItems={"center"}
                                                                                                                    >
                                                                                                                        <Stack
                                                                                                                            direction="row"
                                                                                                                            spacing={
                                                                                                                                20
                                                                                                                            }
                                                                                                                            justifyContent="space-between"
                                                                                                                            alignItems={
                                                                                                                                "center"
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <Typography width="100px">
                                                                                                                                {format(
                                                                                                                                    new Date(
                                                                                                                                        detail.expense_date
                                                                                                                                    ),
                                                                                                                                    "dd/MM/yyyy"
                                                                                                                                )}
                                                                                                                            </Typography>
                                                                                                                            <Typography
                                                                                                                                width="100px"
                                                                                                                                sx={{
                                                                                                                                    fontWeight:
                                                                                                                                        "bold",
                                                                                                                                    textAlign:
                                                                                                                                        "end",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {formatMoney(
                                                                                                                                    detail?.amount
                                                                                                                                )}
                                                                                                                            </Typography>
                                                                                                                        </Stack>

                                                                                                                        <Stack
                                                                                                                            direction="row"
                                                                                                                            spacing={
                                                                                                                                2
                                                                                                                            }
                                                                                                                            alignItems={
                                                                                                                                "center"
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <Typography>
                                                                                                                                {detail.description ??
                                                                                                                                    "N/A"}
                                                                                                                            </Typography>
                                                                                                                        </Stack>
                                                                                                                    </Stack>
                                                                                                                    <Stack
                                                                                                                        spacing={
                                                                                                                            1
                                                                                                                        }
                                                                                                                        alignItems={
                                                                                                                            "center"
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <AddExpense
                                                                                                                            expense_category_id={
                                                                                                                                expensesDetail
                                                                                                                                    ?.data
                                                                                                                                    ?.expense_list_id
                                                                                                                            }
                                                                                                                            expense_category_name={
                                                                                                                                item?._name
                                                                                                                            }
                                                                                                                            publisher_id={
                                                                                                                                companyDetail?._id
                                                                                                                            }
                                                                                                                            book_id={
                                                                                                                                inputValues?._id
                                                                                                                            }
                                                                                                                            inputValues={
                                                                                                                                detail
                                                                                                                            }
                                                                                                                        />
                                                                                                                        <DeleteForever
                                                                                                                            sx={{
                                                                                                                                color: "red",
                                                                                                                                background:
                                                                                                                                    "#fff",
                                                                                                                                cursor: "pointer",
                                                                                                                                borderRadius:
                                                                                                                                    "100%",
                                                                                                                                width: "30px",
                                                                                                                                height: "30px",
                                                                                                                                padding:
                                                                                                                                    "5px",
                                                                                                                            }}
                                                                                                                            onClick={(
                                                                                                                                event
                                                                                                                            ) => {
                                                                                                                                event.preventDefault();
                                                                                                                                setOpenAlert(
                                                                                                                                    true
                                                                                                                                );
                                                                                                                                dispatch(
                                                                                                                                    ExpensesDelete(
                                                                                                                                        {
                                                                                                                                            expense:
                                                                                                                                                detail,
                                                                                                                                            publisher_id:
                                                                                                                                                companyDetail._id,
                                                                                                                                            book_id:
                                                                                                                                                inputValues?._id,
                                                                                                                                            expense_list_id:
                                                                                                                                                expensesDetail
                                                                                                                                                    ?.data
                                                                                                                                                    ?.expense_list_id,
                                                                                                                                        }
                                                                                                                                    )
                                                                                                                                )
                                                                                                                                    .unwrap()
                                                                                                                                    .then(
                                                                                                                                        (
                                                                                                                                            result
                                                                                                                                        ) => {
                                                                                                                                            if (
                                                                                                                                                !result.error
                                                                                                                                            ) {
                                                                                                                                                console.log(
                                                                                                                                                    result
                                                                                                                                                );
                                                                                                                                                setDeloading(
                                                                                                                                                    false
                                                                                                                                                );
                                                                                                                                                dispatch(
                                                                                                                                                    GetExpensesList(
                                                                                                                                                        {
                                                                                                                                                            book_id:
                                                                                                                                                                inputValues?._id,
                                                                                                                                                            publisher_id:
                                                                                                                                                                companyDetail?._id,
                                                                                                                                                        }
                                                                                                                                                    )
                                                                                                                                                );
                                                                                                                                                dispatch(
                                                                                                                                                    GetExpensesDetail(
                                                                                                                                                        {
                                                                                                                                                            id: expensesDetail
                                                                                                                                                                ?.data
                                                                                                                                                                ?.expense_list_id,
                                                                                                                                                            book_id:
                                                                                                                                                                inputValues?._id,
                                                                                                                                                            publisher_id:
                                                                                                                                                                companyDetail?._id,
                                                                                                                                                        }
                                                                                                                                                    )
                                                                                                                                                );
                                                                                                                                                dispatch(
                                                                                                                                                    allBook(
                                                                                                                                                        {
                                                                                                                                                            id: companyDetail?._id,
                                                                                                                                                            page: paginationData.page,
                                                                                                                                                            limit: paginationData.limit,
                                                                                                                                                            book_title:
                                                                                                                                                                "",
                                                                                                                                                            author_name:
                                                                                                                                                                "",
                                                                                                                                                            released_year:
                                                                                                                                                                "",
                                                                                                                                                            genre: "",
                                                                                                                                                            edition:
                                                                                                                                                                "",
                                                                                                                                                            release:
                                                                                                                                                                "",
                                                                                                                                                        }
                                                                                                                                                    )
                                                                                                                                                );
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    );

                                                                                                                                setDeloading(
                                                                                                                                    true
                                                                                                                                );
                                                                                                                            }}
                                                                                                                        />
                                                                                                                    </Stack>
                                                                                                                </Stack>
                                                                                                            </ListItem>
                                                                                                        </List>
                                                                                                    </Box>
                                                                                                );
                                                                                            }
                                                                                        )}{" "}
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <Box
                                                                        // key={index}
                                                                        // direction="row"
                                                                        // alignItems={"right"}
                                                                        sx={{
                                                                            width: "100%",
                                                                        }}
                                                                    >
                                                                        {
                                                                            exList.message
                                                                        }
                                                                    </Box>
                                                                )}
                                                            </Box>
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    width: "100%",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                }}
                                                            >
                                                                <CircularProgress />
                                                            </Box>
                                                        )}
                                                        {deLoading ? (
                                                            <Box
                                                                sx={{
                                                                    width: "100%",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                }}
                                                            >
                                                                <CircularProgress />
                                                            </Box>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Stack
                                                    sx={{
                                                        position:
                                                            "absolute",
                                                        width: "50px",
                                                        right: 0,
                                                    }}
                                                >
                                                    <AddExpense
                                                        expense_category_id={
                                                            item?._id
                                                        }
                                                        expense_category_name={
                                                            item?.name
                                                        }
                                                        publisher_id={
                                                            companyDetail?._id
                                                        }
                                                        book_id={
                                                            inputValues?._id
                                                        }
                                                    />
                                                </Stack>
                                            </Grid>
                                        );
                                    })}
                                </Stack>
                                {/* total */}
                            </Box>
                        </AccordionDetails>
                    )}
                    {/* <AccordionDetails>Hello</AccordionDetails> */}
                </Accordion>
            </Drawer>
        </div>
    );
}
