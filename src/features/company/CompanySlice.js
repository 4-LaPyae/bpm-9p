import { createSlice, current } from "@reduxjs/toolkit";
import {
    addCompanyList,
    editCompany,
    editCompanyList,
    getCompanyDetail,
    getCompanyList,
    getCompanyUserDetail,
    statusCompany,
    getCompanyUserByEmail,
    getCompanyUserRole,
    addCompanyUser,
    editCompanyUserDetail,
    statusCompanyUser,
    updateProfile,
    passwordReset,
    getPublisherUserByPhone,
    getUserList,
    getUserListNoPeg,
} from "./CompanyApi";
import { reloadHandler } from "../login/LoginSlice";
import { checkToken } from "../../app/helper/checkToken";

const companyListInitial = {
    companyList: [],
    companyPagination: null,
};

export const CompanyList = createSlice({
    name: "getCompanyList",
    initialState: companyListInitial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getCompanyList.fulfilled,
                (state, { payload }) => {
                    console.log({ payload });
                    const { data, ...rest } = payload;
                    state.companyList = payload;
                    console.log(
                        "In Company Slice:",
                        state.companyList
                    );
                    state.companyPagination = rest;
                }
            )
            .addCase(addCompanyList.pending, (state) => {})
            .addCase(
                addCompanyList.fulfilled,
                (state, { payload }) => {
                    if (
                        state.companyPagination.current_page ===
                        state.companyPagination.last_page
                    ) {
                        state.companyList.push(payload.company);
                    }
                }
            )
            .addCase(
                statusCompany.fulfilled,
                (state, { payload }) => {
                    state.companyList = state.companyList.map(
                        (company) => {
                            if (company.id === payload.company.id) {
                                return {
                                    ...company,
                                    active: payload.company.active
                                        ? 1
                                        : 0,
                                };
                            } else {
                                return { ...company };
                            }
                        }
                    );
                }
            );
    },
});

export const companyList = CompanyList.reducer;

const companyDetailInitial = {
    companyDetail: [],
    loading: true,
    error: null,
    editStatus: null,
};

export const CompanyDetail = createSlice({
    name: "CompanyDetail",
    initialState: { ...companyDetailInitial },
    reducers: {
        resetCompanyDetail: (state) => {
            state.companyDetail = [];
        },
        setPrintSetting: (state, { payload }) => {
            state.companyDetail.print_setting = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getCompanyDetail.pending,
                (state, { payload }) => {
                    state.loading = true;
                    //pending process remove pervious state company detail
                    state.companyDetail = [];
                }
            )
            .addCase(
                getCompanyDetail.fulfilled,
                (state, { payload }) => {
                    console.log("publisher_detail", payload);
                    const { publisher } = payload;
                    state.loading = false;
                    state.companyDetail = publisher;
                    state.error = null;
                }
            )
            .addCase(editCompany.pending, (state) => {
                state.error = true;
                state.editStatus = "pending";
            })
            .addCase(editCompany.fulfilled, (state, { payload }) => {
                console.log({ payload });
                state.companyDetail = payload.publisher;
                state.error = payload.error;
                state.editStatus = "success";
            });
    },
});

export const { resetCompanyDetail, setPrintSetting } =
    CompanyDetail.actions;
export const companyDetail = CompanyDetail.reducer;

const initialCompanyUser = {
    allUser: [],
    usersList: [],
    loading: true,
    getStatus: null,
    userByEmail: null,
    userByPhone: null,
    message: null,
    pagination: {},
    paginationData: {
        page: 1,
        limit: 10,
    },
};

export const companyUserList = createSlice({
    name: "companyUserList",
    initialState: { ...initialCompanyUser },
    reducers: {
        changePaginationData: (state, { payload }) => {
            state.paginationData = payload;
        },
        handleUsers: (state, payload) => {
            const { data, ...rest } = payload;
            state.usersList = data;
            state.pagination = rest;
        },
        removeUserByEmail: (state, { payload }) => {
            state.userByEmail = null;
        },
        removeMessage: (state, { payload }) => {
            state.message = null;
        },
        removeUserByPhone: (state, { payload }) => {
            state.userByPhone = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getCompanyDetail.fulfilled, (state, { payload }) => {
            //     console.log({ payload });
            //     const { users } = payload;
            //     state.usersList = users;
            //     console.log(state.usersList);
            // })
            .addCase(getUserList.pending, (state, { payload }) => {
                state.getStatus = "pending";
            })
            .addCase(
                getUserListNoPeg.fulfilled,
                (state, { payload }) => {
                    state.allUser = payload.data;
                }
            )
            .addCase(getUserList.fulfilled, (state, { payload }) => {
                checkToken(payload);
                state.getStatus = "success";
                companyUserList.caseReducers.handleUsers(
                    state,
                    payload
                );
                state.userByPhone = null;
            })
            .addCase(
                addCompanyUser.fulfilled,
                (state, { payload }) => {
                    checkToken(payload);
                    state.usersList.unshift(payload.user);
                    state.userByPhone = null;
                }
            )
            .addCase(
                getCompanyUserByEmail.pending,
                (state, { payload }) => {
                    state.loading = true;
                }
            )
            .addCase(
                getCompanyUserByEmail.fulfilled,
                (state, { payload }) => {
                    checkToken(payload);
                    state.loading = false;
                    state.userByEmail = payload;
                }
            )
            .addCase(
                getPublisherUserByPhone.fulfilled,
                (state, { payload }) => {
                    checkToken(payload);
                    console.log({ payload });
                    state.loading = false;
                    state.userByPhone = payload;
                }
            )
            .addCase(
                editCompanyUserDetail.fulfilled,
                (state, { payload }) => {
                    console.log({ payload });
                    checkToken(payload);
                    state.usersList = state.usersList.map((user) => {
                        console.log({ user });
                        if (user?._id === payload?.user?._id) {
                            return payload.user;
                        } else {
                            return user;
                        }
                    });
                }
            )
            .addCase(
                statusCompanyUser.fulfilled,
                (state, { payload }) => {
                    checkToken(payload);
                    state.usersList = state.usersList.map((user) => {
                        if (user.id == payload.user._id) {
                            return {
                                ...user,
                                status: payload.user.status,
                            };
                        } else {
                            return { ...user };
                        }
                    });
                }
            )
            .addCase(
                updateProfile.fulfilled,
                (state, { payload }) => {
                    console.log({ payload });
                    checkToken(payload);
                    state.usersList = state.usersList.map((user) => {
                        if (user.id === payload.user._id) {
                            return { ...payload.user };
                        } else {
                            return { ...user };
                        }
                    });
                }
            )
            .addCase(
                passwordReset.fulfilled,
                (state, { payload }) => {
                    checkToken(payload);
                    state.message = payload;
                }
            );
    },
});

export const companyUser = companyUserList.reducer;
export const {
    removeUserByEmail,
    removeUserByPhone,
    removeMessage,
    changePaginationData,
} = companyUserList.actions;

const initialCompanyRole = {
    roles: [],
};

const companyUserRoleList = createSlice({
    name: "companyUserRole",
    initialState: { ...initialCompanyRole },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getCompanyUserRole.pending,
                (state, { payload }) => {}
            )
            .addCase(
                getCompanyUserRole.fulfilled,
                (state, { payload }) => {
                    checkToken(payload);

                    const options = payload?.map((data) => {
                        return {
                            label: data.description,
                            id: data._id,
                        };
                    });
                    state.roles = options;
                }
            );
    },
});
export const companyUserRole = companyUserRoleList.reducer;
export const { getRoles } = companyUserRoleList.actions;

export const initialCompanyUserDetail = {
    userInfo: {},
};
export const companyUserDetail = createSlice({
    name: "companyUserDetail",
    initialState: { ...initialCompanyUserDetail },
    reducers: {
        initCompanyUserDetail: (state) => {
            return initialCompanyUserDetail;
        },
        changeUserInfo: (state, { payload }) => {
            state.userInfo = payload;
        },
    },
});
export const companyUserInfo = companyUserDetail.reducer;
export const companyUserDetailActions = companyUserDetail.actions;
