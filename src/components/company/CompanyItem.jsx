import {
    Avatar,
    Box,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import MkChip from "../../app/assets/theme/MkChip";
import { Link, useNavigate } from "react-router-dom";
import MkSwitch from "../../app/assets/theme/MkSwitch";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { statusCompany } from "../../features/company/CompanyApi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { imageApi } from "../../app/hooks";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

export default function CompanyItem({ item }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [check, setCheck] = useState(item.active == 0 ? false : true);
    const handleCheck = (e) => {
        setCheck(e.target.checked);
        dispatch(statusCompany({ id: item.id }));
    };

    useEffect(() => {
        setCheck(item.active == 0 ? false : true);
    }, [item]);

    return (
        <TableRow key={item.id}>
            <TableCell>
                <Link
                    to={`/companies/${item.name
                        ?.toLowerCase()
                        .replace(" ", "")}-diuu-${item.company_key}`}
                >
                    <Stack direction="row" spacing={2}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                sx={{ width: 40, height: 40 }}
                                variant="rounded"
                                src={`${imageApi}/${item.company_logo}`}
                                alt={item.name}
                            />
                        </Box>
                        <Box
                            sx={{
                                textDecoration: "none",
                                color: "#67748e",
                            }}
                        >
                            <Typography variant="caption" component="div">
                                {item.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                component="div"
                                textAlign="left"
                            >
                                {item.phone}
                            </Typography>
                        </Box>
                    </Stack>
                </Link>
            </TableCell>
            <TableCell>
                <Typography variant="caption">{item.address}</Typography>
            </TableCell>
            <TableCell>
                <Stack>
                    <Typography variant="caption">
                        {item.contact_person}
                    </Typography>
                    <Typography variant="caption">
                        {item.contact_person_phone}
                    </Typography>
                </Stack>
            </TableCell>
            {/* <TableCell align="center">
                <ThemeProvider theme={labelTheme}>
                    <MkSwitch
                        switchColor={theme.palette.info.main}
                        checked={check}
                        onChange={handleCheck}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </ThemeProvider>
            </TableCell> */}
        </TableRow>
    );
}
