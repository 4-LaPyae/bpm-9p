import { createSlice } from "@reduxjs/toolkit";
import {
    addCampaign,
    addPromotion,
    add_pretext,
    delete_promotion,
    disabled_promotion,
    EditCampaignDetail,
    edit_promotion,
    finishCampaign,
    getCampaignList,
    promotion_list,
    reorder_promotion,
    silent_promotion,
    statusCampaign,
    Wheel_Color,
} from "./CampaignApi";

const campaignInitialList = {
    campaignList: [],
};

export const CampaignList = createSlice({
    name: "getCampaignList",
    initialState: { ...campaignInitialList },
    reducers: {
        initCampaignList: () => {
            return campaignInitialList;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCampaignList.fulfilled, (state, { payload }) => {
                const { data } = payload;
                state.campaignList = data;
            })
            .addCase(addCampaign.fulfilled, (state, { payload }) => {
                if (state.campaignList.length === 0) {
                    state.campaignList.push(payload);
                } else {
                    state.campaignList.splice(0, 0, payload);
                }
            })
            .addCase(statusCampaign.fulfilled, (state, { payload }) => {
                const { campaign } = payload;
                state.campaignList = state.campaignList.map((list) => {
                    if (list.id === campaign.id) {
                        return {
                            ...list,
                            disable: campaign.disable ? 1 : 0,
                        };
                    } else {
                        return {
                            ...list,
                        };
                    }
                });
            })
            .addCase(finishCampaign.fulfilled, (state, { payload }) => {
                const { campaign } = payload;
                state.campaignList = state.campaignList.map((list) => {
                    if (list.id === campaign.id) {
                        return {
                            ...list,
                            finish: campaign.finish ? 1 : 0,
                        };
                    } else {
                        return {
                            ...list,
                        };
                    }
                });
            })
            .addCase(EditCampaignDetail.fulfilled, (state, { payload }) => {
                state.campaignList = state.campaignList.map((item) => {
                    if (item.id === payload.id) {
                        return { ...payload };
                    } else {
                        return { ...item };
                    }
                });
            })
            .addCase(add_pretext.fulfilled, (state, { payload }) => {
                state.campaignList = state.campaignList.map((item) => {
                    if (item.id === payload.campaign.id) {
                        return { ...payload.campaign };
                    } else {
                        return { ...item };
                    }
                });
            });
    },
});

export const campaignList = CampaignList.reducer;

export const initCampaignDetail = {
    campaignInfo: {},
    campaignWheel: {
        bg_color: "",
        spin_btn_color: "",
        border_color: "",
    },
};
const CampaignDetail = createSlice({
    name: "campaignDetail",
    initialState: { ...initCampaignDetail },
    reducers: {
        changeCampaignInfo: (state, { payload }) => {
            state.campaignInfo = payload;
            state.campaignWheel.bg_color = payload.bg_color;
            state.campaignWheel.spin_btn_color = payload.spin_btn_color;
            state.campaignWheel.border_color = payload.border_color;
        },
        changeWheelBgColor: (state, { payload }) => {
            state.campaignWheel.bg_color = payload;
        },
        changeWheelSpinColor: (state, { payload }) => {
            state.campaignWheel.spin_btn_color = payload;
        },
        changeWheelBorderColor: (state, { payload }) => {
            state.campaignWheel.border_color = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(EditCampaignDetail.fulfilled, (state, { payload }) => {
                state.campaignInfo = payload;
            })
            .addCase(Wheel_Color.fulfilled, (state, { payload }) => {
                state.campaignInfo = payload;
            })
            .addCase(add_pretext.fulfilled, (state, { payload }) => {
                state.campaignInfo = payload.campaign;
            });
    },
});

export const campaignDetail = CampaignDetail.reducer;
export const {
    changeCampaignInfo,
    changeWheelBgColor,
    changeWheelSpinColor,
    changeWheelBorderColor,
} = CampaignDetail.actions;

export const initPromotion = {
    promotionList: [],
    selectedPromotion: {},
};
const Promotions = createSlice({
    name: "promotions",
    initialState: { ...initPromotion },
    reducers: {
        onInitPromotion: () => {
            return initPromotion;
        },
        onSelectPromotion: (state, { payload }) => {
            state.selectedPromotion = payload;
        },
        removeSelectPromotion: (state, { payload }) => {
            state.selectedPromotion = {};
        },
        onReorderPromotion: (state, { payload }) => {
            state.promotionList = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(promotion_list.fulfilled, (state, { payload }) => {
                state.promotionList = payload;
            })
            .addCase(addPromotion.fulfilled, (state, { payload }) => {
                state.promotionList.push(payload);
            })
            // .addCase(reorder_promotion.fulfilled, (state, { payload }) => {
            //     state.promotionList = payload.promotions;
            // })
            .addCase(edit_promotion.fulfilled, (state, { payload }) => {
                state.promotionList = state.promotionList.map((item) => {
                    if (item.id === payload.id) {
                        return { ...payload };
                    } else {
                        return { ...item };
                    }
                });
            })
            .addCase(silent_promotion.fulfilled, (state, { payload }) => {
                state.promotionList = state.promotionList.map((item) => {
                    if (item.id === payload.promotion.id) {
                        return {
                            ...item,
                            silent: payload.promotion.silent ? 1 : 0,
                        };
                    } else {
                        return { ...item };
                    }
                });
            })
            .addCase(disabled_promotion.fulfilled, (state, { payload }) => {
                state.promotionList = state.promotionList.map((item) => {
                    if (item.id === payload.promotion.id) {
                        return {
                            ...item,
                            disabled: payload.promotion.disabled ? 1 : 0,
                        };
                    } else {
                        return { ...item };
                    }
                });
            });
    },
});
export const promotions = Promotions.reducer;
export const { onSelectPromotion, onReorderPromotion, removeSelectPromotion } =
    Promotions.actions;

export const initLuckNumber = {
    luckyNumber: {},
};

const LuckNumber = createSlice({
    name: "spin_wheel",
    initialState: { ...initLuckNumber },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(spin_wheel.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.luckyNumber = payload;
        });
    },
});

export const luckyNumber = LuckNumber.reducer;

export const initialPromotionColor = {
    foreground: "#",
    background: "#",
    fontsize: 14,
};
const promotionColor = createSlice({
    name: "wheel",
    initialState: { ...initialPromotionColor },
    reducers: {
        onInitColor: (state) => {
            return initialPromotionColor;
        },
        onChangeForeground: (state, { payload }) => {
            state.foreground = payload;
        },
        onChangeBackground: (state, { payload }) => {
            state.background = payload;
        },
        onChangeFontsize: (state, { payload }) => {
            state.fontsize = payload;
        },
    },
});
export const promotionColorSlice = promotionColor.reducer;
export const {
    onInitColor,
    onChangeForeground,
    onChangeBackground,
    onChangeFontsize,
} = promotionColor.actions;
