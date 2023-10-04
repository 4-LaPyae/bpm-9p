import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    Avatar,
    Box,
    Button,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Toolbar,
    Typography,
    IconButton,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import MkButton from "../../app/assets/theme/MkButton";
import {
    useTheme,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import { useSelector } from "react-redux";
import MkAutoComplete from "../../app/assets/theme/MkAutoComplete";
import { useDispatch } from "react-redux";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { getCustomerList } from "../../features/customer/CustomerApi";
import AddCustomer from "../customer/AddCustomer";
import ListCustomer from "../customer/ListCustomer";
import {
    chooseAddress,
    chooseUpdateAddress,
    resetAddress,
} from "../../features/customer/CustomerSlice";
import {
    addInvoiceSaleBook,
    addInvoices,
    allInvoiceSaleBook,
    updateInvoiceSaleBook,
    updateInvoices,
} from "../../features/invoices/invoicesApi";
import {
    addError,
    clearError,
    showAlert,
    showSuccess,
} from "../../app/components/Alert/alertSlice";
import SaleBookTable from "./SaleBookTable";
import { calculateInvoiceTotalAmount } from "../../app/helper/invoiceCalculation";
import {
    ResetStoreDamage,
    clearSelectedBook,
    handleInvoices,
    handleNewInvoices,
    resetOneTimeBook,
    storeDamage,
} from "../../features/invoices/invoicesSlice";
import { getCompanyDetail } from "../../features/company/CompanyApi";
import {
    calculateDamageBooksTotal,
    calculateStockChanges,
} from "../../app/helper/calculateStockChanges";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

const SaleNewInvoice = () => {
    const dispatch = useDispatch();
    const {
        invoices,
        selectedBooks,
        saleBooks,
        returnQty,
        oneTimeReturnBooks,
        damageBooks,
        damageStatus,
        tax,
        resellerDiscount,
        dis,
        oneTimeDamageBooks,
        pagination,
    } = useSelector((state) => state.InvoicesSlice);
    const nagivate = useNavigate();

    const { id } = useParams();
    const [phNumber, setPhNumber] = useState("");
    const [error, setError] = useState(false);
    const [chargesError, setChargesError] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const [name, setName] = useState("");
    const [divisionName, setDivisionName] = useState("");
    const [townshipName, setTownshipName] = useState("");
    const [cityName, setCityName] = useState("");
    const [addressName, setAddress] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryType, setDeliveryType] = useState(null);
    const [deliveryCost, setDeliveryCost] = useState("");
    const [deliveryCharges, setDeliveryCharges] = useState("");
    const [store, setStore] = useState("");
    const [vocherWeight, setVocherWeight] = useState("");
    const [trackingCode, setTrackingCode] = useState("");
    const [remark, setRemark] = useState("");
    const [paytype, setPaytype] = useState(null);
    const [payment, setPayment] = useState({
        id: "NONE",
        name: "NONE",
    });
    const [lodaing, setLoading] = useState(false);
    const [disabledStatus, setDisabledStatus] = useState(true);
    const { publisher, user } = useSelector(
        (state) => state.loginInfo
    );
    const [subTotal, setSubTotal] = useState(0);
    const f2KeyPressed = useRef(false);
    const { customerList, getStatus, address } = useSelector(
        (state) => state.CustomerSlice
    );
    const { dropDownCouriers } = useSelector(
        (state) => state.CouriersSlice
    );

    // usePrompt("Are you sure you want to leave?", phNumber.length > 0);
    const addPopup = () => {
        dispatch(
            getCustomerList({
                publisher_id: publisher[0]._id,
                phNumber: phNumber,
            })
        )
            .unwrap()
            .then((result) => {
                if (result.length > 0) {
                    setListOpen(true);
                } else {
                    setEditOpen(true);
                }
            });
    };

    const handleUpdateInvoices = (result, invoice = null) => {
        let currentInvoice = invoices;
        if (invoice) {
            currentInvoice = [invoice, ...invoices];
        }

        const newInvoices = currentInvoice.map((item) => {
            if (item._id === result.invoice_id) {
                return {
                    ...item,
                    sale_book: result,
                };
            } else {
                return item;
            }
        });
        dispatch(
            handleNewInvoices({ data: newInvoices, ...pagination })
        );
    };

    const addSaleBooks = (
        invoice_id,
        invoice_code,
        invoice = null,
        recentSelectedBooks = [],
        recentSaleBooks = null
    ) => {
        if (
            selectedBooks.length > 0 ||
            recentSelectedBooks.length > 0
        ) {
            const selectedBooksRecent =
                selectedBooks.length > 0
                    ? selectedBooks
                    : recentSelectedBooks;

            //! update to sales books
            console.log(oneTimeReturnBooks);
            console.log(oneTimeDamageBooks);
            const returnBooks = JSON.parse(
                localStorage.getItem("oneTimeReturnBooks")
            );
            const damageBooks = JSON.parse(
                localStorage.getItem("oneTimeDamageBooks")
            );
            const sale_books = selectedBooksRecent.map((item) => {
                return {
                    _id: item._id,
                    book_title: item.book_title,
                    authors: item.authors,
                    sale_price: Number(item.sale_price),
                    qty: Number(item.qty),
                    discount: Number(item.discount),
                    edition: item.edition,
                    total_amount: Number(
                        item.sale_price * item.qty - item.discount
                    ),
                    units: item.units,
                    balance_qty:
                        recentSaleBooks === null
                            ? Number(
                                  item.instock ?? item.balance_qty
                              ) - Number(item.qty)
                            : calculateStockChanges(
                                  recentSaleBooks?.books.map((i) => {
                                      return {
                                          id: i._id,
                                          initialQty: Number(i.qty),
                                          initialInstock: Number(
                                              i.balance_qty ??
                                                  i.instock
                                          ),
                                      };
                                  }),
                                  {
                                      id: item._id,
                                      currentQty: Number(item.qty),
                                  }
                              ) -
                              calculateDamageBooksTotal(
                                  //   oneTimeDamageBooks
                                  damageBooks
                              ),
                    returnBook: item.returnBook
                        ? returnBooks.length > 0
                            ? item.returnBook.concat(
                                  returnBooks.filter(
                                      (i) => i.book_id === item._id
                                  )
                              )
                            : item.returnBook
                        : returnBooks.filter(
                              (i) => i.book_id === item._id
                          ),
                    damageBook: item.damageBook
                        ? damageBooks.length > 0
                            ? item.damageBook.concat(
                                  damageBooks.filter(
                                      (i) => i.book_id === item._id
                                  )
                              )
                            : item.damageBook
                        : damageBooks.filter(
                              (i) => i.book_id === item._id
                          ),
                };
            });
            const net_amount = calculateInvoiceTotalAmount({
                sale_book: { books: sale_books },
            });

            const data = {
                invoice_id: invoice_id,
                invoice_code: invoice_code,
                publisher_id: publisher[0]?._id,
                books: sale_books,
                net_amount: net_amount + Number(deliveryCharges),
            };

            // return;
            if (recentSaleBooks == null) {
                dispatch(addInvoiceSaleBook({ data: data }))
                    .unwrap()
                    .then((result) => {
                        handleUpdateInvoices(result, {
                            ...invoice,
                            sale_book: data,
                        });
                        removeRecentInvoice();
                    });
                dispatch(resetOneTimeBook());
            } else {
                dispatch(
                    updateInvoiceSaleBook({
                        id: recentSaleBooks._id,
                        data: data,
                    })
                )
                    .unwrap()
                    .then((result) => {
                        handleUpdateInvoices(result, null);
                        removeRecentInvoice();
                    });
                dispatch(resetOneTimeBook());
            }
        }
    };

    const invoiceData = () => {
        return {
            publisher_id: publisher[0]?._id,
            customer: address,
            store: store,
            delivery_date: deliveryDate,
            courier: {
                courier_id: deliveryType?._id,
                name: deliveryType?.name,
                charges: deliveryType?.charges,
            },
            pay_type: paytype?.name,
            tracking_code: trackingCode,
            remark: remark,
            delivery_charges: Number(deliveryCharges),
            voucher_weight: Number(vocherWeight),
            user: {
                id: user?._id,
                name: user?.name,
            },
            invoice_payment: payment,
            commercial_tax: tax,
            reseller_discount: resellerDiscount ?? 0,
            normal_discount: dis,
        };
    };

    const handleInvoice = (recentInvoice = null) => {
        //! check required filed
        if (
            recentInvoice ||
            (address &&
                deliveryDate &&
                deliveryType &&
                paytype &&
                deliveryCharges)
            // true
        ) {
            setDisabledStatus(true);
            setLoading(true);

            const data = recentInvoice ?? invoiceData();
            //!update
            if (id) {
                const paramsId = id.split("-")[1];
                dispatch(updateInvoices({ data: data, id: paramsId }))
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
                                    "Invoice updated successfully."
                                )
                            );
                            dispatch(clearError());
                            addSaleBooks(
                                paramsId,
                                result.data.invoice_code,
                                null,
                                getRecentInvoice("selectedBooks"),
                                getRecentInvoice("saleBooks")
                            );
                            nagivate(`/sales`);
                        }
                        dispatch(showAlert());
                        setDisabledStatus(false);
                        setLoading(false);
                    });
            } else {
                dispatch(addInvoices({ data: data }))
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
                                    "Invoice created successfully."
                                )
                            );
                            dispatch(clearError());
                            addSaleBooks(
                                result.data._id,
                                result.data.invoice_code,
                                result.data,
                                getRecentInvoice("selectedBooks"),
                                getRecentInvoice("saleBooks")
                            );
                            // if (recentInvoice == null) {
                            nagivate(`/sales`);
                            // nagivate(
                            //     `/sales/INVOICE-${result.data._id}`
                            // );
                            // }
                        }
                        dispatch(showAlert());
                        setDisabledStatus(false);
                        setLoading(false);
                    });
            }
        } else {
            dispatch(
                addError("Fill all required fields. Try Again!")
            );
            dispatch(showAlert());
        }
    };

    //! subtotal

    useEffect(() => {
        if (selectedBooks.length > 0) {
            const sale_books = selectedBooks.map((item) => {
                return {
                    _id: item._id,
                    book_title: item.book_title,
                    authors: item.authors,
                    sale_price: Number(item.sale_price),
                    qty: Number(item.qty),
                    balance_qty: item.balance_qty,
                    discount: Number(item.discount),
                    total_amount: Number(
                        item.sale_price * item.qty - item.discount
                    ),
                };
            });

            const net_amount = calculateInvoiceTotalAmount({
                sale_book: { books: sale_books },
            });
            setSubTotal(net_amount);
        }
    }, [selectedBooks, deliveryCharges]);

    const handleRecentInvoice = () => {
        localStorage.setItem(
            "oneTimeReturnBooks",
            JSON.stringify(oneTimeReturnBooks)
        );
        localStorage.setItem(
            "oneTimeDamageBooks",
            JSON.stringify(oneTimeDamageBooks)
        );
        localStorage.setItem(
            "recentInvoice",
            JSON.stringify(invoiceData())
        );
        localStorage.setItem(
            "selectedBooks",
            JSON.stringify(selectedBooks)
        );
        localStorage.setItem("saleBooks", JSON.stringify(saleBooks));
    };

    const getRecentInvoice = (key) => {
        return JSON.parse(localStorage.getItem(key));
    };

    const removeRecentInvoice = () => {
        localStorage.removeItem("recentInvoice");
        localStorage.removeItem("selectedBooks");
        localStorage.removeItem("saleBooks");
        localStorage.removeItem("oneTimeReturnBooks");
        localStorage.removeItem("oneTimeDamageBooks");
    };

    //! you can see the stupid dependency array because fn key don't work it value change so we need to re-render
    useEffect(() => {
        //! local storage handler
        if (
            address &&
            deliveryDate &&
            deliveryType &&
            paytype &&
            deliveryCharges
        ) {
            handleRecentInvoice();
        }

        const handleKeyDown = (event) => {
            if (event.key === "F2") {
                event.preventDefault();
                if (!f2KeyPressed.current) {
                    f2KeyPressed.current = true;
                    handleInvoice(null);
                }
            }

            if (event.key === "Escape") {
                event.preventDefault();
                if (!f2KeyPressed.current) {
                    f2KeyPressed.current = true;
                    // handleInvoice();
                    nagivate("/sales");
                }
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === "F2" || event.key === "Escape") {
                f2KeyPressed.current = false;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [
        address,
        trackingCode,
        deliveryDate,
        deliveryType,
        deliveryCost,
        deliveryCharges,
        paytype,
        store,
        vocherWeight,
        remark,
        id,
        selectedBooks,
        payment,
        tax,
        resellerDiscount,
        oneTimeDamageBooks,
        oneTimeReturnBooks,
    ]);

    useEffect(() => {
        if (id) {
            const paramsId = id.split("-")[1];
            const invoice = invoices.find(
                (item) => item._id === paramsId
            );
            setPhNumber(invoice?.customer?.phone);
            setName(invoice?.customer?.name);
            setDivisionName(invoice?.customer?.division?.name);
            setCityName(invoice?.customer?.city?.name);
            setTownshipName(invoice?.customer?.township?.name);
            setAddress(invoice?.customer?.address);
            setTrackingCode(invoice?.tracking_code);
            setDeliveryDate(invoice?.delivery_date);
            setDeliveryType({
                _id: invoice?.courier?.courier_id,
                name: invoice?.courier?.name,
                charges: invoice?.courier?.charges,
            });
            setDeliveryCost(invoice?.courier?.charges);
            setDeliveryCharges(invoice?.delivery_charges);
            setPaytype(
                invoice?.pay_type === "COD"
                    ? { id: 0, name: "COD" }
                    : { id: 0, name: "NONE" }
            );
            setStore(invoice?.store);
            setVocherWeight(invoice?.voucher_weight);
            setRemark(invoice?.remark);
            setDisabledStatus(false);
            setPayment(invoice?.invoice_payment);
            dispatch(chooseAddress(invoice?.customer));
            dispatch(allInvoiceSaleBook({ id: paramsId }));
        }
    }, [id]);

    useEffect(() => {
        setName(address?.name);
        setDivisionName(address?.division?.name);
        setTownshipName(address?.township?.name);
        setCityName(address?.city?.name);
        setAddress(address?.address);
        if (address?.name) {
            setDisabledStatus(false);
        }
    }, [address]);

    // useEffect(() => {
    //     dispatch(ResetStoreDamage());
    // }, []);

    useEffect(() => {
        return () => {
            handleInvoice(getRecentInvoice("recentInvoice"));
        };
    }, []);

    return (
        <>
            {/* <Dialog open={showPrompt}>
                <DialogTitle>Confirm Leaving Page</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to leave this page?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelNavigation}>Stay</Button>
                    <Button onClick={confirmNavigation}>Leave</Button>
                </DialogActions>
            </Dialog> */}
            <Box component="form">
                <Box component={Paper} sx={{ padding: "25px" }}>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={12} md={4}>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2 }}
                            >
                                {/* phone number */}
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        value={phNumber}
                                        onChange={(e) => {
                                            setPhNumber(
                                                e.currentTarget.value
                                            );
                                            setName("");
                                            setAddress("");
                                            setTownshipName("");
                                            setCityName("");
                                            setDivisionName("");
                                            // dispatch(resetAddress());
                                        }}
                                        onKeyPress={(event) => {
                                            if (
                                                event.key ==
                                                    "Enter" &&
                                                phNumber.length > 8 &&
                                                phNumber.length < 12
                                            ) {
                                                event.preventDefault();
                                                addPopup();
                                            } else {
                                                if (
                                                    !/[0-9]/.test(
                                                        event.key
                                                    )
                                                ) {
                                                    event.preventDefault();
                                                    setError(true);
                                                    console.log(
                                                        "invalid input value"
                                                    );
                                                } else {
                                                    setError(false);
                                                }
                                            }
                                        }}
                                        label="Phone Number"
                                        name="Phone Number"
                                        placeholder="Enter Your Phone Number"
                                        disabled={
                                            publisher ? false : true
                                        }
                                        required
                                        endAdornment={
                                            phNumber.length > 8 &&
                                            phNumber.length < 12 ? (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={
                                                            addPopup
                                                        }
                                                        disabled={
                                                            getStatus ===
                                                            "pending"
                                                                ? true
                                                                : false
                                                        }
                                                        sx={{
                                                            color: "green",
                                                        }}
                                                    >
                                                        <AddBoxIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : (
                                                <></>
                                            )
                                        }
                                    />
                                    {error ? (
                                        <Typography
                                            sx={{
                                                color: "red",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Please Type English Number
                                            Only.
                                        </Typography>
                                    ) : (
                                        ""
                                    )}
                                </Grid>
                                {/* name */}
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        value={name ?? ""}
                                        onChange={(e) =>
                                            setFirstName(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Name"
                                        name="first_name"
                                        placeholder="Enter Your  Name"
                                        required
                                        disabled
                                    />
                                </Grid>
                                {/* address information*/}
                                <Grid item xs={12}>
                                    <InputFormComponent
                                        multiline={true}
                                        rows={2}
                                        value={
                                            address != null
                                                ? `${addressName}, ${townshipName}, ${cityName}, ${divisionName}`
                                                : ""
                                        }
                                        label="Address Information"
                                        name="address"
                                        disabled
                                        placeholder={
                                            "Address Information"
                                        }
                                    />
                                </Grid>
                                {/* delivery type */}
                                <Grid item xs={12} md={6}>
                                    <InputLabel
                                        htmlFor="edition_select"
                                        sx={{
                                            fontSize: "14.5px",
                                            mb: 1,
                                        }}
                                    >
                                        Delivery Type *
                                    </InputLabel>

                                    <MkAutoComplete
                                        name="delivery_type"
                                        fullWidth
                                        placeholder="Choose delivery type"
                                        options={dropDownCouriers}
                                        isOptionEqualToValue={(
                                            option,
                                            value
                                        ) =>
                                            option?._id === value?._id
                                        }
                                        getOptionLabel={(option) =>
                                            option.name
                                        }
                                        onChange={(
                                            event,
                                            newValue
                                        ) => {
                                            setDeliveryCost(
                                                newValue?.charges
                                            );
                                            setDeliveryType(newValue);
                                        }}
                                        value={deliveryType}
                                        disabled={disabledStatus}
                                    />
                                </Grid>
                                {/* delivery cost */}
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        value={deliveryCost ?? ""}
                                        onChange={(e) =>
                                            setDeliveryCost(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Delivery Cost"
                                        name="delivery_cost"
                                        placeholder="Enter delivery cost"
                                        required
                                        disabled
                                    />
                                </Grid>
                                {/* delivery date */}
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        value={deliveryDate ?? ""}
                                        onChange={(e) =>
                                            setDeliveryDate(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Delivery Date *"
                                        name="delivery_date"
                                        placeholder="Choose delivery date"
                                        required
                                        disabled={disabledStatus}
                                        type="date"
                                    />
                                </Grid>
                                {/* tracking code */}
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        value={trackingCode ?? ""}
                                        onChange={(e) =>
                                            setTrackingCode(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Tracking Code"
                                        name="tracking_code"
                                        placeholder="Enter Tracking Code"
                                        disabled={disabledStatus}
                                    />
                                </Grid>
                                {/* deli charges */}
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        value={deliveryCharges ?? ""}
                                        onChange={(e) =>
                                            setDeliveryCharges(
                                                e.currentTarget.value
                                            )
                                        }
                                        onKeyPress={(event) => {
                                            if (
                                                event.key ==
                                                    "Enter" &&
                                                phNumber.length > 8 &&
                                                phNumber.length < 12
                                            ) {
                                                event.preventDefault();
                                                addPopup();
                                            } else {
                                                if (
                                                    !/[0-9]/.test(
                                                        event.key
                                                    )
                                                ) {
                                                    event.preventDefault();
                                                    setChargesError(
                                                        true
                                                    );
                                                    console.log(
                                                        "invalid input value"
                                                    );
                                                } else {
                                                    setChargesError(
                                                        false
                                                    );
                                                }
                                            }
                                        }}
                                        label="Delivery Charges *"
                                        name="delivery_charges"
                                        placeholder="Enter delivery charges"
                                        required
                                        disabled={disabledStatus}
                                    />
                                    {chargesError ? (
                                        <Typography
                                            sx={{
                                                color: "red",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Please Type English Number
                                            Only.
                                        </Typography>
                                    ) : (
                                        ""
                                    )}
                                </Grid>
                                {/* pay type */}
                                <Grid item xs={12} md={6}>
                                    <InputLabel
                                        htmlFor="edition_select"
                                        sx={{
                                            fontSize: "14.5px",
                                            mb: 1,
                                        }}
                                    >
                                        Pay Type *
                                    </InputLabel>

                                    <MkAutoComplete
                                        name="paytype"
                                        fullWidth
                                        placeholder="Choose Paytype"
                                        options={[
                                            { id: 0, name: "NONE" },
                                            { id: 1, name: "COD" },
                                        ]}
                                        isOptionEqualToValue={(
                                            option,
                                            value
                                        ) => option?.id === value?.id}
                                        getOptionLabel={(option) =>
                                            option.name
                                        }
                                        onChange={(
                                            event,
                                            newValue
                                        ) => {
                                            setPaytype(newValue);
                                        }}
                                        value={paytype}
                                        disabled={disabledStatus}
                                    />
                                </Grid>

                                {/* vocher */}
                                <Grid item xs={12} md={6}>
                                    <InputFormComponent
                                        value={vocherWeight ?? ""}
                                        onChange={(e) =>
                                            setVocherWeight(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Vocher Weight (kg)"
                                        name="vocher_weight"
                                        placeholder="Enter Vocher Weight"
                                        disabled={disabledStatus}
                                    />
                                </Grid>

                                {/* payment type */}
                                <Grid item xs={12} md={6}>
                                    <InputLabel
                                        htmlFor="edition_select"
                                        sx={{
                                            fontSize: "14.5px",
                                            mb: 1,
                                        }}
                                    >
                                        Invoice Payment
                                    </InputLabel>

                                    <MkAutoComplete
                                        name="payment"
                                        fullWidth
                                        placeholder="Choose Payment"
                                        options={[
                                            {
                                                id: "NONE",
                                                name: "NONE",
                                            },
                                            {
                                                id: "CBPAY",
                                                name: "CB Pay",
                                            },
                                            {
                                                id: "KBZPAY",
                                                name: "KBZ Pay",
                                            },
                                            {
                                                id: "WAVEPAY",
                                                name: "Wave Pay",
                                            },
                                        ]}
                                        isOptionEqualToValue={(
                                            option,
                                            value
                                        ) => option?.id === value?.id}
                                        getOptionLabel={(option) =>
                                            option.name
                                        }
                                        onChange={(
                                            event,
                                            newValue
                                        ) => {
                                            setPayment(newValue);
                                        }}
                                        value={payment}
                                        disabled={disabledStatus}
                                    />
                                </Grid>

                                {/* remark */}
                                <Grid item xs={12}>
                                    <InputFormComponent
                                        multiline={true}
                                        rows={2}
                                        value={remark ?? ""}
                                        onChange={(e) =>
                                            setRemark(
                                                e.currentTarget.value
                                            )
                                        }
                                        label="Remark"
                                        name="remark"
                                        placeholder="Enter remark"
                                        disabled={disabledStatus}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <SaleBookTable
                                subtotal={subTotal}
                                deliCharge={deliveryCharges}
                            />
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                    marginTop: "10px",
                                }}
                            >
                                {/* <MkButton
                                    mkcolor={`linear-gradient(310deg, #2152ff, #02c6f3)`}
                                    size="lg"
                                    disabled={disabledStatus}
                                    onClick={() => {
                                        handleInvoice(null);
                                    }}
                                >
                                    {lodaing
                                        ? "Submitting data ..."
                                        : "Save (F2)"}
                                </MkButton> */}
                                <AddCustomer
                                    inputValue={customerList}
                                    open={editOpen}
                                    setOpen={setEditOpen}
                                    publisher={publisher}
                                    phNumber={phNumber}
                                    setPhNumber={setPhNumber}
                                ></AddCustomer>
                                <ListCustomer
                                    open={listOpen}
                                    setOpen={setListOpen}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default SaleNewInvoice;
