import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { useDispatch } from "react-redux";
import { reloadHandler } from "../../../features/login/LoginSlice";

function ProductTabView() {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(reloadHandler());
    // }, []);
    return (
        <>
            <ProductTable />
        </>
    );
}

export default ProductTabView;
