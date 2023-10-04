import React, { useState } from "react";
import { Box } from "@mui/material";
import ProductDrawer from "./ProductDrawer";
import MkButton from "../../../app/assets/theme/MkButton";
import { BookUpdate } from "../../../features/book/BookApi";
import EditIcon from "@mui/icons-material/Edit";
import { allExpenseCategories } from "../../../features/expense_category/ExpenseCategoryApi";
import { useDispatch } from "react-redux";

export default function ProductUpdateDrawer({ inputValues }) {
    /* +++++++++++++++++ Drawer +++++++++++++++++ */

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpen(true);
        console.log("Product update drawer open");
        dispatch(allExpenseCategories());
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    /* --------------------------------------------  */

    return (
        <Box>
            <ProductDrawer
                open={open}
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
                action={BookUpdate}
                inputValues={inputValues}
            >
                <EditIcon
                    onClick={handleDrawerOpen}
                    fontSize="small"
                    sx={{ cursor: "pointer", color: "#2152ff" }}
                />
            </ProductDrawer>
        </Box>
    );
}
