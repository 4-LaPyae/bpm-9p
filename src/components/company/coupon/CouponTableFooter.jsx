import { useTheme } from "@mui/material/styles";
import {
    Box,
    IconButton,
    TableFooter,
    TablePagination,
    TableRow,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const CouponTableFooter = ({
    tableList,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[10, 20]}
                    colSpan={3}
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

export default CouponTableFooter;
