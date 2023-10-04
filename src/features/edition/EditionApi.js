import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const EditionDropdownList = createAsyncThunk(
  "EditionDropdownList/EditionDropdownList",
  async (_, { getState }) => {
    const { user, token } = getState().loginInfo;
    const result = await useFetch({
      url: `get_editions?user_id=${user._id}`,
      method: "GET",
      token: token,
    });

    return result;
  }
);
