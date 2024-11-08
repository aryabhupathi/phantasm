import styled from "@emotion/styled";
import { Box, Select, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ReactQuill from "react-quill";

// export const DarkQuill = styled(ReactQuill)(() => ({
//   backgroundColor: "#F4F5FE",
//   color: "#000",
//   borderRadius: "8px",
//   padding: "10px",
//   ".ql-editor": {
//     backgroundColor: "#F4F5FE",
//     color: "black",
//   },
//   "&.ql-container.ql-snow": {
//     border: "1px solid #000",
//   },
//   "&:focus .ql-container.ql-snow": {
//     borderColor: "#000",
//   },
// }));
export const DarkQuill = styled(ReactQuill)(({ theme }) => ({
  backgroundColor: "#F4F5FE",
  color: "#000",
  borderRadius: "8px",
  padding: "10px",
  ".ql-editor": {
    backgroundColor: "#F4F5FE",
    color: "black",
    height:'160px'
  },
  '&.ql-toolbar.ql-snow .ql-formats ': {
    marginRight:'9px'
  },
  "&.ql-container.ql-snow": {
    border: "1px solid #000",
  },
  "&:focus .ql-container.ql-snow": {
    borderColor: "#000",
  },
  
}));
export const DarkTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    backgroundColor: "#F4F5FE",
    color: "#000",
    borderRadius: "8px",
    borderColor: "red",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    color: "#000",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
}));
export const DarkSelect = styled(Select)(() => ({
  backgroundColor: "#F4F5FE",
  color: "#000",
  borderRadius: "8px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
  "& .MuiInputLabel-root": {
    color: "#000",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
}));
export const TextArea = (props) => (
  <DarkTextField
    {...props}
    multiline
    rows={4}
    variant="outlined"
    fullWidth
    margin="normal"
    sx={{ backgroundColor: "#F4F5FE", color: "#000" }}
  />
);
export const DateField = (props) => (
  <DarkTextField
    {...props}
    type="date"
    variant="outlined"
    InputLabelProps={{ shrink: true }}
    fullWidth
    margin="normal"
    sx={{ backgroundColor: "#F4F5FE", color: "#000" }}
  />
);
export const UploadImage = ({ onChange, label }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "1px dashed #000",
      borderRadius: 2,
      marginBottom: 3,
      marginTop: 2,
      height: "auto",
      width: "100%",
      maxWidth: 400,
      mt: 15,
      background: "#f0f0f0",
    }}
  >
    <img src="../../imageupload.png" alt="Upload Icon" width={50} height={50} />
    <Button
      component="label"
      sx={{
        marginTop: 2,
        color: "#000",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CloudUploadIcon fontSize="small" sx={{ marginRight: 1 }} />
      <Typography variant="body2">{label}</Typography>
      <input type="file" hidden accept="image/*" onChange={onChange} />
    </Button>
    <Box sx={{ textAlign: "center", marginTop: 2 }}>
      <Typography variant="caption" gutterBottom sx={{ color: "#000" }}>
        File Format JPEG, PNG(600 x 600)
      </Typography>
    </Box>
  </Box>
);
export const AdditionalImage = ({ onChange, label }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px dashed #000",
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
        height: "90px",
        width: "50%",
        mt: 15,
      }}
    >
      <img
        src="../../imageupload.png"
        alt="Upload Icon"
        width={50}
        height={50}
      />
      <Button component="label" sx={{ marginTop: 2, color: "#000" }}>
        <CloudUploadIcon fontSize="small" sx={{ marginRight: 1 }} />
        <Typography variant="caption">{label}</Typography>
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={onChange}
        />
      </Button>
    </Box>
  </Box>
);
