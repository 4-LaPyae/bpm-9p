import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    ListItem,
    Box,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PromotionEdit from "../promotion/PromotionEdit";
import { useDispatch } from "react-redux";
import {
    onChangeBackground,
    onInitColor,
    onSelectPromotion,
    removeSelectPromotion,
} from "../../../features/company/CampaignSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import TandcEdit from "../tandc/TandcEdit";
import { onSelectTandc } from "../../../features/company/TandcSlice";
import { useEffect } from "react";
import { Visibility } from "@mui/icons-material";

const useStyles = makeStyles({
    draggingListItem: {
        background: "transparent",
        borderRadius: 6,
    },
});

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

const DraggableListItem = ({
    item,
    index,
    expanded,
    setExpanded,
    children,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { selectedPromotion } = useSelector((state) => state.promotions);
    const { campaignInfo } = useSelector((state) => state.campaignDetail);

    const handleChange = (clickItem) => (event, newExpanded) => {
        setExpanded(newExpanded ? clickItem.id : false);
        if (!newExpanded) {
            dispatch(removeSelectPromotion());
            dispatch(onInitColor());
            return;
        }

        if (newExpanded) {
            if (clickItem.title) {
                dispatch(onSelectPromotion(clickItem));
            }
        }
        // if (!clickItem.title) {
        //     dispatch(onSelectTandc(clnewExpandedickItem));
        // }
    };

    useEffect(() => {
        if (selectedPromotion.id === item.id) {
            dispatch(onSelectPromotion(item));
        }
    }, [item]);

    return (
        <Draggable
            draggableId={`${item.id}`}
            index={index}
            isDragDisabled={expanded ? true : false}
        >
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={
                        snapshot.isDragging ? classes.draggingListItem : ""
                    }
                >
                    <Accordion
                        expanded={expanded === item.id}
                        onChange={handleChange(item)}
                        sx={{
                            border: "1px solid #04040426",
                            width: "100%",
                        }}
                        style={{
                            borderRadius: "10px",
                            boxShadow: "0 0 0",
                            position: "relative",
                        }}
                    >
                        <ThemeProvider theme={iconRotate}>
                            <AccordionSummary
                                expandIcon={
                                    campaignInfo.finish === 1 ? (
                                        <Visibility
                                            sx={{
                                                color: "#111111de",
                                                border: "1px solid #a2a2a8",
                                                padding: " 0.25rem",
                                                borderRadius: " 5px",
                                                fontSize: "27px",
                                            }}
                                        />
                                    ) : (
                                        <EditIcon
                                            sx={{
                                                color: "#111111de",
                                                border: "1px solid #a2a2a8",
                                                padding: " 0.25rem",
                                                borderRadius: " 5px",
                                                fontSize: "27px",
                                            }}
                                        />
                                    )
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ fontSize: "15px" }}
                                >
                                    {item.title && item.title}
                                    {!item.title && item.description}
                                </Typography>
                            </AccordionSummary>
                        </ThemeProvider>

                        <AccordionDetails>
                            {children({ listItem: item })}
                        </AccordionDetails>

                        {/*  for color portal onclose */}
                        <div id={`color-portal-${item.id}`}></div>
                    </Accordion>
                </ListItem>
            )}
        </Draggable>
    );
};

export default DraggableListItem;
