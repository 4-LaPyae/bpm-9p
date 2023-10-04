import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { getAdminList } from "../features/admin/AdminApi";
import TableToobar from "../app/components/Table/TableToolbar";
import TableFooterPagination from "../app/components/Table/TableFooterPagination";
import AdminLists from "../components/admin/AdminLists";

function Admin() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { adminList, adminPagination } = useSelector(
    (state) => state.adminList
  );

  useEffect(() => {
    dispatch(getAdminList());
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - adminList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ borderRadius: "10px" }} elevation={1}>
      <TableToobar>Admin Lists</TableToobar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "30%" }}>Name</TableCell>
              <TableCell sx={{ width: "30%" }}>Email</TableCell>
              <TableCell sx={{ width: "30%" }}>Last Login</TableCell>
              <TableCell align="center" width="100px">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? adminList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : adminList
            ).map((row) => (
              <AdminLists item={row} key={row.id} />
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 60.31 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooterPagination
            tableList={adminPagination?.total}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Admin;
