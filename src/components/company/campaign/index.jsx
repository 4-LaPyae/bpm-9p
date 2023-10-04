import { Typography, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCampaignList } from "../../../features/company/CampaignApi";
import CampaignTable from "./CampaignTable";

export default ({ setTabIndex }) => {
    const dispatch = useDispatch();
    const { name } = useParams();
    const id = name.split("-diuu-")[1];
    const { companyDetail } = useSelector((state) => state.companyDetail);
    useEffect(() => {
        dispatch(getCampaignList({ page: 0, limit: 10, id: id }));
    }, [id]);
    return (
        <Box>
            <CampaignTable setTabIndex={setTabIndex} />
        </Box>
    );
};
