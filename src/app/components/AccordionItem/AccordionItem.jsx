import { Edit } from "@mui/icons-material";
import {
    createTheme,
    Accordion,
    ThemeProvider,
    AccordionSummary,
    Typography,
} from "@mui/material";
import React from "react";

const iconRotate = createTheme({
    components: {
        MuiAccordionSummary: {
            styleOverrides: {
                expandIconWrapper: {
                    transform: "rotate(0deg) !important",
                    "&.Mui-expanded": {
                        transform: "rotate(0deg) !important",
                    },
                },
            },
        },
    },
});

const AccordionItem = ({ handleChange, item, expanded }) => {
    return (
        <Accordion
            expanded={expanded == item.id}
            onChange={handleChange(item.id)}
            sx={{
                border: "1px solid #04040426",
                width: "100%",
            }}
            style={{ borderRadius: "10px", boxShadow: "0 0 0" }}
        >
            <ThemeProvider theme={iconRotate}>
                <AccordionSummary
                    expandIcon={
                        <Edit
                            sx={{
                                color: "#111111de",
                                border: "1px solid #a2a2a8",
                                padding: " 0.25rem",
                                borderRadius: " 5px",
                                fontSize: "27px",
                            }}
                        />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h6" sx={{ fontSize: "15px" }}>
                        {item}
                    </Typography>
                </AccordionSummary>
            </ThemeProvider>

            {/* <AccordionDetails>
                <PromotionEdit />
            </AccordionDetails> */}
        </Accordion>
    );
};

export default AccordionItem;
