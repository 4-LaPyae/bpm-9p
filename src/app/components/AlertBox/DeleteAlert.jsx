import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import MkButton from "../../assets/theme/MkButton";
import { useDispatch, useSelector } from "react-redux";
import { BookDelete } from "../../../features/book/BookApi";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function DeleteAlert({
    openAlert,
    setOpenAlert,
    companyDetail,
    item,
}) {
    const dispatch = useDispatch();

    //handle logout
    const handleClose = () => setOpenAlert(false);
    console.log(companyDetail);
    const { paginationData, deleteStatus } = useSelector(
        (state) => state.BookSlice
    );

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
                    Are You Sure to Delete ?
                </Typography>
                <Typography
                    id="modal-modal-description"
                    sx={{
                        fontSize: "15px",
                        mb: 3,
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    "{item.book_title}"
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
                        onClick={() => {
                            dispatch(
                                BookDelete({
                                    id: item._id,
                                    pId: companyDetail._id,
                                })
                            )
                                .unwrap()
                                .then((result) => {
                                    if (result.data) {
                                        setOpenAlert(false);
                                    }
                                });
                        }}
                        sx={{ cursor: "pointer", color: "red" }}
                        disabled={
                            deleteStatus === "pending" ? true : false
                        }
                    >
                        {deleteStatus === "pending"
                            ? "Deleting"
                            : "Delete"}
                    </MkButton>
                </Stack>
            </Box>
        </Modal>
    );
}
