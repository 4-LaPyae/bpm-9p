import React from "react";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/images/logo_su.png";
import {
    Box,
    Container,
    Typography,
    Paper,
    BottomNavigationAction,
} from "@mui/material";
import { ExternalLink } from "react-external-link";

const useStyles = makeStyles((theme) => ({
    rootBox: {
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },
    },
    footerNav: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginRight: "auto",
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(0),

        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginLeft: "auto",
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
    footerLink: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(2),
        },
    },
}));

export default function Footer(props) {
    const classes = useStyles();

    const content = {
        brand: { image: logo, width: 110 },
        copy: `© 2022 - ${new Date().getFullYear()} Copyright by 9Publishers All rights reserved.  `,
        link1: "First Link",
        link2: "Second Link",
        link3: "Third Link",
        link4: "Fourth Link",
        ...props.content,
    };

    let brand;

    if (content.brand.image) {
        brand = (
            <img src={content.brand.image} alt="" width={content.brand.width} />
        );
    } else {
        brand = content.brand.text || "";
    }

    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0, mt: 5 }}
            // elevation={3}
        >
            <Container maxWidth="lg">
                <Box
                    py={2}
                    pl={8}
                    display="flex"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.rootBox}
                >
                    {/* <Link href="#" color="inherit" underline="none">
                        {brand}
                    </Link> */}
                    <ExternalLink href="https://api.9publishers.com">
                        <Typography
                            color="textSecondary"
                            component="p"
                            variant="caption"
                            gutterBottom={false}
                        >
                            {content["copy"]}
                        </Typography>
                    </ExternalLink>
                    <br />
                    <ExternalLink href="https://sabahna.com">
                        <Typography
                            color="textSecondary"
                            component="p"
                            variant="caption"
                            gutterBottom={false}
                        >
                            Powered by Sabahna
                        </Typography>
                    </ExternalLink>
                    {/* <Box component="nav" className={classes.footerNav}>
                        <Link
                            href="#"
                            variant="body1"
                            color="textPrimary"
                            className={classes.footerLink}
                        >
                            {content["link1"]}
                        </Link>
                        <Link
                            href="#"
                            variant="body1"
                            color="textPrimary"
                            className={classes.footerLink}
                        >
                            {content["link2"]}
                        </Link>
                        <Link
                            href="#"
                            variant="body1"
                            color="textPrimary"
                            className={classes.footerLink}
                        >
                            {content["link3"]}
                        </Link>
                        <Link
                            href="#"
                            variant="body1"
                            color="textPrimary"
                            className={classes.footerLink}
                        >
                            {content["link4"]}
                        </Link>
                    </Box> */}
                </Box>
            </Container>
        </Paper>
    );
}
