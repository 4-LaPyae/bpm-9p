import {
    Box,
    Stack,
    Typography,
    Paper,
    Avatar,
    CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import MkButton from "../../app/assets/theme/MkButton";
import { useTheme } from "@mui/material/styles";
import CompanyLinkTab from "./CompanyLinkTab";
import {
    Navigate,
    Route,
    Routes,
    useNavigate,
    useParams,
} from "react-router-dom";
import TabView from "./TabView";
import { useDispatch, useSelector } from "react-redux";
import {
    getCompanyDetail,
    getCompanyList,
    getCompanyUserRole,
} from "../../features/company/CompanyApi";
import EditCompany from "./EditCompany";
import Loading from "../../app/components/Loading/Loading";
import {
    localStorageHandler,
    onSetCompanyId,
} from "../../features/login/LoginSlice";
import { imageApi } from "../../app/hooks";
import { allBook } from "../../features/book/BookApi";
import { resetCompanyDetail } from "../../features/company/CompanySlice";
import { resetBook } from "../../features/book/BookSlice";

function CompanyDetail() {
    const theme = useTheme();
    const { name } = useParams();
    const [tabIndex, setTabIndex] = useState(0);
    const [editOpen, setEditOpen] = useState(false);
    const [message, setMessage] = useState("");
    const { publisher } = useSelector((state) => state.loginInfo);
    const { books } = useSelector((state) => state.BookSlice);
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [bookTitle, setBookTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [releaseYear, setReleaseYear] = useState(null);
    const [genreOption, setGenreOption] = useState("");

    const { companyDetail, loading } = useSelector(
        (state) => state.companyDetail
    );

    const companyEdit = () => {
        setEditOpen(true);
    };

    useEffect(() => {
        dispatch(getCompanyDetail({ id: publisher[0]?._id }))
            .unwrap()
            .then((result) => {
                console.log({ result });
                setMessage(result?.message);
            });

        // const expiredTime = new Date(
        //     new Date().getTime() + 1209600 * 1000
        // );
        // dispatch(localStorageHandler(expiredTime));
        dispatch(getCompanyUserRole());
    }, [publisher]);

    if (message) {
        return (
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                padding={30}
            >
                <Typography
                    component="div"
                    variant="h3"
                    sx={{ fontWeight: "bold", fontSize: 40 }}
                >
                    {message}
                </Typography>
            </Stack>
        );
    }

    const renderCompanyDetail = (
        <Stack direction="column" spacing={3}>
            <Box sx={{ position: "relative", mb: 1 }}>
                <Avatar
                    sx={{
                        borderRadius: 2.5,
                        width: 1000,
                        height: 220,
                        objectFit: "cover",
                        margin: "auto",
                    }}
                    src={`${imageApi}${companyDetail?.banner_image}`}
                    alt={companyDetail?.name}
                />
                <Avatar
                    sx={{
                        borderRadius: 2.5,
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        position: "absolute",
                        top: 10,
                        left: 200,
                        border: "2px solid black",
                    }}
                    src={`${imageApi}${companyDetail?.publisher_logo}`}
                    alt={companyDetail?.name}
                />
            </Box>
            <Box>
                <Typography
                    sx={{
                        width: 1000,
                        margin: "auto",
                    }}
                    component="div"
                    variant="subtitle1"
                    fontWeight={"bold"}
                >
                    {companyDetail?.name}
                </Typography>
                <Stack
                    sx={{
                        width: 1000,
                        margin: "auto",
                        // mb: 1,
                    }}
                    spacing={3}
                    direction="row"
                >
                    <Typography variant="subtitle2" component="div">
                        {companyDetail?.contact_person}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        {companyDetail?.phone}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        {companyDetail?.address}
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    );

    return (
        // <Box
        //     sx={{
        //         minHeight: "calc(100vh - 110px)",
        //     }}
        // >
        //     <Box
        //         sx={{ padding: "15px 20px 25px 20px" }}
        //         component={Paper}
        //     >
        //         <Box>
        //             <Stack direction="column" justifyContent="center">
        //                 <Stack
        //                     direction="row"
        //                     spacing={2}
        //                     justifyContent="end"
        //                 >
        //                     {companyDetail?.length == 0 ? (
        //                         ""
        //                     ) : (
        //                         <MkButton
        //                             mkcolor={`linear-gradient(310deg, ${theme.palette.gradientDark.main}, ${theme.palette.gradientDark.light})`}
        //                             size="small"
        //                             onClick={companyEdit}
        //                         >
        //                             Edit
        //                         </MkButton>
        //                     )}
        //                 </Stack>
        //                 {renderCompanyDetail}
        //             </Stack>
        //         </Box>

        //         {companyDetail.length == 0 ? (
        //             ""
        //         ) : (
        //             <CompanyLinkTab
        //                 tabIndex={tabIndex}
        //                 setTabIndex={setTabIndex}
        //             />
        //         )}
        //     </Box>
        //     <Box>
        //         <TabView
        //             tabIndex={tabIndex}
        //             setTabIndex={setTabIndex}
        //         />
        //     </Box>
        //     {/* Edit company model box */}
        //     <EditCompany
        //         open={editOpen}
        //         setOpen={setEditOpen}
        //         companyDetail={companyDetail ?? []}
        //     />
        // </Box>
        <Box
            sx={{ padding: "15px 20px 25px 20px" }}
            component={Paper}
        >
            {loading ? (
                <Box sx={{ height: "900px" }}>
                    <CircularProgress
                        sx={{ marginLeft: "50%", marginTop: "25%" }}
                    />
                </Box>
            ) : (
                <EditCompany
                    companyDetail={companyDetail ?? []}
                    open={true}
                />
            )}
        </Box>
    );
}

export default CompanyDetail;
