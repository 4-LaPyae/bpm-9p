import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ComponenttoPrintData from "./ComponenttoPrintData";
import "./printer.css";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { formatMoney } from "../../../app/helper/formatMoney";
import { calculateInvoiceTotalDiscount } from "../../../app/helper/invoiceCalculation";

const ComponenttoPrint = forwardRef((props, ref) => {
    const { selectedInvoices } = useSelector(
        (state) => state.InvoicesSlice
    );
    const { setting } = useSelector((state) => state.SettingSlice);

    let ary = [];
    let splitObjects = [];
    const statusValues = [];

    for (let i = 1; i <= 125; i++) {
        statusValues.push(i);
    }
    // check which object has word length total is greater than 600
    const titleLengths = [];
    console.log(selectedInvoices);

    selectedInvoices.forEach((item) => {
        let totalLength = 0;
        if (item.sale_book === null) {
            totalLength = 0;
        } else {
            item.sale_book.books.forEach((book) => {
                totalLength += book.book_title.length;
            });
            titleLengths.push(totalLength);
        }
    });
    if (setting?.printer_type === 0) {
        selectedInvoices?.forEach((item, index) => {
            if (
                // item.sale_book.books.length > 8 &&
                titleLengths[index] > 800
            ) {
                const books = item.sale_book.books;
                let modifyBooks = [];
                for (let i = 0; i < books.length; i += 7) {
                    const slicedBooks = books.slice(i, i + 7);
                    const statusIndex = i / 7;
                    const newObj = {
                        ...item,
                        sale_book: {
                            books: slicedBooks,
                            status: statusValues[statusIndex],
                        },
                    };
                    modifyBooks.push(newObj);
                }
                console.log(modifyBooks);

                splitObjects.push(
                    ...modifyBooks.map((v, i) => {
                        return {
                            value: v,
                            status: statusValues[i],
                            isTotal:
                                modifyBooks.length - 1 === i
                                    ? true
                                    : false,
                        };
                    })
                );
            } else if (item.sale_book.books.length > 14) {
                const books = item.sale_book.books;
                let modifyBooks = [];
                for (let i = 0; i < books.length; i += 14) {
                    const slicedBooks = books.slice(i, i + 14);
                    const statusIndex = i / 14;

                    const newObj = {
                        ...item,
                        sale_book: {
                            books: slicedBooks,
                            status: statusValues[statusIndex],
                        },
                    };
                    modifyBooks.push(newObj);
                }

                splitObjects.push(
                    ...modifyBooks.map((v, i) => {
                        return {
                            value: v,
                            status: statusValues[i],
                            isTotal:
                                modifyBooks.length - 1 === i
                                    ? true
                                    : false,
                        };
                    })
                );
            } else {
                // Do something else if sale_book.books.length is not greater than 8
                let pushItem = {
                    value: item,
                    status: 1,
                    isTotal: true,
                };
                splitObjects.push(pushItem);
            }
        });
    }
    if (setting?.printer_type === 1) {
        selectedInvoices?.forEach((item, index) => {
            if (
                // item.sale_book.books.length > 4 &&
                titleLengths[index] > 600
            ) {
                // Do something if sale_book.books.length is greater than 8
                // console.log("Books length is greater than 8");
                // console.log(index);
                const books = item.sale_book.books;

                let modifyBooks = [];
                for (let i = 0; i < books.length; i += 4) {
                    const slicedBooks = books.slice(i, i + 4);
                    const statusIndex = i / 4;

                    const newObj = {
                        ...item,
                        sale_book: {
                            books: slicedBooks,
                            status: statusValues[statusIndex],
                        },
                    };
                    modifyBooks.push(newObj);
                }

                splitObjects.push(
                    ...modifyBooks.map((v, i) => {
                        return {
                            value: v,
                            status: statusValues[i],
                            isTotal:
                                modifyBooks.length - 1 === i
                                    ? true
                                    : false,
                        };
                    })
                );
            } else if (item.sale_book.books.length > 8) {
                const books = item.sale_book.books;

                let modifyBooks = [];
                for (let i = 0; i < books.length; i += 8) {
                    const slicedBooks = books.slice(i, i + 8);
                    const statusIndex = i / 8;

                    const newObj = {
                        ...item,
                        sale_book: {
                            books: slicedBooks,
                            status: statusValues[statusIndex],
                        },
                    };
                    modifyBooks.push(newObj);
                }

                splitObjects.push(
                    ...modifyBooks.map((v, i) => {
                        return {
                            value: v,
                            status: statusValues[i],
                            isTotal:
                                modifyBooks.length - 1 === i
                                    ? true
                                    : false,
                        };
                    })
                );
            } else {
                // Do something else if sale_book.books.length is not greater than 8
                let pushItem = {
                    value: item,
                    status: 1,
                    isTotal: true,
                };
                splitObjects.push(pushItem);
                console.log("Books length is not greater than 8");
            }
        });
    }
    if (setting?.printer_type === 3) {
        selectedInvoices?.forEach((item, index) => {
            let pushItem = {
                value: item,
                status: 1,
                isTotal: true,
            };
            splitObjects.push(pushItem);
        });
    }
    console.log(splitObjects);
    ary.push(splitObjects);

    return (
        // <></>
        <div
            ref={ref}
            className={
                setting?.printer_type === 0
                    ? "page-containerA4"
                    : setting?.printer_type === 1
                    ? "page-containerA5"
                    : "page-containerPOS"
            }
        >
            {ary[0]?.map((item) => (
                <div
                    className={
                        setting?.printer_type === 0
                            ? "print-containerA4"
                            : setting?.printer_type === 1
                            ? "print-containerA5"
                            : "print-containerPOS"
                    }
                >
                    <div>
                        <ComponenttoPrintData
                            key={item.invoice_code}
                            item={item}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
});

export default ComponenttoPrint;
