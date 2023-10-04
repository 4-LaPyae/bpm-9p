import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const ReleaseDropdownList = createAsyncThunk(
  "ReleaseDropdownList/ReleaseDropdownList",
  async (_, { getState }) => {
    const { user, token } = getState().loginInfo;
    const result = await useFetch({
      url: `get_releases?user_id=${user._id}`,
      method: "GET",
      token: token,
    });
    return result;
  }
);
