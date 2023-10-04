// import {
//     Box,
//     Checkbox,
//     FormControlLabel,
//     FormGroup,
//     Paper,
//     Stack,
//     Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import MkButton from "../../../app/assets/theme/MkButton";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { updatePrintSetting } from "../../../features/company/settingApi";
// import {
//     addError,
//     clearError,
//     showAlert,
//     showSuccess,
// } from "../../../app/components/Alert/alertSlice";
// import { setPrintSetting } from "../../../features/company/CompanySlice";
// import {
//     getCompanyDetail,
//     getCompanyUserRole,
// } from "../../../features/company/CompanyApi";

// export default function CommercialTaxTabView() {
//     const dispatch = useDispatch();
//     const { setting, commercial } = useSelector(
//         (state) => state.SettingSlice
//     );
//     const { publisher } = useSelector((state) => state.loginInfo);
//     const { companyDetail } = useSelector(
//         (state) => state.companyDetail
//     );
//     const [loading, setLoading] = useState(false);

//     const [taxState, setTaxState] = useState({
//         zero: false,
//         three: true,
//         five: false,
//         ten: false,
//     });

//     const { zero, three, five, ten } = taxState;

//     const handleChangeTax = (event) => {
//         const name = event.target.name;
//         const checked = event.target.checked;
//         var newState = {};
//         if (name == "0%") {
//             newState = {
//                 zero: checked,
//                 three: !checked,
//                 five: !checked,
//                 ten: !checked,
//             };
//         }
//         if (name == "3%") {
//             newState = {
//                 zero: !checked,
//                 three: checked,
//                 five: !checked,
//                 ten: !checked,
//             };
//         }
//         if (name == "5%") {
//             newState = {
//                 zero: !checked,
//                 three: !checked,
//                 five: checked,
//                 ten: !checked,
//             };
//         }
//         if (name == "10%") {
//             newState = {
//                 zero: !checked,
//                 three: !checked,
//                 five: !checked,
//                 ten: checked,
//             };
//         }
//         setTaxState(newState);
//     };

//     const handleUpdatePrintSetting = () => {
//         const tax =
//             zero === true
//                 ? 0
//                 : three === true
//                 ? 1
//                 : five === true
//                 ? 2
//                 : 3;
//         console.log(setting);
//         const data = {
//             publisher_id: publisher[0]?._id,
//             print_setting: {
//                 address: setting.address,
//                 name: setting.name,
//                 printer_type: setting.printer_type,
//                 publisher_logo: setting.publisher_logo,
//             },
//             type: 2,
//             commercial_tax: tax,
//         };

//         setLoading(true);
//         dispatch(updatePrintSetting({ data: data }))
//             .unwrap()
//             .then((result) => {
//                 console.log(result);
//                 if (result.error || result.errors) {
//                     dispatch(addError("Something wrong. Try Again!"));
//                 } else {
//                     dispatch(
//                         showSuccess("Setting updated successfully.")
//                     );
//                     dispatch(
//                         setPrintSetting(result.data.print_setting)
//                     );
//                     dispatch(clearError());
//                 }
//                 dispatch(showAlert());
//                 setLoading(false);
//                 console.log("here");
//             });
//     };

//     useEffect(() => {
//         setLoading(false);
//         console.log(commercial);
//         if (commercial) {
//             if (commercial === 0) {
//                 setTaxState({
//                     zero: true,
//                     three: false,
//                     five: false,
//                     ten: false,
//                 });
//             }

//             if (commercial === 1) {
//                 setTaxState({
//                     zero: false,
//                     three: true,
//                     five: false,
//                     ten: false,
//                 });
//             }

//             if (commercial === 2) {
//                 setTaxState({
//                     zero: false,
//                     three: false,
//                     five: true,
//                     ten: false,
//                 });
//             }

//             if (commercial === 3) {
//                 setTaxState({
//                     zero: false,
//                     three: false,
//                     five: false,
//                     ten: true,
//                 });
//             }
//         }
//     }, []);

//     return (
//         <Box
//             component={Paper}
//             sx={{ padding: "15px 25px 25px 25px" }}
//             // mt={5}
//             width={"100%"}
//         >
//             <Box sx={{ width: "100%", mt: 3, ml: 3 }}>
//                 <Typography variant="h3" fontWeight={"800"}>
//                     Commercial Tax
//                 </Typography>
//                 <Box mt={2} ml={2}>
//                     <Stack
//                         direction={"row"}
//                         justifyContent={"start"}
//                         alignItems={"center"}
//                         spacing={13.2}
//                         mt={1}
//                     >
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={zero}
//                                     onChange={handleChangeTax}
//                                     name="0%"
//                                 />
//                             }
//                             label="0%"
//                         />
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={three}
//                                     onChange={handleChangeTax}
//                                     name="3%"
//                                 />
//                             }
//                             label="3%"
//                         />
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={five}
//                                     onChange={handleChangeTax}
//                                     name="5%"
//                                 />
//                             }
//                             label="5%"
//                         />
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={ten}
//                                     onChange={handleChangeTax}
//                                     name="10%"
//                                 />
//                             }
//                             label="10%"
//                         />
//                     </Stack>
//                 </Box>
//             </Box>
//             <Stack direction={"row"} justifyContent={"end"}>
//                 <MkButton
//                     mkcolor={`linear-gradient(310deg, #2152ff, #02c6f3)`}
//                     size="lg"
//                     onClick={handleUpdatePrintSetting}
//                     disabled={loading}
//                 >
//                     Save
//                 </MkButton>
//             </Stack>
//         </Box>
//     );
// }
