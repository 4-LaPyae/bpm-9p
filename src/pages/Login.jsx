import { useState } from "react";

import { checkOTP, getToken } from "../features/login/LoginApi";

import {
    CssBaseline,
    FormControlLabel,
    Link,
    Box,
    Button,
    CircularProgress,
    Typography,
    Container,
    InputBase,
    InputLabel,
    IconButton,
    Switch,
    Avatar,
    Alert,
    Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import MkButton from "../app/assets/theme/MkButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Logo from "../app/assets/images/nineP.png";
import { useSelector } from "react-redux";
import { ExternalLink } from "react-external-link";
import {
    onClearOTP,
    onClearError,
} from "../features/login/LoginSlice";
import { createKey } from "../features/login/LoginApi";
import Canvas from "../app/components/Canvas";
import { useEffect } from "react";
import OtpInput from "react-otp-input";
import { setDate } from "date-fns";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <ExternalLink
                style={{ color: "#67748e", margin: "0 5px" }}
                href="https://www.wowme.tech/"
            >
                <span> Wowme</span>
            </ExternalLink>
            2022 - {new Date().getFullYear()}
        </Typography>
    );
}

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        error,
        otp_code,
        user_captcha_key,
        status,
        getOtpStatus,
    } = useSelector((state) => state.loginInfo);
    const [captchaError, setCaptchaError] = useState(false);
    const [captchaCode, setCaptchaCode] = useState("");
    // console.log(getOtpStatus);
    // const [otpInput, setOtpInput] = useState(new Array(6).fill(""));
    const [value, setValue] = useState("");

    const [otpError, setOtpError] = useState("");

    const [otp, setOtp] = useState("");
    const [alert, setAlert] = useState(false);

    let expiredDate = new Date();
    let currentDate = new Date();

    expiredDate.setDate(currentDate.getDate() + 30);

    //! button submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            phone: formData.get("phone"),
            user_captcha_key: formData.get("captcha_code"),
            expired_date: expiredDate
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
        };
        console.log(data);
        // console.log("handleSubmit", data["user_captcha_key"]);
        if (data["user_captcha_key"] === user_captcha_key) {
            dispatch(getToken(data))
                .unwrap()
                .then((result) => {
                    console.log({ result });
                    if (!result.error) {
                        dispatch(onClearError());
                    } else {
                        setTimeout(() => {
                            dispatch(onClearError());
                        }, 2000);
                    }
                });
        } else {
            dispatch(createKey());
            setCaptchaError(true);
            formData.delete("captcha_code");
            setCaptchaCode("");
            setTimeout(() => {
                setCaptchaError(false);
            }, 1500);
        }
    };

    const handleOTPSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            phone: formData.get("phone"),
            otp_code: otp,
        };
        console.log(data);
        if (otp && otp?.length === 6) {
            dispatch(checkOTP(data))
                .unwrap()
                .then((result) => {
                    if (result.error) {
                        setOtpError(result.message);
                        setTimeout(() => {
                            dispatch(onClearError());
                        }, 2000);
                    } else {
                        setOtp("");
                    }
                });
        } else {
            setAlert(true);
            setOtpError("otp required");
            setTimeout(() => {
                setAlert(false);
            }, 2000);
            console.log(otpError);
        }
    };

    useEffect(() => {
        setValue(user_captcha_key);
    }, [user_captcha_key]);

    return (
        <Container
            maxWidth="xs"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <CssBaseline />

            <Box
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: "1rem",
                    boxShadow:
                        "rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem",
                    padding: "50px 30px 90px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar src={Logo} sx={{ width: 56, height: 56 }} />
                <Typography
                    component="h1"
                    variant="h1"
                    sx={{ mb: 2, mt: 2 }}
                >
                    9Publishers
                </Typography>
                <Typography
                    component="h1"
                    variant="h2"
                    sx={{ mb: 5 }}
                >
                    Business Process Management Panel
                </Typography>
                <Box
                    component="form"
                    onSubmit={
                        otp_code ? handleOTPSubmit : handleSubmit
                    }
                    noValidate
                >
                    <InputLabel
                        htmlFor="phone"
                        sx={{
                            // mb: 1,
                            fontSize: "1rem",
                            display: otp_code ? "none" : "",
                        }}
                    >
                        Phone
                    </InputLabel>
                    <InputBase
                        type="number"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        placeholder="09xxxxxxxxx"
                        name="phone"
                        autoFocus
                        sx={{
                            display: otp_code ? "none" : "",
                            border: "#d2d6da solid 2px",
                            "&.Mui-focused": {
                                border: "#35d1f5 solid 2px",
                                boxShadow: `0 0 1px 2px #81e3f9de`,
                                outline: 0,
                            },
                        }}
                        onWheel={() => document.activeElement.blur()}
                    />

                    {otp_code ? (
                        ""
                    ) : (
                        <Canvas
                            text={user_captcha_key ? value : ""}
                        />
                    )}

                    <InputBase
                        type="text"
                        value={captchaCode}
                        required
                        fullWidth
                        id="captcha_code"
                        label="captcha_code"
                        placeholder="Type the code above ..."
                        name="captcha_code"
                        sx={{
                            display: otp_code ? "none" : "",
                            mb: 3,
                            border: "#d2d6da solid 2px",
                            "&.Mui-focused": {
                                border: "#35d1f5 solid 2px",
                                boxShadow: `0 0 1px 2px #81e3f9de`,
                                outline: 0,
                            },
                        }}
                        onChange={(e) =>
                            setCaptchaCode(e.target.value)
                        }
                        onPaste={(e) => {
                            e.preventDefault();
                        }}
                    />

                    <Grid
                        container
                        gap={0.3}
                        justifyContent="space-between"
                        sx={{ display: otp_code ? "" : "none" }}
                    >
                        <Grid item xs={12}>
                            <InputLabel
                                htmlFor="otp"
                                sx={{ mb: 1, fontSize: "1rem" }}
                            >
                                Enter OTP
                            </InputLabel>
                        </Grid>
                        {/* {otpInput.map((data, index) => {
              return (
                <Grid key={index} item xs={1.5}>
                  <InputBase
                    type="tel"
                    required
                    fullWidth
                    name={"otp" + index}
                    inputProps={{ maxLength: 1 }}
                    value={data}
                    autoFocus
                    sx={{
                      // mb: 3,
                      fontSize: "1.4rem",
                      border: "#d2d6da solid 2px",
                      "&.Mui-focused": {
                        border: "#35d1f5 solid 2px",
                        boxShadow: `0 0 1px 2px #81e3f9de`,
                        outline: 0,
                      },
                    }}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="x"
                  />
                </Grid>
              );
            })} */}

                        <Grid item xs={1.5}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                separator={
                                    <span style={{ padding: "5px" }}>
                                        {" "}
                                    </span>
                                }
                                inputStyle={{
                                    width: "50px",
                                    height: "50px",
                                    padding: "4px",
                                    fontSize: "1.4rem",
                                    border: "#d2d6da solid 2px",
                                    "&.Mui-focused": {
                                        border: "#35d1f5 solid 2px",
                                        boxShadow: `0 0 1px 2px #81e3f9de`,
                                        outline: 0,
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            marginTop: "10px",
                        }}
                    >
                        {alert ? (
                            <Alert variant="filled" severity="error">
                                {otpError}
                            </Alert>
                        ) : (
                            ""
                        )}
                    </Box>
                    <Box
                        sx={{
                            marginTop: "10px",
                            display: error ? "" : "none",
                        }}
                    >
                        <Alert variant="filled" severity="error">
                            {error ?? otpError}
                        </Alert>
                    </Box>
                    {captchaError && (
                        <Alert variant="filled" severity="error">
                            Captcha code wrong!
                        </Alert>
                    )}

                    {/* <FormControlLabel
            control={<Switch size="small" />}
            label="Remember me"
            sx={{
              paddingLeft: "10px",
              span: { fontSize: "0.75rem" },
              display: otp_code ? "none" : "",
            }}
          /> */}
                    {status || getOtpStatus ? (
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled
                            sx={{ mt: 3, mb: 2 }}
                            startIcon={
                                <CircularProgress
                                    size={20}
                                    color="inherit"
                                />
                            }
                        >
                            Loading...
                        </Button>
                    ) : (
                        <MkButton
                            type="submit"
                            fullWidth
                            variant="gradient"
                            mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                            sx={{
                                mt: 2,
                                color: "linear-gradient(310deg, #2152ff, #02c6f3)",
                            }}
                        >
                            {otp_code ? "Submit" : "Get OTP"}
                        </MkButton>
                    )}

                    <Box
                        sx={{
                            textAlign: "center",
                            mt: 3,
                            display: otp_code ? "" : "none",
                        }}
                    >
                        <Typography
                            sx={{ cursor: "pointer", color: "blue" }}
                            onClick={() => {
                                dispatch(createKey());
                                dispatch(onClearOTP());
                                dispatch(onClearError());
                                setCaptchaCode("");
                                setOtp("");
                            }}
                        >
                            Back
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Copyright sx={{ mt: 6 }} />
        </Container>
    );
}
