import { createSlice, current } from "@reduxjs/toolkit";
import { add_coupon, Coupon_List, edit_coupon } from "./CouponApi";

const couponListInitial = {
    coupon_list: [],
    coupon_pagination: null,
    selectedCoupon: {},
};

export const CouponList = createSlice({
    name: "couponList",
    initialState: couponListInitial,
    reducers: {
        onInitCouponList: () => {
            return couponListInitial;
        },
        onSelectCoupon: (state, { payload }) => {
            state.selectedCoupon = payload;
        },
        removeSelectedCoupon: (state, { payload }) => {
            state.selectedCoupon = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Coupon_List.fulfilled, (state, { payload }) => {
                const { data, ...rest } = payload.coupons;
                state.coupon_list = data;
                state.coupon_pagination = rest;
            })
            .addCase(add_coupon.fulfilled, (state, { payload }) => {
                if (state.coupon_list.length === 0) {
                    state.coupon_list.push(payload.coupon);
                } else {
                    state.coupon_list.splice(0, 0, payload.coupon);
                }
            })
            .addCase(edit_coupon.fulfilled, (state, { payload }) => {
                state.coupon_list = state.coupon_list.map((item) => {
                    if (item.id === payload.coupon.id) {
                        return { ...payload.coupon };
                    } else {
                        return { ...item };
                    }
                });
            });
    },
});

export const couponList = CouponList.reducer;
export const { onSelectCoupon, removeSelectedCoupon } = CouponList.actions;
