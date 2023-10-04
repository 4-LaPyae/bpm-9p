import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
    Box,
    Input,
    Stack,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Avatar,
    InputLabel,
    Typography,
    Grid,
    TextField,
    CircularProgress,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import { useSelector } from "react-redux";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkDatePicker from "../../../app/assets/theme/MkDatePicker";
import { format } from "date-fns";
import { allBook } from "../../../features/book/BookApi";

import {
    ExpensesAdd,
    ExpensesUpdate,
    GetExpensesDetail,
    GetExpensesList,
} from "../../../features/expenses/expensesApi";

export default function AddExpense({
    publisher_id,
    book_id,
    expense_category_id,
    expense_category_name,
    inputValues = null,
    popupOpen,
}) {
    const dispatch = useDispatch();

    //console.log(expense_category_id);
    // console.log(expense_category_id, "expCat");
    // console.log(book_id, "expCbook_idat");
    // console.log(publisher_id, "publisher_id");

    const { paginationData } = useSelector(
        (state) => state.BookSlice
    );
    const { expensesAddStatus, expensesUpdateStatus } = useSelector(
        (state) => state.ExpensesSlice
    );
    const [expenses, setExpense] = useState(null);
    const [amount, setAmount] = useState(null);
    const [expenseDate, setExpenseDate] = useState(null);
    const [description, setDescription] = useState(null);
    // const [note, setNote] = useState(null);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    function generateRandomNumbersAndAlphabets() {
        const timestamp = new Date().getTime(); // Get current timestamp
        const random = Math.random().toString(36).substring(2, 10); // Generate random string

        return `${random}${timestamp}${random}`;
    }

    // const uniqueId = generateRandomNumbersAndAlphabets();
    // console.log({ uniqueId });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        //console.log("close expense");
        setOpen(false);
        // setExpense(null);
        setAmount(null);
        // setNote(null);
        setExpenseDate(null);
        setDescription(null);
        setError(false);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        console.log("ok add");
        console.log({ expense_category_id });

        if (expenseDate && amount && description) {
            const data = {
                book_id: book_id,
                publisher_id: publisher_id,
                expense_list_id: expense_category_id,
                expense: {
                    expense_id: generateRandomNumbersAndAlphabets(),
                    description: description,
                    note: null,
                    amount: amount,
                    expense_date: expenseDate,
                    status: 1,
                },
            };
            //console.log({ data });
            //console.log({ inputValues });

            dispatch(
                inputValues
                    ? ExpensesUpdate({
                          data: data,
                          id: inputValues?.expense_id,
                      })
                    : ExpensesAdd({ data: data })
            )
                .unwrap()
                .then((result) => {
                    if (result.expense) {
                        console.log({ result });

                        console.log({
                            book_id,
                            publisher_id,
                        });

                        dispatch(
                            GetExpensesList({
                                book_id: book_id,
                                publisher_id: publisher_id,
                            })
                        );

                        dispatch(
                            GetExpensesDetail({
                                id: expense_category_id,
                                book_id: book_id,
                                publisher_id: publisher_id,
                            })
                        );

                        // dispatch(GetBookExpenses({ id: book_id }));
                        dispatch(
                            allBook({
                                id: publisher_id,
                                page: paginationData.page,
                                limit: paginationData.limit,
                                book_title: "",
                                author_name: "",
                                released_year: "",
                                genre: "",
                                edition: "",
                                release: "",
                            })
                        );
                    }
                });
            //close the model box
            //handleClose();
        }
    };

    useEffect(() => {
        if (inputValues) {
            setAmount(inputValues.amount);
            // setNote(inputValues.note);
            setExpenseDate(inputValues.expense_date);
            setDescription(inputValues.description);
            // setExpense(expense_category_id);
        }
    }, [open]);

    return (
        <>
            {inputValues ? (
                <Edit
                    sx={{
                        color: "green",
                        background: "#fff",
                        cursor: "pointer",
                        borderRadius: "100%",
                        width: "30px",
                        height: "30px",
                        padding: "5px",
                    }}
                    onClick={handleClickOpen}
                />
            ) : (
                <Button startIcon={<Add />} onClick={handleClickOpen}>
                    {/* Add */}
                </Button>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                // maxWidth="md"
                width="100%"
                component="form"
                fullWidth={true}
                sx={{ height: 700 }}
                onSubmit={handleAdd}
            >
                <DialogContent>
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                    >
                        <DialogContentText
                            sx={{
                                padding: "10px 0px 30px 0px ",
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                            }}
                        >
                            {inputValues
                                ? "Update In "
                                : "Add New In "}
                            {expense_category_name}
                        </DialogContentText>

                        <Grid
                            // container
                            direction="column"
                            justifyContent={"start"}
                            alignItems="center"
                            rowSpacing={3}
                        >
                            <Grid
                                item
                                xs={5.8}
                                // sx={{
                                //   visibility:
                                //     expenses?.id === 0 && expenses !== null ? "" : "hidden",
                                // }}
                            >
                                <InputFormComponent
                                    multiline={true}
                                    rows={2}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.currentTarget.value
                                        )
                                    }
                                    label="Description"
                                    name="description"
                                    placeholder="Enter Description"
                                />
                            </Grid>
                            <Grid item xs={3.8}>
                                <InputFormComponent
                                    type="text"
                                    value={amount}
                                    onKeyPress={(event) => {
                                        if (
                                            !/[0-9]/.test(event.key)
                                        ) {
                                            event.preventDefault();
                                            setError(true);
                                            console.log(
                                                "invalid input value"
                                            );
                                        } else {
                                            setError(false);
                                        }
                                    }}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    label="Expense Amount"
                                    name="amount"
                                    placeholder="Enter Expense Amount"
                                    required
                                />
                                {error ? (
                                    <Typography
                                        sx={{
                                            color: "red",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Please Type English number
                                        Only.
                                    </Typography>
                                ) : (
                                    ""
                                )}
                            </Grid>
                            <Grid item xs={3.8}>
                                <InputLabel
                                    sx={{ fontSize: "14.5px" }}
                                >
                                    Expenses Date
                                </InputLabel>
                                {/* <MkDatePicker
                    fullWidth
                    value={expenseDate}
                    onChange={(newValue) => {
                      setExpenseDate(newValue);
                    }}
                  /> */}

                                <TextField
                                    fullWidth
                                    type="date"
                                    value={expenseDate}
                                    onChange={(e) => {
                                        // console.log(e.target.value);
                                        setExpenseDate(
                                            e.target.value
                                        );
                                    }}
                                    placeholder="Choose Date"
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ padding: "10px 35px" }}>
                    {expensesAddStatus || expensesUpdateStatus ? (
                        <Button
                            variant="contained"
                            color="primary"
                            disabled
                            sx={{ mt: 3, mb: 2 }}
                            startIcon={
                                <CircularProgress
                                    size={20}
                                    color="inherit"
                                />
                            }
                        >
                            Loading...
                        </Button>
                    ) : (
                        <>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {inputValues ? "Update" : "Add"}
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}
