import { Box } from "@mui/material";
import React, { useState } from "react";
import ReturnBooksTabLink from "../components/returnBooks/ReturnBooksTabLink";
import ReturnBooksTabView from "../components/returnBooks/ReturnBooksTabView";

const ReturnBooks = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div>
            <Box>
                <ReturnBooksTabLink
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
            </Box>
            <Box>
                <ReturnBooksTabView
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
            </Box>
        </div>
    );
};

export default ReturnBooks;
