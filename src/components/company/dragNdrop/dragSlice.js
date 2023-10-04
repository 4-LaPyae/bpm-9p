import { createSlice } from "@reduxjs/toolkit";

const drags = {
    drag: {},
};

export const Drag = createSlice({
    name: "dragSlice",
    initialState: {
        ...drags,
    },
    reducers: {
        onInitDrag: () => {
            return drags;
        },
        onChangeDrag: (state, { payload }) => {
            console.log(payload);
            state.drag = payload;
        },
    },
});

export const dragSlice = Drag.reducer;
export const { onInitDrag, onChangeDrag } = Drag.actions;
