import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Box, Stack, Typography } from "@mui/material";
import DraggableList from "./DraggableList";
import { useDispatch, useSelector } from "react-redux";
import {
    delete_promotion,
    promotion_list,
    reorder_promotion,
} from "../../../features/company/CampaignApi";
import { reorder } from "./reorder";
import { onChangeDrag, onInitDrag } from "./dragSlice";
import PromotionAdd from "../promotion/PromotionAdd";
import { useMemo } from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
});

/**
 All are required
  `
  list : [] -> Array
  listChangeSlice : fn() -> to dispatch it's reducer
  dragEnd : fn() -> to update function after drag end
  accept : boolean -> this may be state. accept or not the index of reordered item
  `
 */
export default function DragDrop({
    list,
    dragEnd,
    accept,
    listChangeSlice,
    children,
    tabIndex,
}) {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);

    const onDragEnd = ({ destination, source }) => {
        // dropped outside the list
        if (!destination) {
            // to remove item
            // const newItems = promotionList.filter(
            //     (item, index) => index !== source.index
            // );
            // setItems(newItems);
            dispatch(onInitDrag());
            return;
        }
        const newItems = reorder(items, source.index, destination.index);
        dispatch(
            onChangeDrag({
                source: source,
                destination: destination,
                item: items[source.index],
            })
        );
        dispatch(listChangeSlice(newItems));
        setItems(newItems);
    };

    useMemo(() => {
        setItems(list);
    }, [list]);

    useEffect(() => {
        if (accept) {
            dragEnd();
            dispatch(onInitDrag());
        }
    }, [accept]);
    return (
        <DraggableList
            tabIndex={tabIndex}
            items={items}
            onDragEnd={onDragEnd}
            children={children}
        />
    );
}
