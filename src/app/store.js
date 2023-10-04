import { configureStore } from "@reduxjs/toolkit";
import { loginInfo } from "../features/login/LoginSlice";
import { AlertControl } from "../app/components/Alert/alertSlice";
import {
    companyList,
    companyDetail,
    companyUser,
    companyUserInfo,
    companyUserRole,
} from "../features/company/CompanySlice";
import { adminList } from "../features/admin/AdminSlice";
import { citiesData } from "../features/cites/CitiesSlice";
import { tandcList } from "../features/company/TandcSlice";
import { couponList } from "../features/company/CouponSlice";
import {
    campaignList,
    campaignDetail,
    promotions,
    promotionColorSlice,
} from "../features/company/CampaignSlice";
import { dragSlice } from "../components/company/dragNdrop/dragSlice";
import { csvexport } from "../features/csvexport/csvSlice";
import { DivisionListSlice } from "../features/location/DivisionSlice";
import { CitiesListSlice } from "../features/location/CitySlice";
import { TownshipListSlice } from "../features/location/TownshipSlice";
import { BookSlice } from "../features/book/BookSlice";
import { ExpenseCategorySlice } from "../features/expense_category/ExpenseCategorySlice";
import { ProductSlice } from "../features/product/ProductSlice";
import {
    AuthorSlice,
    SearchAuthorSlice,
} from "../features/author/AuthorSlice";
import { GenreSlice } from "../features/genre/GenreSlice";
import { EditionSlice } from "../features/edition/EditionSlice";
import { ReleaseSlice } from "../features/release/ReleaseSlice";
import { SelectCategoryListSlice } from "../components/company/product/SelectCategoriesFullScreenSlice";
import { ExpensesSlice } from "../features/expenses/expensesSlice";
import { CustomerSlice } from "../features/customer/CustomerSlice";
import { CouriersSlice } from "../features/couriers/CouriersSlice";
import { InvoicesSlice } from "../features/invoices/invoicesSlice";
import { SettingSlice } from "../features/company/settingSlice";
import { ReturnDamageListSlice } from "../features/returnBooks/ReturnSlice";

const store = configureStore({
    reducer: {
        AlertControl,
        loginInfo,
        companyList,
        companyDetail,
        adminList,
        companyUser,
        companyUserInfo,
        companyUserRole,
        citiesData,
        campaignList,
        campaignDetail,
        promotions,
        dragSlice,
        tandcList,
        promotionColorSlice,
        couponList,
        csvexport,
        ExpenseCategorySlice,
        AuthorSlice,
        ProductSlice,
        SearchAuthorSlice,
        DivisionListSlice,
        CitiesListSlice,
        TownshipListSlice,
        BookSlice,
        GenreSlice,
        EditionSlice,
        ReleaseSlice,
        SelectCategoryListSlice,
        ExpensesSlice,
        CustomerSlice,
        CouriersSlice,
        InvoicesSlice,
        SettingSlice,
        ReturnDamageListSlice,
    },
});

export default store;
