import Autocomplete from "@mui/material/Autocomplete";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCompanyList } from "../features/company/CompanyApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Dashboard() {
    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(null);
    const { campaignList } = useSelector((state) => state.campaignList);

    const dispatch = useDispatch();
    const getCoupons = () => {
        let sum = 0;
        for (const value of campaignList) {
            sum += value.coupons_count;
        }
        return sum;
    };

    const getPormotions = () => {
        let sum = 0;
        for (const value of campaignList) {
            sum += value.promotions_count;
        }
        return sum;
    };

    const handleOpen = (event) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(null);
    };

    // useEffect(() => {
    //     dispatch(getCompanyList());
    // }, []);

    return (
        <Grid container columnSpacing={2} sx={{ mt: 3 }}>
            <Grid container item md={2}>
                <Card sx={{ width: "100%" }}>
                    <CardContent
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <Typography sx={{ fontSize: 30, fontWeight: 900 }}>
                            {campaignList.length}
                        </Typography>
                        <Typography gutterBottom>Total Campaign</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container item md={2}>
                <Card elevation={2} sx={{ width: "100%" }}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Total Spending
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container item md={2}>
                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Total Winning
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container item md={2}>
                <Card sx={{ width: "100%" }}>
                    <CardContent
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <Typography sx={{ fontSize: 30, fontWeight: 900 }}>
                            {getCoupons()}
                        </Typography>
                        <Typography gutterBottom>Total Customers</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container item md={2}>
                <Card sx={{ width: "100%" }}>
                    <CardContent
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <Typography sx={{ fontSize: 30, fontWeight: 900 }}>
                            {getCoupons()}
                        </Typography>
                        <Typography gutterBottom>Total Coupons</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container item md={2}>
                <Card sx={{ width: "100%" }}>
                    <CardContent
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <Typography sx={{ fontSize: 30, fontWeight: 900 }}>
                            {getPormotions()}
                        </Typography>
                        <Typography gutterBottom>Total Promotions</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Dashboard;
