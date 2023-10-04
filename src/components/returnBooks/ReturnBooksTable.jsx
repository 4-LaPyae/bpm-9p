import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

const ReturnBooksTable = (item) => {
    console.log(item);
    return (
        <TableRow>
            <TableCell>
                <Typography variant="caption">
                    {item.item.book_title} ({item.item.edition.name})
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="caption">
                    {item.item.invoice_code}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="caption">
                    {item.item.returnBook.return}
                </Typography>
            </TableCell>
        </TableRow>
    );
};

export default ReturnBooksTable;
