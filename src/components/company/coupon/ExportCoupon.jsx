import { FileDownload } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { createRef } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { format, isValid } from "date-fns";
import { formatMoney } from "../../../app/helper/formatMoney.js";

function ExportCoupon() {
    const { csvdata } = useSelector((state) => state.csvexport);
    // console.log(csvdata.campaign);
    const headers = [
        { label: "Campaign", key: "campaign" },
        { label: "Coupon Code", key: "code" },
        { label: "Invoice ID", key: "invoice_id" },
        { label: "Consumer Name", key: "consumer_name" },
        { label: "Consumer Phone", key: "consumer_phone" },
        { label: "Spending Amount", key: "spending_amount" },
        { label: "promotion", key: "promotion" },
        { label: "Winning Amount", key: "winning_amount" },
        { label: "Coupon Status", key: "coupon_status" },
    ];

    const getPromotion = (id) => {
        return csvdata?.campaign?.promotions.find((promo) => promo.id === id);
    };

    const data = [];
    csvdata?.campaign?.coupons?.forEach((item) => {
        data.push({
            campaign: csvdata?.campaign?.event_title,
            code: item.code,
            invoice_id: item.invoice_id ?? "N/A",
            consumer_name: item.consumer_name ?? "N/A",
            consumer_phone: item.consumer_phone ?? "N/A",
            spending_amount: formatMoney(item.spending_amount),
            promotion: item.promotion_id
                ? getPromotion(item.promotion_id)?.title
                : "N/A",
            winning_amount: formatMoney(item.winning_amount),
            coupon_status: item.promotion_id ? "Used" : "Unused",
        });
    });

    data.push({
        campaign: "",
        code: "",
        invoice_id: "",
        consumer_name: "",
        consumer_phone: "",
        spending_amount: "",
        promotion: "",
        winning_amount: "",
    });

    data.push({
        campaign: "Total",
        code: formatMoney(csvdata?.campaign?.coupons_count),
        invoice_id: "",
        consumer_name: "",
        consumer_phone: "",
        spending_amount:
            csvdata?.campaign?.total_spending_amount === null
                ? 0
                : formatMoney(csvdata?.campaign?.total_spending_amount),
        promotion: formatMoney(csvdata?.campaign?.promotions_count),
        winning_amount:
            csvdata?.campaign?.total_winning_amount === null
                ? 0
                : formatMoney(csvdata?.campaign?.total_winning_amount),
    });

    data.push({
        campaign: "",
        code: "",
        invoice_id: "",
        consumer_name: "",
        consumer_phone: "",
        spending_amount: "",
        promotion: "",
        winning_amount: "",
    });

    // data.push({
    //     campaign: "Campaign Status",
    //     code: "",
    //     invoice_id: "",
    //     consumer_name: "",
    //     consumer_phone: "",
    //     spending_amount: "",
    //     promotion: "",
    //     winning_amount: "",
    // });
    // data.push({
    //     campaign: "Start Date",
    //     code: "End Date",
    //     invoice_id: "Disabled Status",
    //     consumer_name: "Finish Status",
    //     consumer_phone: "",
    //     spending_amount: "",
    //     promotion: "",
    //     winning_amount: "",
    // });
    // data.push({
    //     campaign: csvdata?.campaign?.start,
    //     code: csvdata?.campaign?.end,
    //     invoice_id: csvdata?.campaign?.disable === 1 ? "Enable" : "Disable",
    //     consumer_name: csvdata?.campaign?.finish === 1 ? "Finished" : "Ongoing",
    //     consumer_phone: "",
    //     spending_amount: "",
    //     promotion: "",
    //     winning_amount: "",
    // });

    return (
        <>
            <CSVLink
                headers={headers}
                data={data}
                filename={
                    format(new Date(), "yyyy'-'MM'-'dd_hh':'mm':'ss") + ".csv"
                }
                separator={";"}
            >
                <IconButton>
                    <FileDownload sx={{ color: "#2152ff" }} />
                </IconButton>
            </CSVLink>
        </>
    );
}

export default ExportCoupon;
