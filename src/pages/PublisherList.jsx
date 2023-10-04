import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { imageApi } from "../app/hooks.js";
import {
    localStorageHandler,
    onSetPublisher,
} from "../features/login/LoginSlice.js";

export default function PublisherList() {
    const dispatch = useDispatch();
    const { publisher } = useSelector((state) => state.loginInfo);
    console.log({ publisher });
    const navigate = useNavigate();

    const handleClick = (id) => {
        console.log({ id });
        const filter = publisher.filter((item) => item._id === id);
        dispatch(onSetPublisher(filter));
        const auth = JSON.parse(localStorage.getItem("auth"));
        const expiredTime = auth.expiredTime;
        console.log({ expiredTime });
        dispatch(localStorageHandler(expiredTime));
        navigate("/books");
    };
    console.log("In Publisher List Page");

    return (
        <Container
            sx={{
                height: "100vh",
                display: "flex",
            }}
        >
            <Box
                sx={{
                    margin: "auto",
                    backgroundColor: "#fff",
                    borderRadius: "1rem",
                    boxShadow:
                        "rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem",
                    padding: "50px 30px 90px",
                }}
            >
                <Grid
                    container
                    rowSpacing={2}
                    justifyContent="space-between"
                >
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: 30,
                                fontWeight: "bold",
                            }}
                        >
                            Publishers
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: 15,
                            }}
                        >
                            Choose publisher, you want to manage
                        </Typography>
                    </Grid>
                    {publisher?.map((item) => {
                        return (
                            <Grid item xs={5.8} key={item._id}>
                                <Card
                                    sx={{ width: "100%" }}
                                    onClick={() =>
                                        handleClick(item._id)
                                    }
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={`${imageApi}${item?.publisher_logo}`}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {item?.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Container>
    );
}
