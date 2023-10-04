import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch, { api, usePostForm } from "../../app/hooks";

export const getUserList = createAsyncThunk(
    "getUserList/getUserList",
    async ({ page, limit, filterName }, { getState }) => {
        const { user, token, publisher } = getState().loginInfo;
        const result = await useFetch({
            url: `users?user_id=${user._id}&limit=${limit}&page=${page}&publisher_id=${publisher[0]._id}&filterName=${filterName}`,
            method: "GET",
            token: token,
        });

        return result;
    }
);
export const getUserListNoPeg = createAsyncThunk(
    "getUserListNoPeg/getUserListNoPeg",
    async (_, { getState }) => {
        const { user, token, publisher } = getState().loginInfo;
        const result = await useFetch({
            url: `getUserList?user_id=${user._id}&publisher_id=${publisher[0]._id}`,
            method: "GET",
            token: token,
        });

        return result;
    }
);
export const getCompanyList = createAsyncThunk(
    "getCompanyList/getCompanyList",
    async (_, { getState }) => {
        const { user, token } = getState().loginInfo;

        const response = await fetch(
            `${api}/user/publishers?user_id=${user._id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        const result = await response.json();
        console.log("company lists api", result);
        return result;
    }
);

export const addCompanyList = createAsyncThunk(
    "getCompanyList/addCompanyList",
    async ({ data }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = usePostForm({
            url: "companies",
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const editCompany = createAsyncThunk(
    "getCompanyList/editCompany",
    async ({ data, id }, { getState }) => {
        for (const pair of data.entries()) {
            console.log(pair);
        }
        console.log("Edit Company Api Run.");
        console.log({ id });
        const { user, token } = getState().loginInfo;

        const result = usePostForm({
            url: `publishers/${id}?user_id=${user._id}&_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });

        return result;
    }
);

export const statusCompany = createAsyncThunk(
    "statusCompany/statusCompany",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `companies/${id}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);

export const getCompanyDetail = createAsyncThunk(
    "getCompanyList/editCompanyList",
    async ({ id }, { getState }) => {
        const { user, token } = getState().loginInfo;

        const response = await fetch(
            `${api}/user/publishers/${id}?user_id=${user._id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        const result = await response.json();
        return result;
    }
);

export const addCompanyUser = createAsyncThunk(
    "addCompanyUser/addCompanyUser",
    async ({ data }, { getState }) => {
        console.log(data);
        const { user, token } = getState().loginInfo;
        const response = await fetch(
            `${api}/user/users?user_id=${user._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Credentials": true,
                    credentials: "include",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        console.log(result);
        return result;
    }
);

export const getCompanyUserDetail = createAsyncThunk(
    "getCompanyUserDetail/getCompanyUserDetail",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `users/${id}`,
            method: "GET",
            token: token,
        });
        // console.log({ result });
        return result;
    }
);

export const editCompanyUserDetail = createAsyncThunk(
    "editCompanyUser/editCompanyUser",
    async ({ id, data }, { getState }) => {
        const { user, token } = getState().loginInfo;
        console.log({ data });
        const response = await fetch(
            `${api}/user/users/${id}?user_id=${user._id}&_method=PUT`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Credentials": true,
                    credentials: "include",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        console.log(result);
        return result;
    }
);

export const getCompanyUserByEmail = createAsyncThunk(
    "getCompanyUserByEmail/getCompanyUserByEmail",
    async (data, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `users/getByEmail`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const getPublisherUserByPhone = createAsyncThunk(
    "getPublisherUserByPhone/getPublisherUserByPhone",
    async (data, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = useFetch({
            url: `users/getByPhone?user_id=${user._id}`,
            method: "POST",
            token: token,
            data: data,
        });
        console.log("Get PU By Phone:", { result });
        return result;
    }
);

export const getCompanyUserRole = createAsyncThunk(
    "getCompanyUserRoles/getCompanyUserRoles",
    async (_, { getState }) => {
        const { user, token } = getState().loginInfo;

        const result = useFetch({
            url: `roles?user_id=${user._id}`,
            method: "GET",
            token: token,
        });

        return result;
    }
);

export const statusCompanyUser = createAsyncThunk(
    "statusCompanyUser/statusCompanyUser",
    async ({ id, company_id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `users/${id}?publisher_id=${company_id}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);

export const updateProfile = createAsyncThunk(
    "companyUserList/updateProfile",
    async ({ data }, { getState }) => {
        const { token, user } = getState().loginInfo;
        const result = usePostForm({
            url: `updateprofile?user_id=${user._id}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
        // const generalData = (token) => {
        //     return {
        //         method: `POST`,
        //         headers: {
        //             Accept: "application/json",
        //             Authorization: "Bearer " + token,
        //         },
        //     };
        // };
        // const test = generalData(token);
        // if (data) {
        //     test["body"] = data;
        // }

        // const response = await fetch(
        //     `${api}/user/updateprofile/user_id=${user._id}`,
        //     test
        // );
        // const result = await response.json();
        // return result;
    }
);

// export const updateProfile = createAsyncThunk(
//     "companyUserList/updateProfile",
//     async ({ data }, { getState }) => {
//         const { token, user } = getState().loginInfo;
//         const result = usePostForm({
//             url: `user/updateprofile/${user.id}`,
//             method: "POST",
//             token: token,
//             data: data,
//         });
//         console.log(result);
//         return result;
//     }
// );

export const passwordReset = createAsyncThunk(
    "companyUserList/passwordRest",
    async ({ id, data }, { getState }) => {
        const { token } = getState().loginInfo;
        const generalData = (token) => {
            return {
                method: `POST`,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            };
        };
        const test = generalData(token);
        if (data) {
            test["body"] = data;
        }

        const response = await fetch(
            `${api}/user/resetpassword/${id}`,
            test
        );
        const result = await response.json();
        return result;
    }
);
