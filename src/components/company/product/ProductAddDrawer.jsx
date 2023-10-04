import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import ProductDrawer from "./ProductDrawer";
import MkButton from "../../../app/assets/theme/MkButton";
import { BookAdd } from "../../../features/book/BookApi";
import { initialSelectCategories } from "./SelectCategoriesFullScreenSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductAddDrawer() {
    /* +++++++++++++++++ Drawer +++++++++++++++++ */
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    //select categories full screen data
    const { select_categories } = useSelector(
        (state) => state.SelectCategoryListSlice
    );

    // console.log("open select_categories", select_categories);

    const handleDrawerOpen = () => {
        console.log("open");
        dispatch(initialSelectCategories());
        setOpen(true);
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
                action={BookAdd}
            >
                <MkButton
                    mkcolor={`linear-gradient(310deg, #2152ff, #02c6f3)`}
                    size="large"
                    textTransform="capitalize"
                    onClick={handleDrawerOpen}
                >
                    Add
                </MkButton>
            </ProductDrawer>
        </Box>
    );
}
