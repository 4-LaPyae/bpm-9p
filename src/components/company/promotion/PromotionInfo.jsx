import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    Box,
    Grid,
    Input,
    InputLabel,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import MkDatePicker from "../../../app/assets/theme/MkDatePicker";
import MkButton from "../../../app/assets/theme/MkButton";
import imageLogo from "../../../app/assets/images/ImageIcon.png";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
    EditCampaignDetail,
    reorder_promotion,
    Wheel_Color,
} from "../../../features/company/CampaignApi";
import DragDrop from "../dragNdrop";
import Wheel from "../../wheel/wheel";
import ColorPicker from "../../../app/components/colorPicker";
import PromotionAdd from "./PromotionAdd";
import {
    changeWheelBgColor,
    changeWheelBorderColor,
    changeWheelSpinColor,
    onReorderPromotion,
} from "../../../features/company/CampaignSlice";
import SpinWheelBgColor from "./SpinWheelBgColor";
import PromotionEdit from "./PromotionEdit";

export default function CampaignInfo() {
    const dispatch = useDispatch();
    const {
        campaignInfo: {
            id,
            event_title,
            logo,
            start,
            end,
            company_id,
            outlet_id,
            finish,
            bg_color,
            border_color,
            spin_btn_color,
        },
        campaignWheel,
    } = useSelector((state) => state.campaignDetail);

    const [imageData, setImageData] = useState("#");
    const [title, setTitle] = useState(event_title ? event_title : "");
    const [startDate, setStartDate] = useState(start ? start : "");
    const [endDate, setEndDate] = useState(end ? end : "");
    const [imageChange, setImageChange] = useState(false);
    const [wheelBgColor, setWheelBgColor] = useState(campaignWheel.bg_color);
    const [wheelBtnColor, setWheelBtnColor] = useState(
        campaignWheel.spin_btn_color
    );
    const [wheelBorderColor, setWheelBorderColor] = useState(
        campaignWheel.border_color
    );

    useEffect(() => {
        setTitle(event_title ? event_title : "");
        setImageData(logo ? `https://mmspin.com/${logo}` : imageLogo);
        setStartDate(start ? start : "");
        setEndDate(end ? end : "");
        setImageChange(false);
    }, []);

    //imageInput change
    const imageInputChange = (e) => {
        const [file] = e.target.files;
        if (file) {
            setImageChange(true);
            setImageData(URL.createObjectURL(file));
        }
    };

    const handleAdd = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("company_id", company_id);
        formData.append("outlet_id", outlet_id == null ? 0 : outlet_id);
        const start = format(new Date(startDate), "yyyy-MM-dd HH:mm:ss");
        const end = format(
            new Date(endDate === null ? startDate : endDate),
            "yyyy-MM-dd HH:mm:ss"
        );
        formData.append("start", start);
        formData.append("end", end);
        if (!imageChange) {
            formData.delete("logo");
        }
        dispatch(EditCampaignDetail({ data: formData, id: id }));
    };

    // for drag and drop
    const { promotionList } = useSelector((state) => state.promotions);
    //remove disabled promotions
    const filterPromotions = promotionList.filter((item) => {
        return item.disabled !== 1;
    });
    const { drag } = useSelector((state) => state.dragSlice);
    const [accept, setAccept] = useState(false);
    const dragEnd = () => {
        if (drag?.source) {
            const postData = {
                campaign_id: id,
                promotion_id: drag.item.id,
                source_sorting_order: drag.source.index,
                destination_sorting_order: drag.destination.index,
            };
            dispatch(reorder_promotion({ data: postData }));
        }
    };
    useEffect(() => {
        if (drag?.source) {
            setAccept(true);
        } else {
            setAccept(false);
        }
    }, [drag]);

    // for spin wheel
    const wheelUpdate = () => {
        dispatch(
            Wheel_Color({
                id: id,
                data: {
                    border_color: campaignWheel.border_color || border_color,
                    spin_btn_color:
                        campaignWheel.spin_btn_color || spin_btn_color,
                    bg_color: campaignWheel.bg_color || bg_color,
                },
            })
        );
    };

    const changeWheelBackground = (color) => {
        setWheelBgColor(color);
    };

    const changeWheelBorderColorCode = (color) => {
        setWheelBorderColor(color);
    };

    const changeWheelBtnColor = (color) => {
        setWheelBtnColor(color);
    };

    useEffect(() => {
        setWheelBgColor(campaignWheel.bg_color);
        setWheelBorderColor(campaignWheel.border_color);
        setWheelBtnColor(campaignWheel.spin_btn_color);
        //for spin
        dispatch(changeWheelBgColor(wheelBgColor));
        dispatch(changeWheelSpinColor(wheelBtnColor));
        dispatch(changeWheelBorderColor(wheelBorderColor));
    }, [campaignWheel, wheelBgColor, wheelBorderColor, wheelBtnColor]);

    return (
        <Paper>
            <Grid container columnSpacing={2} sx={{ mt: 5, height: "100vh" }}>
                <Grid container item md={6.7} sx={{ height: "90%" }}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            flex: 1,
                            minWidth: 350,
                            padding: "20px 30px",
                        }}
                    >
                        <Stack
                            sx={{ mb: 1 }}
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Typography variant="h5">Promotion list</Typography>
                            <PromotionAdd />
                        </Stack>

                        <DragDrop
                            list={filterPromotions}
                            accept={accept}
                            dragEnd={dragEnd}
                            listChangeSlice={onReorderPromotion}
                        >
                            {({ listItem }) => (
                                <PromotionEdit listItem={listItem} />
                            )}
                        </DragDrop>
                    </Box>
                </Grid>

                <Grid container item md={5.3}>
                    <Stack
                        sx={{ width: "100%", height: "100%" }}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Wheel />
                        <Grid
                            container
                            item
                            sx={{
                                mt: 5,
                                display: finish === 1 ? "none" : "",
                            }}
                        >
                            <Grid container item md={6}>
                                <SpinWheelBgColor
                                    color={wheelBgColor}
                                    changeColor={changeWheelBackground}
                                    side="left"
                                    typography="Wheel Background"
                                    close={wheelUpdate}
                                />
                            </Grid>
                            <Grid container item md={6}>
                                <SpinWheelBgColor
                                    color={wheelBtnColor}
                                    changeColor={changeWheelBtnColor}
                                    side="right"
                                    typography="Spin Buttom "
                                    close={wheelUpdate}
                                />
                            </Grid>
                            <Grid container item md={6}>
                                <SpinWheelBgColor
                                    color={wheelBorderColor}
                                    changeColor={changeWheelBorderColorCode}
                                    side="left"
                                    typography="Wheel Border"
                                    close={wheelUpdate}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
}
