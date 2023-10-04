import { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    useTheme,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import MkButton from "../../app/assets/theme/MkButton";
import InputFormComponent from "../../app/components/Form/InputFormComponent";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../features/company/CompanyApi";
import { localStorageHandler } from "../../features/login/LoginSlice";
import { imageApi } from "../../app/hooks";

const labelTheme = createTheme({
    components: {
        MuiFormControlLabel: {
            label: {
                fontSize: "14px",
            },
        },
    },
});

function ProfileInputs() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { usersList } = useSelector((state) => state.companyUser);
    const { user, publisher } = useSelector(
        (state) => state.loginInfo
    );
    // const currentUser = usersList.find((us) => us.id === user.id);
    const currentUser = user;
    const [phone, setPhone] = useState(currentUser?.phone ?? "");
    console.log(user);
    const [name, setName] = useState(currentUser?.name ?? "");
    const [imageData, setImageData] = useState(
        currentUser?.profile ?? "#"
    );
    const [imageChange, setImageChange] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    //language options
    const options = [
        { code: "US", label: "English" },
        { code: "MM", label: "Myanmar" },
    ];

    const imageInputChange = (e) => {
        console.log(e.target.files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImageFile(reader.result);
        };
        const [file] = e.target.files;
        if (file) {
            setImageChange(true);
            setImageData(URL.createObjectURL(file));
        }
    };

    const handleUpdate = (event) => {
        console.log(imageFile);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append(
            "authority_publisher_id",
            publisher[0].publisher_key
        );
        formData.append("profile", imageFile ?? "");
        formData.append("name", name);
        formData.append("phone", phone);
        dispatch(updateProfile({ data: formData }))
            .unwrap()
            .then((result) => {
                console.log({ result });
                const expiredTime = new Date(
                    new Date().getTime() + 1209600 * 1000
                );
                dispatch(
                    localStorageHandler(expiredTime, result.user)
                );
            });

        setImageChange(false);
    };

    return (
        <Box onSubmit={handleUpdate} component="form">
            <Box component={Paper} sx={{ padding: "25px", mt: 5 }}>
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                >
                    User Information
                    <Box>
                        <label htmlFor="contained-button-file">
                            <Input
                                inputProps={{ accept: "image/*" }}
                                id="contained-button-file"
                                type="file"
                                name="profile"
                                sx={{
                                    display: "none",
                                }}
                                onChange={imageInputChange}
                            />
                            <Avatar
                                sx={{
                                    width: 70,
                                    height: 70,
                                    cursor: "pointer",
                                }}
                                variant="rounded"
                                src={
                                    currentUser?.profile
                                        ? imageChange
                                            ? imageData
                                            : `${imageApi}/${currentUser?.profile}`
                                        : imageData
                                }
                            />
                        </label>
                    </Box>
                </Stack>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 12 }}
                >
                    <Grid item xs={12} md={6}>
                        <InputFormComponent
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.currentTarget.value)
                            }
                            label="Phone"
                            name="phone"
                            disabled
                            placeholder="Enter Your Phone"
                            focus={true}
                            required
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputFormComponent
                            value={name}
                            onChange={(e) =>
                                setName(e.currentTarget.value)
                            }
                            label="Name"
                            name="name"
                            placeholder="Enter Your Name"
                            required
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "15px",
                        }}
                    >
                        <MkButton
                            mkcolor={`linear-gradient(310deg, ${theme.palette.gradientDark.main}, ${theme.palette.gradientDark.light})`}
                            size="lg"
                            type="submit" // onClick={companyEdit}
                        >
                            Update
                        </MkButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ProfileInputs;
