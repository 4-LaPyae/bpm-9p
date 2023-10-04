import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { getCompanyList } from "../features/company/CompanyApi";
import TableFooterPagination from "../app/components/Table/TableFooterPagination";
import TableToolbar from "../app/components/Table/TableToolbar";
import CompanyItem from "../components/company/CompanyItem";
import PaperComponent from "../app/assets/theme/PaperComponent";
import { useNavigate } from "react-router-dom";

export default function Company() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { companyList, companyPagination } = useSelector(
    (state) => state.companyList
  );

  //redirect to company
  const nagivate = useNavigate();
  const { company_id, company_name } = useSelector((state) => state.loginInfo);
  const company = companyList.find((item) => item.company_key === company_id);

  const { usersList } = useSelector((state) => state.companyUser);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? rowsPerPage - companyList.length : 0;

  // const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  // };

  useEffect(() => {
    if (company_id) {
      nagivate(
        `/companies/${company_name
          .toLowerCase()
          .replace(" ", "")}-diuu-${company_id}`,
        { replace: true }
      );
    }
  }, [company_id]);

  return (
    <Box
      sx={{ borderRadius: "10px", padding: "5px 25px 25px 25px" }}
      component={Paper}
    >
      <TableToolbar>
        <Typography variant='subtitle1'>Company Lists</Typography>
      </TableToolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "30%" }}>
                <Typography variant='subtitle2'>Company</Typography>
              </TableCell>
              <TableCell sx={{ width: "30%" }}>
                <Typography variant='subtitle2'>Address</Typography>
              </TableCell>
              <TableCell sx={{ width: "30%" }}>
                <Typography variant='subtitle2'>Contact</Typography>
              </TableCell>
              {/* <TableCell align="center" width="100px">
                                <Typography variant="subtitle2">
                                    Status
                                </Typography>
                            </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {companyList?.map((row, index) => (
              <CompanyItem item={row} key={index} />
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 85 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooterPagination
            tableList={companyPagination?.total}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 15, 30]}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}
