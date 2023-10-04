import React, { useEffect, useRef } from "react";
import {
    Box,
    Typography,
    Paper,
    Toolbar,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Button,
    Stack,
    InputBase,
    IconButton,
    Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Add, ReadMore, Settings, TableRows } from "@mui/icons-material";
import InputFormComponent from "../../../app/components/Form/InputFormComponent";
import { useState } from "react";
import TandcTableitem from "./TandcTableItem";
import {
    useTheme,
    styled,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { add_tandc, reorder_tandc } from "../../../features/company/TandcApi";
import DragDrop from "../dragNdrop";
import {
    add_pretext,
    reorder_promotion,
} from "../../../features/company/CampaignApi";
import AlertBox from "../../../app/components/AlertBox/AlertBox";
import TandcEdit from "./TandcEdit";
import { onReorderTandc } from "../../../features/company/TandcSlice";
import MkButton from "../../../app/assets/theme/MkButton";

const MkToolbar = styled(Toolbar)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        padding: "0px",
    },
}));

function TandcTable({ tabIndex, setTabIndex }) {
    const theme = useTheme();
    const { tandcList } = useSelector((state) => state.tandcList);
    const { campaignInfo } = useSelector((state) => state.campaignDetail);
    const [show, setShow] = useState(false);
    const [description, setDescription] = useState("");
    const [pretext, setPretext] = useState("");
    const [savePretext, setSavePretext] = useState("");
    const dispatch = useDispatch();
    const [alertState, setAlertState] = useState();

    const handleInput = () => {
        setShow(true);
        setDescription("");
    };

    const handleAdd = () => {
        setShow(false);
        if (description === "") {
            setAlertState({
                open: true,
                vertical: "top",
                horizontal: "center",
                variant: "error",
                message: "Please Fill Description!",
            });
            return;
        }
        const data = {
            description: description,
            campaign_id: campaignInfo.id,
            active: 0,
        };
        dispatch(add_tandc({ data: data }));
        setDescription("");
    };

    const handleAddPretext = () => {
        const data = {
            pretext: pretext,
        };
        dispatch(add_pretext({ id: campaignInfo.id, data: data }));
        setPretext("");
    };

    // for drag and drop
    const { drag } = useSelector((state) => state.dragSlice);
    const [accept, setAccept] = useState(false);
    const dragEnd = () => {
        if (drag?.source) {
            const postData = {
                campaign_id: campaignInfo.id,
                terms_and_condition_id: drag.item.id,
                source_sorting_order: drag.source.index,
                destination_sorting_order: drag.destination.index,
            };
            dispatch(reorder_tandc({ data: postData }));
        }
    };
    useEffect(() => {
        if (drag?.source) {
            setAccept(true);
        } else {
            setAccept(false);
        }
    }, [drag]);

    return (
        <Box component={Paper}>
            <Box sx={{ padding: "20px" }}>
                <MkToolbar sx={{ padding: 0 }}>
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="subtitle1"
                        component="div"
                    >
                        Terms and Conditions
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            onClick={handleInput}
                            sx={{
                                display:
                                    campaignInfo.finish === 1 ? "none" : "",
                            }}
                        >
                            <Add sx={{ color: "#2152ff" }} />
                        </IconButton>
                        {/* <IconButton onClick={() => setTabIndex(7)}>
                            <Settings sx={{ color: "#2152ff" }} />
                        </IconButton> */}
                    </Stack>
                </MkToolbar>
                <Box
                    sx={{
                        marginBottom: "20px",
                        display: campaignInfo.finish === 1 ? "none" : " ",
                    }}
                >
                    <Box textAlign="right">
                        <InputFormComponent
                            placeholder="Enter Pretext"
                            label=""
                            name="pretext"
                            value={pretext ?? campaignInfo.tnc_pretext}
                            onChange={(e) => {
                                setPretext(e.target.value);
                            }}
                            multiline={true}
                            rows={4}
                            onBlur={handleAddPretext}
                        />
                        {/* <MkButton
                            mkcolor={`linear-gradient(310deg, ${theme.palette.gradientDark.main}, ${theme.palette.gradientDark.light})`}
                            size="small"
                            onClick={handleAddPretext}
                            sx={{ marginTop: "10px" }}
                        >
                            Save
                        </MkButton> */}
                    </Box>
                </Box>
                <Box sx={{ width: "100%", height: "calc(50vh - 45px)", mt: 2 }}>
                    <DragDrop
                        list={tandcList}
                        accept={accept}
                        dragEnd={dragEnd}
                        listChangeSlice={onReorderTandc}
                        tabIndex={tabIndex}
                    >
                        {({ listItem: listItem }) => (
                            <TandcEdit item={listItem} />
                        )}
                    </DragDrop>
                </Box>
                <Box
                    sx={{
                        padding: "0px 15px",
                        display: show ? "block" : "none",
                    }}
                >
                    <InputFormComponent
                        placeholder="Description"
                        label=""
                        focus={show}
                        name="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        multiline={true}
                        rows={4}
                        onBlur={handleAdd}
                    />
                </Box>
            </Box>
            <AlertBox alertState={alertState} />
        </Box>
    );
}

export default TandcTable;
