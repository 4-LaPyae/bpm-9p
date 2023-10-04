import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Box,
    Input,
    Stack,
    Avatar,
    Typography,
    InputLabel,
} from "@mui/material";
import imageLogo from "../../app/assets/images/ImageIcon.png";
import {
    editCompany,
    editPublisher,
    getCompanyDetail,
} from "../../features/company/CompanyApi";
import CompanyInputs from "./CompanyInputs";
import { useSelector } from "react-redux";
import { imageApi } from "../../app/hooks";
import DefaultImage from "../../app/assets/images/nineP.png";
import { citiesOptions } from "../../features/location/CityApi";
import { townshipOptions } from "../../features/location/TownshipApi";
import {
    localStorageHandler,
    onSetPublisher,
} from "../../features/login/LoginSlice";

export default function EditCompany({
    open,
    setOpen,
    companyDetail,
}) {
    const dispatch = useDispatch();
    let { publisher_logo, banner_image, active, ...rest } =
        companyDetail;
    const { error, editStatus } = useSelector(
        (state) => state.companyDetail
    );
    const { publisher } = useSelector((state) => state.loginInfo);
    const [imageChange, setImageChange] = useState(false);
    const [bannerImageChange, setBannerImageChange] = useState(false);
    const [checked, setChecked] = useState(active ? true : false);
    const [imageData, setImageData] = useState(DefaultImage);
    const [imageFile, setImageFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerImageData, setBannerImageData] = useState("#");
    const [division, setDivision] = useState(null);
    const [township, setTownship] = useState(null);
    const [city, setCity] = useState(null);
    const [nameChange, setNameChange] = useState("");
    const [addressChange, setAddressChange] = useState("");
    const [phoneChange, setPhoneChange] = useState("");
    const [contactPersonChange, setContactPersonChange] =
        useState("");
    const [contactPersonPhChange, setContactPersonPhChange] =
        useState("");
    const [updateHandler, setUpdateHandler] = useState(false);
    const [commercial, setCommercial] = useState({ name: 0 });

    useEffect(() => {
        if (open) {
            dispatch(
                citiesOptions({ id: companyDetail?.division?._id })
            );
            dispatch(
                townshipOptions({ id: companyDetail?.city?._id })
            );

            setChecked(active ? true : false);
            setImageData(
                publisher_logo
                    ? `${imageApi}${publisher_logo}`
                    : DefaultImage
            );
            setBannerImageData(
                banner_image ? `${imageApi}${banner_image}` : "#"
            );
            setBannerImageChange(false);
            setImageChange(false);
            setDivision({
                id: companyDetail.division?._id,
                name: companyDetail.division?.name,
            });
            setCity({
                id: companyDetail.city?._id,
                name: companyDetail.city?.name,
            });

            setTownship({
                id: companyDetail.township?._id,
                name: companyDetail.township?.name,
            });
            setCommercial({ name: companyDetail.commercial_tax });
        }

        // if (updateHandler) {
        //     console.log("Company Detail in updateHandler", companyDetail);
        //     console.log({ updateHandler });
        //     dispatch(citiesOptions({ id: companyDetail?.division?._id }));
        //     dispatch(townshipOptions({ id: companyDetail?.city?._id }));
        // }
    }, [active, open]);

    const handleClose = () => {
        setImageFile(null);
        setBannerFile(null);
        setChecked(false);
        // setOpen(false);
        setImageData(DefaultImage);
        setBannerImageData("#");
        setDivision("");
        setTownship("");
        setCity("");
        setImageChange(false);
        setBannerImageChange(false);
    };

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

    //Todo when close popup clear the data include switch value. upload image button should be fullwidth

    const handleAdd = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", nameChange);
        formData.append("address", addressChange);
        formData.append("phone", phoneChange);
        formData.append("contact_person", contactPersonChange);
        formData.append("commercial_tax", Number(commercial.name));
        formData.append(
            "contact_person_phone",
            contactPersonPhChange
        );
        formData.append(
            "active",
            checked === true ? Number(1) : Number(0)
        );
        formData.append(
            "township_id",
            township._id ? township._id : township.id
        );
        formData.append("city_id", city._id ? city._id : city.id);
        formData.append(
            "division_id",
            division._id ? division._id : division.id
        );
        formData.append("banner_image", bannerFile ? bannerFile : "");
        formData.append("publisher_logo", imageFile ? imageFile : "");
        // formData.forEach(function (value, key) {
        //     console.log(key, value);
        // });
        dispatch(
            editCompany({ data: formData, id: companyDetail?._id })
        )
            .unwrap()
            .then((result) => {
                console.log({ result });
                if (result.error === false) {
                    dispatch(
                        getCompanyDetail({ id: publisher[0]?._id })
                    );
                    handleClose();
                    // dispatch(onSetPublisher(result.publisher));
                    // setUpdateHandler(true);
                }
            });
    };

    //imageInput change
    const imageInputChange = (e) => {
        // setImageData(e.target.files[0]);

        // for base64
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImageFile(reader.result);
        };
        // setImageFile(e.target.files[0]);

        setImageChange(true);

        setImageData(URL.createObjectURL(e.target.files[0]));
        // for base64
    };

    const bannerImageInputChange = (e) => {
        setBannerImageData(e.target.files[0]);

        // for base64
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setBannerFile(reader.result);
        };
        // setBannerFile(e.target.files[0]);

        setBannerImageChange(true);

        setBannerImageData(URL.createObjectURL(e.target.files[0]));
        // for base64
    };

    // console.log("township in edit company:", township);

    return (
        // <Dialog
        //     open={open}
        //     onClose={handleClose}
        //     maxWidth="md"
        //     component="form"
        //     onSubmit={handleAdd}
        // >
        //     <DialogContent>
        //         <Stack
        //             direction="column"
        //             spacing={1}
        //             justifyContent="space-between"
        //         >
        //             <DialogContentText sx={{ padding: "10px 35px " }}>
        //                 <Typography
        //                     sx={{
        //                         fontSize: "1.2rem",
        //                         fontWeight: "bold",
        //                     }}
        //                 >
        //                     Edit Publisher
        //                 </Typography>
        //             </DialogContentText>
        //             <Box sx={{ padding: "0px 35px" }}>
        //                 <InputLabel
        //                     htmlFor="contained-button-file-banner"
        //                     sx={{ fontSize: "14.5px", mb: 1 }}
        //                 >
        //                     Choose Publisher Profile Image
        //                 </InputLabel>
        //                 <label htmlFor="contained-button-file">
        //                     <Input
        //                         // accept="image/*"
        //                         inputProps={{ accept: "image/*" }}
        //                         id="contained-button-file"
        //                         type="file"
        //                         name="publisher_logo"
        //                         sx={{
        //                             display: "none",
        //                         }}
        //                         onChange={imageInputChange}
        //                     />
        //                     <Box
        //                         sx={{
        //                             border: "1px solid black",
        //                             borderRadius: "10px",
        //                         }}
        //                         width={80}
        //                         height={80}
        //                     >
        //                         <Avatar
        //                             sx={{
        //                                 width: "80%",
        //                                 height: "80%",
        //                                 margin: "auto",
        //                                 cursor: "pointer",
        //                                 mt: 1,
        //                             }}
        //                             variant="rounded"
        //                             src={imageData}
        //                         >
        //                             9Publishers
        //                         </Avatar>
        //                     </Box>
        //                 </label>
        //             </Box>
        //         </Stack>
        //         <Box sx={{ padding: "0px 35px", mt: 3 }}>
        //             <InputLabel
        //                 htmlFor="contained-button-file-banner"
        //                 sx={{ fontSize: "14.5px", mb: 1 }}
        //             >
        //                 Choose Publisher Banner Image
        //             </InputLabel>
        //             <label htmlFor="contained-button-file-banner">
        //                 <Input
        //                     accept="image/*"
        //                     id="contained-button-file-banner"
        //                     type="file"
        //                     name="banner_image"
        //                     sx={{
        //                         display: "none",
        //                     }}
        //                     onChange={bannerImageInputChange}
        //                 />
        //                 <Box
        //                     sx={{
        //                         // border: '1px solid black',
        //                         borderRadius: "10px",
        //                     }}
        //                     width={"100%"}
        //                     height={"250px"}
        //                 >
        //                     <Avatar
        //                         sx={{
        //                             width: "100%",
        //                             height: "100%",
        //                             margin: "auto",
        //                             cursor: "pointer",
        //                             fontSize: "2rem",
        //                         }}
        //                         variant="rounded"
        //                         src={bannerImageData}
        //                     >
        //                         Publisher Banner
        //                     </Avatar>
        //                 </Box>
        //             </label>
        //         </Box>
        //         <CompanyInputs
        //             handleCheck={handleCheck}
        //             checked={checked}
        //             setDivision={setDivision}
        //             setCity={setCity}
        //             setTownship={setTownship}
        //             division={division}
        //             city={city}
        //             township={township}
        //             inputValues={companyDetail}
        //             nameChange={nameChange}
        //             setNameChange={setNameChange}
        //             phoneChange={phoneChange}
        //             setPhoneChange={setPhoneChange}
        //             addressChange={addressChange}
        //             setAddressChange={setAddressChange}
        //             contactPersonChange={contactPersonChange}
        //             setContactPersonChange={setContactPersonChange}
        //             contactPersonPhChange={contactPersonPhChange}
        //             setContactPersonPhChange={
        //                 setContactPersonPhChange
        //             }
        //         />
        //     </DialogContent>
        //     <DialogActions sx={{ padding: "15px 35px" }}>
        //         <Button onClick={handleClose}>Cancel</Button>
        //         {error ? (
        //             <Button disabled>Updating</Button>
        //         ) : (
        //             <Button type="submit">Update</Button>
        //         )}
        //     </DialogActions>
        // </Dialog>
        <Box>
            <Stack
                direction="column"
                spacing={1}
                justifyContent="space-between"
            >
                <DialogContentText sx={{ padding: "10px 35px " }}>
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        Publisher Setting
                    </Typography>
                </DialogContentText>
                <Stack
                    sx={{ padding: "0px 35px", width: "100%", mt: 3 }}
                    direction={"row"}
                    alignItems={"center"}
                    // spacing={2}
                >
                    <Box width={"10%"}>
                        {/* <InputLabel
                            htmlFor="contained-button-file-banner"
                            sx={{ fontSize: "14.5px", mb: 1 }}
                        >
                            Choose Publisher Profile Image
                        </InputLabel> */}
                        <label htmlFor="contained-button-file">
                            <Input
                                // accept="image/*"
                                inputProps={{ accept: "image/*" }}
                                id="contained-button-file"
                                type="file"
                                name="publisher_logo"
                                sx={{
                                    display: "none",
                                }}
                                onChange={imageInputChange}
                            />
                            <Box
                                sx={{
                                    border: "1px solid black",
                                    borderRadius: "10px",
                                }}
                                width={80}
                                height={80}
                            >
                                <Avatar
                                    sx={{
                                        width: "80%",
                                        height: "80%",
                                        margin: "auto",
                                        cursor: "pointer",
                                        mt: 1,
                                    }}
                                    variant="rounded"
                                    src={imageData}
                                >
                                    9Publishers
                                </Avatar>
                            </Box>
                        </label>
                    </Box>
                    <Box width={"90%"}>
                        {/* <InputLabel
                            htmlFor="contained-button-file-banner"
                            sx={{ fontSize: "14.5px", mb: 1 }}
                        >
                            Choose Publisher Banner Image
                        </InputLabel> */}
                        <label htmlFor="contained-button-file-banner">
                            <Input
                                accept="image/*"
                                id="contained-button-file-banner"
                                type="file"
                                name="banner_image"
                                sx={{
                                    display: "none",
                                }}
                                onChange={bannerImageInputChange}
                            />
                            <Box
                                sx={{
                                    // border: '1px solid black',
                                    borderRadius: "10px",
                                }}
                                width={"100%"}
                                height={"250px"}
                            >
                                <Avatar
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        margin: "auto",
                                        cursor: "pointer",
                                        fontSize: "2rem",
                                    }}
                                    variant="rounded"
                                    src={bannerImageData}
                                >
                                    Publisher Banner
                                </Avatar>
                            </Box>
                        </label>
                    </Box>
                </Stack>
            </Stack>

            <CompanyInputs
                handleCheck={handleCheck}
                checked={checked}
                setDivision={setDivision}
                setCity={setCity}
                setTownship={setTownship}
                division={division}
                city={city}
                township={township}
                inputValues={companyDetail}
                nameChange={nameChange}
                setNameChange={setNameChange}
                phoneChange={phoneChange}
                setPhoneChange={setPhoneChange}
                addressChange={addressChange}
                setAddressChange={setAddressChange}
                contactPersonChange={contactPersonChange}
                setContactPersonChange={setContactPersonChange}
                contactPersonPhChange={contactPersonPhChange}
                setContactPersonPhChange={setContactPersonPhChange}
                commercial={commercial}
                setCommercial={setCommercial}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {/* <Button onClick={handleClose}>Cancel</Button> */}
                {error ? (
                    <Button disabled variant="contained">
                        Updating
                    </Button>
                ) : (
                    <Button onClick={handleAdd} variant="contained">
                        Update
                    </Button>
                )}
            </Box>
        </Box>
    );
}
