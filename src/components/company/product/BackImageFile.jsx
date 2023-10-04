import { Avatar, Box, Input } from "@mui/material";
import React from "react";

/**
 onChange: ()=> {
    // to set image and anything you want
 }
 imageData : image src
 */
function BackImageFile({
  onChange = () => {
    void 0;
  },
  backImageData = null,
}) {
  // converter Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const imageInputChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    // console.log(base64);
    onChange(base64);
  };
  return (
    <Box>
      <label htmlFor="contained-button-file">
        <Input
          // accept="image/*"
          inputProps={{ accept: "image/*" }}
          id="contained-button-file"
          type="file"
          name="back_image"
          sx={{
            display: "none",
          }}
          onChange={(event) => imageInputChange(event)}
        />
        <Avatar
          sx={{
            width: 70,
            height: 100,
            cursor: "pointer",
          }}
          variant="rounded"
          src={backImageData}
        />
      </label>
    </Box>
  );
}

export default BackImageFile;
