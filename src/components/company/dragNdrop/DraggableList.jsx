import React from "react";
import DraggableListItem from "./DraggableListItem";
import { useSelector } from "react-redux";
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onInitColor } from "../../../features/company/CampaignSlice";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

// changing styling for background when dragging

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#f6fdff" : "transparent",
    border: "1px solid #04040426",
    padding: "30px 0px",
    borderRadius: "8px",
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    // padding: grid,
    // width: 250,
});

const DraggableList = React.memo(({ items, onDragEnd, children, tabIndex }) => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
    const { campaignInfo } = useSelector((state) => state.campaignDetail);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {tabIndex === 4 ? (
                            <Box sx={{ padding: "0px 20px 10px 20px" }}>
                                <Typography>
                                    {campaignInfo.tnc_pretext}
                                </Typography>
                            </Box>
                        ) : (
                            ""
                        )}

                        {items.map((item, index) => (
                            <DraggableListItem
                                // component={component}
                                item={item}
                                index={index}
                                key={item.id}
                                expanded={expanded}
                                setExpanded={setExpanded}
                                children={children}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
});

export default DraggableList;
