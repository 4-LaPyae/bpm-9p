import { TableCell, TableRow, Typography } from "@mui/material";
import MkChip from "../../app/assets/theme/MkChip";
import { Link } from "react-router-dom";

export default function AdminLists({ item }) {
    return (
        <TableRow>
            <TableCell align="right">
                <Link
                    to={`/admins/${item.name
                        ?.toLowerCase()
                        .split(" ")
                        .join("")}-diuu-${item.id}`}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        {item.name}
                    </Typography>
                </Link>
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
                {item.last_login !== null ? item.last_login : "Unknown"}
            </TableCell>
            <TableCell align="right">
                <MkChip active={item.active} />
            </TableCell>
        </TableRow>
    );
}
