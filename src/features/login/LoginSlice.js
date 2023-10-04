import { createSlice, current } from "@reduxjs/toolkit";
import { getToken, createKey, checkOTP } from "./LoginApi";
import { removeToken } from "../logout/LogoutApi";
import { updateProfile } from "../company/CompanyApi";

let logoutTimer;
const initialLoginData = {
    user: {},
    token: null,
    error: null,
    status: null,
    getOtpStatus: null,
    company_id: null,
    company_name: null,
    publisher: [],
    otp_code: null,
    user_captcha_key: null,
};

const loginData = createSlice({
    name: "loginInfo",
    initialState: {
        ...initialLoginData,
    },
    reducers: {
        onSetValid: (state, { payload }) => {
            // console.log({ payload });
            state.user = payload.user;
            state.token = payload.user.auth_token;
            state.publisher = payload.publishers;
        },
        onSetPublisher: (state, { payload }) => {
            state.publisher = payload;
        },
        onSetCompanyId: (state, { payload }) => {
            state.company_id = payload.id;
            state.company_name = payload.name;
        },
        onLogoutHandler: (state) => {
            localStorage.removeItem("auth");
            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
            state.user = {};
            state.token = null;
            state.publisher = null;
            state.otp_code = null;
        },
        onClearOTP: (state) => {
            state.otp_code = null;
        },
        onClearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createKey.fulfilled, (state, { payload }) => {
                state.user_captcha_key = payload.user_captcha_key;
            })
            .addCase(getToken.pending, (state) => {
                state.status = true;
            })
            .addCase(getToken.fulfilled, (state, { payload }) => {
                state.status = false;
                if (payload.error) {
                    state.error = payload.message;
                    return;
                }
                if (payload.errors) {
                    state.error = "You need to fill Some field";
                    return;
                }
                state.otp_code = payload.otp_code;
            })
            .addCase(checkOTP.pending, (state) => {
                state.getOtpStatus = true;
            })
            .addCase(checkOTP.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.getOtpStatus = false;
                state.error = payload.message;
            })
            .addCase(removeToken.fulfilled, (state, { payload }) => {
                //from logout api
                state.error = null;
                loginData.caseReducers.onLogoutHandler(state);
            })
            .addCase(
                updateProfile.fulfilled,
                (state, { payload }) => {
                    console.log({ payload });
                    state.user.name = payload.user.name;
                    state.user.phone = payload.user.phone;
                    state.user.profile = payload.user.profile;
                }
            );
    },
});

export const loginInfo = loginData.reducer;
export const {
    onSetValid,
    onLogoutHandler,
    onSetCompanyId,
    onClearOTP,
    onSetPublisher,
    onClearError,
} = loginData.actions;

// calculate the expired time
export const calExpiredTime = (expiredTime) => {
    // console.log({ expiredTime });
    const currentTime = new Date().getTime();
    // console.log({ currentTime });

    const exTime = new Date(expiredTime).getTime();
    // console.log({ exTime });
    return exTime - currentTime;
};

export default calExpiredTime;

//* for authentication reload
export const reloadHandler = () => async (dispatch) => {
    let auth = localStorage.getItem("auth");
    // console.log({ auth });
    if (auth) {
        auth = JSON.parse(auth);
        console.log({ auth });
        dispatch(
            onSetValid({
                user: auth.user,
                auth_token: auth.token,
                publishers: auth.publisher,
            })
        );
        // checking expire time
        dispatch(localStorageHandler(auth.expiredTime));
    }
};

// localstorage function
export const localStorageHandler =
    (expiredTime, user = null) =>
    async (dispatch, getState) => {
        const { loginInfo } = getState();

        if (loginInfo.token) {
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    token: loginInfo.token,
                    user: user ?? loginInfo.user,
                    publisher: loginInfo.publisher,
                    expiredTime: expiredTime,
                })
            );

            const currentTime = new Date().getTime();
            const exTime = new Date(expiredTime).getTime();
            if (currentTime > exTime) {
                dispatch(onLogoutHandler());
            } else {
            }
        }
    };
