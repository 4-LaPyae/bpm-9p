import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function index({ active }) {
    const theme = useTheme();

    return (
        <Chip
            label={active ? "Active" : "Inactive"}
            sx={{
                backgroundImage: active
                    ? `linear-gradient(310deg, ${theme.palette.gradientSuccess.main}, ${theme.palette.gradientSuccess.light})`
                    : `linear-gradient(310deg, ${theme.palette.gradientError.main}, ${theme.palette.gradientError.light})`,
                color: "#ffffff",
            }}
        />
    );
}

export default index;
