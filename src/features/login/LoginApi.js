import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../app/hooks";
import { localStorageHandler, onSetValid } from "./LoginSlice";

export const createKey = createAsyncThunk(
  "createKey/login",
  async (_, { dispatch }) => {
    const response = await fetch(`${api}/user/createCaptchaKey`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const result = await response.json();
    console.log("get_session_key ", result);
    return result;
  }
);

export const getToken = createAsyncThunk(
  "getToken/login",
  async (data, { dispatch }) => {
    const response = await fetch(`${api}/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("get token ", result);
    return result;
  }
);

export const checkOTP = createAsyncThunk(
  "checkOTP/checkOTP",
  async (data, { dispatch }) => {
    const response = await fetch(`${api}/user/checkOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log({ result });
    if (!result.error) {
      console.log("In checkOTP api");
      dispatch(onSetValid(result));

      dispatch(localStorageHandler(result?.user?.token_expired_at));
    }
    return result;
  }
);
