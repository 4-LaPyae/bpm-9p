import { useTheme } from "@mui/material/styles";
import {
    Box,
    IconButton,
    TableFooter,
    TablePagination,
    TableRow,
} from "@mui/material";
import {
    FirstPage,
    LastPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from "@mui/icons-material";

function TablePaginationActions({
    count,
    page,
    rowsPerPage,
    onPageChange,
}) {
    const theme = useTheme();

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(
            event,
            Math.max(0, Math.ceil(count / rowsPerPage) - 1)
        );
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPage />
                ) : (
                    <FirstPage />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPage />
                ) : (
                    <LastPage />
                )}
            </IconButton>
        </Box>
    );
}

/*
 * That's not need!
 */
const TableFooterPagination = ({
    tableList,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPageOptions,
}) => {
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    colSpan={20}
                    count={tableList || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                            "aria-label": "rows per page",
                        },
                        native: true,
                    }}
                    sx={{
                        // "& .css-1nzs92f-MuiInputBase-root-MuiTablePagination-select":
                        //     {
                        //         margin: 0,
                        //     },
                        "& .MuiTablePagination-displayedRows": {
                            width: "100px",
                            textAlign: "right",
                        },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    );
};

export default TableFooterPagination;
