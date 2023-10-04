import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function Loading({ variant, width, height, borderRadius }) {
  return (
    <Skeleton
      variant={variant}
      width={width}
      height={height}
      animation="wave"
      sx={{
        bgcolor: "grey.500",
        borderRadius: borderRadius ? borderRadius : 0,
      }}
    />
  );
}
