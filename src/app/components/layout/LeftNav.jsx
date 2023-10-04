import { HomeRounded } from "@mui/icons-material";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { resetCompanyDetail } from "../../../features/company/CompanySlice";
import { useDispatch } from "react-redux";

function LeftNav() {
  const location = useLocation();
  const dispatch = useDispatch();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Breadcrumbs sx={{ height: "2rem", lineHeight: "2rem" }}>
        <RouterLink
          // onClick={() => dispatch(resetCompanyDetail())}
          to='/companies'
          style={{
            textDecoration: "none",
            color: "#333",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HomeRounded />
        </RouterLink>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography
              sx={{
                color: "#555",
                fontSize: "1rem",
                textTransform: "capitalize",
              }}
              key={to}
            >
              {value}
            </Typography>
          ) : (
            <RouterLink
              to={to}
              key={to}
              style={{
                textDecoration: "none",
                color: "#333",
                fontSize: "1rem",
              }}
            >
              {value}
            </RouterLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}

export default LeftNav;
