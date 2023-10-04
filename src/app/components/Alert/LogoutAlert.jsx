import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import MkButton from "../../assets/theme/MkButton";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../../features/logout/LogoutApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "30px 10px",
  borderRadius: "10px",
};

export default function LogoutAlert({ openAlert, setOpenAlert }) {
  const dispatch = useDispatch();

  //handle logout
  const handleClose = () => setOpenAlert(false);
  //to logout get token
  const { token } = useSelector((state) => state.loginInfo);

  return (
    <Modal
      open={openAlert}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-description"
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            mb: 1,
            width: "100%",
            textAlign: "center",
          }}
        >
          Logout
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ fontSize: "15px", mb: 3, width: "100%", textAlign: "center" }}
        >
          You will be return to the login screen.
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <MkButton
            fullWidth
            variant="outlined"
            mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
            onClick={() => setOpenAlert(false)}
          >
            Cancel
          </MkButton>
          <MkButton
            fullWidth
            variant="outlined"
            mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
            onClick={() => dispatch(removeToken(token))}
          >
            Logout
          </MkButton>
        </Stack>
      </Box>
    </Modal>
  );
}
