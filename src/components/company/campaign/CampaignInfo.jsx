import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { promotion_list } from "../../../features/company/CampaignApi";
import { Coupon_List } from "../../../features/company/CouponApi";
import { tandc_list } from "../../../features/company/TandcApi";
import CouponTable from "../coupon/CouponTable";
import PromotionTable from "../promotion/PromotionTable";
import TandcTable from "../tandc/TandcTable";
import Masonry from "@mui/lab/Masonry";

export default function CampaignInfo({ tabIndex, setTabIndex }) {
    const dispatch = useDispatch();
    const { campaignInfo } = useSelector((state) => state.campaignDetail);

    useEffect(() => {
        dispatch(promotion_list({ id: campaignInfo.id }));
        dispatch(
            tandc_list({ page: 1, limit: 5, campaign_id: campaignInfo.id })
        );
        dispatch(
            Coupon_List({ page: 1, limit: 10, campaign_id: campaignInfo.id })
        );
    }, []);

    return (
        <Box>
            <Grid container columnSpacing={2} sx={{ mt: 3 }}>
                <Grid container item md={4}>
                    <Card sx={{ width: "100%" }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Word of the Day
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
                            </Typography>
                            <Typography variant="body2">
                                well meaning and kindly.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container item md={4}>
                    <Card elevation={2} sx={{ width: "100%" }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Word of the Day
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
                            </Typography>
                            <Typography variant="body2">
                                well meaning and kindly.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container item md={4}>
                    <Card sx={{ width: "100%" }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Word of the Day
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
                            </Typography>
                            <Typography variant="body2">
                                well meaning and kindly.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box mt={2}>
                <Masonry columns={2} spacing={3}>
                    <PromotionTable setTabIndex={setTabIndex} />
                    <CouponTable setTabIndex={setTabIndex} />
                    <TandcTable tabIndex={tabIndex} setTabIndex={setTabIndex} />
                </Masonry>
                {/* <CampaignTerms /> */}
            </Box>
        </Box>
    );
}
