import * as React from "react";
import { Box, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Chip, Grid, Stack } from "@mui/material";
import { useRef } from "react";
import "./selector.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectCategories,
  removeSelectCategories,
} from "./SelectCategoriesFullScreenSlice";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import ClearIcon from "@mui/icons-material/Clear";
import SimpleInput from "../../../app/components/SimpleInput";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function SelectCategoriesFullScreen({
  open,
  close,
  options,
  inputValues,
}) {
  // const [open, setOpen] = React.useState(false);
  const [filterName, setFilterName] = useState("");
  const dispatch = useDispatch();
  //select categories full screen data
  const { select_categories } = useSelector(
    (state) => state.SelectCategoryListSlice
  );

  //   const filtergg = options.filter((item) =>
  //     item.description.toLowerCase().includes(filterName)
  //   );

  const [lineRefs, setLineRefs] = React.useState([]);

  console.log({ select_categories });
  const getID = select_categories.map((item) =>
    inputValues ? item.related_category_id ?? item._id : item._id
  );

  const getAllID = options?.map((item) => item.id);
  console.log({ options });
  console.log({ getID });
  console.log({ getAllID });

  React.useEffect(() => {
    if (open) {
      setLineRefs(options.map((_, i) => lineRefs[i] ?? React.createRef()));
    }
  }, [open]);

  React.useEffect(() => {
    if (lineRefs) {
      getID
        .map((i) => getAllID.indexOf(i))
        .map((i) => lineRefs[i]?.current?.classList?.add("clicked-categories"));
    }
  }, [lineRefs]);

  const closing = () => {
    // console.log("hay");
    close();
    setLineRefs([]);
    setFilterName("");
  };

  console.log({ filterName });

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={closing}
        TransitionComponent={Transition}
        sx={{
          "&.MuiDialog-root": {
            top: "15%",
          },
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={closing}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, color: "#fff" }}
              variant='h2'
              component='div'
            >
              Select Genres
            </Typography>
            <Box sx={{ width: "200px", mr: 120 }}>
              <SimpleInput
                name='genre_name'
                placeholder='Genre Name'
                value={filterName}
                onChange={(e) => {
                  setFilterName(e.target.value);
                  for (let index = 0; index < lineRefs.length; index++) {
                    const element = lineRefs[index];
                    if (
                      element.current.innerText
                        .toLowerCase()
                        .indexOf(e.target.value.toLowerCase()) > -1
                    ) {
                      element.current.parentElement.classList.remove("hidden");
                    } else {
                      element.current.parentElement.classList.add("hidden");
                    }
                  }
                }}
              />
            </Box>

            <Button autoFocus color='inherit' onClick={closing}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={1}
          justifyContent='center'
          alignItems='center'
          sx={{ marginTop: "20px", padding: "0 15px" }}
        >
          {options?.map((data, i) => (
            <Grid key={i} item xs={2}>
              <Chip
                ref={lineRefs[i]}
                variant='outlined'
                onClick={() => {
                  const [length, value, ...rest] =
                    lineRefs[i]?.current?.classList;
                  if (rest.includes("clicked-categories")) {
                    dispatch(removeSelectCategories(data));
                    lineRefs[i]?.current?.classList.remove(
                      "clicked-categories"
                    );
                  } else {
                    dispatch(addSelectCategories(data));
                    lineRefs[i]?.current?.classList.add("clicked-categories");
                  }
                }}
                label={data.name}
                sx={{
                  padding: "20px",
                  margin: "auto",
                  width: "100%",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Dialog>
    </div>
  );
}
