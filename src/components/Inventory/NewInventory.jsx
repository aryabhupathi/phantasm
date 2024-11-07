import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControlLabel,
  Box,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Switch,
  IconButton,
  InputLabel,
  Paper,
} from "@mui/material";
import { useDataContext } from "../DataProvider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const DarkQuill = styled(ReactQuill)(() => ({
  backgroundColor: "#F4F5FE",
  color: "#000",
  borderRadius: "8px",
  padding: "10px",
  ".ql-editor": {
    backgroundColor: "#F4F5FE",
    color: "black",
  },
  "&.ql-container.ql-snow": {
    border: "1px solid #000",
  },
  "&:focus .ql-container.ql-snow": {
    borderColor: "#000",
  },
}));
const DarkTextField = styled(TextField)(() => ({
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
const DarkSelect = styled(Select)(() => ({
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
const TextArea = (props) => (
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
const DateField = (props) => (
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
const UploadImage = ({ onChange, label }) => (
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
      {label}
      <input type="file" hidden accept="image/*" onChange={onChange} />
    </Button>
    <Box sx={{ textAlign: "center", marginTop: 2 }}>
      <Typography variant="caption" gutterBottom sx={{ color: "#000" }}>
        File Format JPEG, PNG(600 x 600)
      </Typography>
    </Box>
  </Box>
);
const AdditionalImage = ({ onChange, label }) => (
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
        {label}
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
const NewInventory = () => {
  const navigate = useNavigate();
  const { addProduct, updateProduct, editingProduct, setProductToEdit } =
    useDataContext();
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    sellingPrice: "",
    costPrice: "",
    quantity: "",
    orderType: "",
    shortDescription: "",
    longDescription: "",
    discount: false,
    discountType: "",
    discountPercentage: "",
    expiryDate: false,
    expiryDateValue: "",
    returnDiscount: false,
    dateAdded: "",
    timeAdded: "",
    coverImage: "",
    additionalImages: [],
    status: "draft",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    }
  }, [editingProduct]);
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        coverImage: imageUrl,
      });
    }
  };
  const handleAdditionalImagesChange = (event) => {
    const files = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData({
      ...formData,
      additionalImages: [...formData.additionalImages, ...files],
    });
  };
  const handleLongDescriptionChange = (value) => {
    setFormData({ ...formData, longDescription: value });
  };
  const handleDeleteImage = (indexToDelete) => {
    setFormData({
      ...formData,
      additionalImages: formData.additionalImages.filter(
        (_, index) => index !== indexToDelete
      ),
    });
  };
  const handleDeleteCoverImage = () => {
    setFormData({
      ...formData,
      coverImage: "",
    });
  };
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.productName)
      tempErrors.productName = "Product Name is required";
    if (!formData.category) tempErrors.category = "Category is required";
    if (!formData.sellingPrice || formData.sellingPrice <= 0)
      tempErrors.sellingPrice = "Selling Price must be greater than 0";
    if (!formData.costPrice || formData.costPrice <= 0)
      tempErrors.costPrice = "Cost Price must be greater than 0";
    if (!formData.quantity || formData.quantity <= 0)
      tempErrors.quantity = "Quantity must be greater than 0";
    if (!formData.shortDescription)
      tempErrors.shortDescription = "Shortt Description is required";
    if (!formData.longDescription)
      tempErrors.longDescription = "Long Description is required";
    if (!formData.discount) tempErrors.discount = "Discount Type is required";
    if (!formData.discountType)
      tempErrors.discountType = "Discount Type is required";
    if (!formData.discountPercentage)
      tempErrors.discountPercentage = "Discount Percentage is required";
    if (!formData.expiryDate) tempErrors.expiryDate = "Expiry Date is required";
    if (!formData.expiryDateValue)
      tempErrors.expiryDateValue = "Value is required";
    if (!formData.returnDiscount)
      tempErrors.returnDiscount = "Return Discount is required";
    if (!formData.dateAdded) tempErrors.dateAdded = "Date is required";
    if (!formData.timeAdded) tempErrors.timeAdded = "Time is required";
    if (!formData.coverImage) tempErrors.coverImage = "Cover Image is required";
    if (!formData.additionalImages)
      tempErrors.additionalImages = "Additional Image is required";
    if (formData.expiryDate && !formData.expiryDateValue) {
      tempErrors.expiryDateValue = "Expiry Date is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; 
  };
  const handleSubmit = (status) => (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingProduct) {
      updateProduct({ ...formData, status });
    } else {
      addProduct({ ...formData, id: Date.now(), status });
    }
    setProductToEdit(null);
    navigate("/view-inventory");
  };
  return (
    <form>
      <Grid
        container
        spacing={4}
        padding={4}
        justifyContent={'center'}
        alignContent={'center'}
        sx={{ backgroundColor: "#F4F5FA" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Grid item xs={12} sm="auto">
            <Typography variant="h5">New Inventory Item</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm="auto"
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={handleSubmit("draft")}
              sx={{ borderRadius: "10px", backgroundColor: "black" }}
            >
              Save as Draft
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleSubmit("published")}
              sx={{ borderRadius: "10px" }}
            >
              Save & Publish
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="stretch" ml={2}>
          <Grid item xs={12} sm={12} md={8} spacing={2}>
            <Paper
              sx={{
                backgroundColor: "white",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DarkTextField
                    label="Product Name"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.productName)}
                    helperText={errors.productName}
                    sx={{
                      "& .MuiInputBase-root": {
                        backgroundColor: "#D3D3D3",
                        color: "#fff",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#555",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff",
                      },
                    }}
                  />
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel>Select Product Category</InputLabel>
                    <DarkSelect
                      label="Select Product Category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      error={Boolean(errors.category)}
                    >
                      <MenuItem value="electronics">Electronics</MenuItem>
                      <MenuItem value="fashion">Fashion</MenuItem>
                      <MenuItem value="home-appliances">
                        Home Appliances
                      </MenuItem>
                      <MenuItem value="books">Books</MenuItem>
                    </DarkSelect>
                    {errors.category && (
                      <Typography color="error" variant="body2">
                        {errors.category}
                      </Typography>
                    )}
                  </FormControl>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DarkTextField
                        label="Selling Price"
                        name="sellingPrice"
                        value={formData.sellingPrice}
                        onChange={handleInputChange}
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.sellingPrice)}
                        helperText={errors.sellingPrice}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DarkTextField
                        label="Cost Price"
                        name="costPrice"
                        value={formData.costPrice}
                        onChange={handleInputChange}
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.costPrice)}
                        helperText={errors.costPrice}
                      />
                    </Grid>
                  </Grid>
                  <DarkTextField
                    label="Quantity in Stock"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.quantity)}
                    helperText={errors.quantity}
                  />
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel>Order Type</InputLabel>
                    <DarkSelect
                      label="Order Type"
                      name="orderType"
                      value={formData.orderType}
                      onChange={handleInputChange}
                      error={Boolean(errors.orderType)}
                    >
                      <MenuItem value="pre-order">Pre-Order</MenuItem>
                      <MenuItem value="ready-stock">Ready Stock</MenuItem>
                    </DarkSelect>
                    {errors.orderType && (
                      <Typography color="error" variant="body2">
                        {errors.orderType}
                      </Typography>
                    )}
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Switch
                        name="discount"
                        checked={formData.discount}
                        onChange={handleInputChange}
                      />
                    }
                    label="Add Discount"
                  />
                  {formData.discount && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          margin="normal"
                        >
                          <InputLabel>Type</InputLabel>
                          <DarkSelect
                            label="Type"
                            name="discountType"
                            value={formData.discountType}
                            onChange={handleInputChange}
                            error={Boolean(errors.discountType)}
                          >
                            <MenuItem value="percentage">Percentage</MenuItem>
                            <MenuItem value="flat-rate">Flat Rate</MenuItem>
                          </DarkSelect>
                          {errors.discountType && (
                            <Typography color="error" variant="body2">
                              {errors.discountType}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DarkTextField
                          label="Value"
                          name="discountPercentage"
                          value={formData.discountPercentage}
                          onChange={handleInputChange}
                          type="number"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          error={Boolean(errors.discountPercentage)}
                          helperText={errors.discountPercentage}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        name="expiryDate"
                        checked={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                    }
                    label="Set Expiry Date"
                  />
                  {formData.expiryDate && (
                    <DateField
                      label="Expiry Date"
                      name="expiryDateValue"
                      value={formData.expiryDateValue}
                      onChange={handleInputChange}
                      error={Boolean(errors.expiryDateValue)}
                      helperText={errors.expiryDateValue}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextArea
                    label="Short Description"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    error={Boolean(errors.shortDescription)}
                  />{" "}
                  {errors.shortDescription && (
                    <Typography color="error" variant="body2">
                      {errors.shortDescription}
                    </Typography>
                  )}
                  <Typography variant="subtitle1">Long Description</Typography>
                  <DarkQuill
                    value={formData.longDescription}
                    onChange={handleLongDescriptionChange}
                    error={Boolean(errors.longDescription)}
                  />
                  {errors.longDescription && (
                    <Typography color="error" variant="body2">
                      {errors.longDescription}
                    </Typography>
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        name="returnDiscount"
                        checked={formData.returnDiscount}
                        onChange={handleInputChange}
                      />
                    }
                    label="Return Policy Discount"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DateField
                        label="Date Added"
                        name="dateAdded"
                        value={formData.dateAdded}
                        onChange={handleInputChange}
                        error={Boolean(errors.dateAdded)}
                      />
                      {errors.dateAdded && (
                        <Typography color="error" variant="body2">
                          {errors.dateAdded}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DarkTextField
                        label="Time Added"
                        name="timeAdded"
                        value={formData.timeAdded}
                        onChange={handleInputChange}
                        type="time"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.timeAdded)}
                        helperText={errors.timeAdded}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{
    mt: { xs: 2, sm: 3, md: 0 }, 
  }}>
            <Paper
              sx={{
                backgroundColor: "white",
                padding: "10px",
                elevation: "2",
                height: "100%",
              }}
            >
              {formData.coverImage ? (
                <Box mt={3} sx={{ position: "relative" }}>
                  <img
                    src={formData.coverImage}
                    alt="Cover"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={handleDeleteCoverImage}
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        "&:hover": {
                          color: "red", // Change the color to red on hover
                          backgroundColor: "#f0f0f0", // Optional: Change the background on hover
                        },
                      }}
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "150px",
                  }}
                >
                  <UploadImage
                    onChange={handleCoverImageChange}
                    error={Boolean(errors.coverImage)}
                    label="Upload Cover Image"
                  />
                  {errors.coverImage && (
                    <Typography color="error" variant="body2">
                      {errors.coverImage}
                    </Typography>
                  )}
                </Box>
              )}
              <AdditionalImage
                onChange={handleAdditionalImagesChange}
                error={Boolean(errors.additionalImages)}
                label="Add Image"
              />
              {errors.additionalImages && (
                <Typography color="error" variant="body2">
                  {errors.additionalImages}
                </Typography>
              )}
              <Grid
                container
                spacing={2}
                sx={{ overflowY: "auto", maxHeight: 200 }}
              >
                {formData.additionalImages.map((imageUrl, index) => (
                  <Grid item xs={6} key={index}>
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={imageUrl}
                        alt="not found"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          height: "auto",
                        }}
                      />
                      <Box
                        size="small"
                        onClick={() => handleDeleteImage(index)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                          color: "inherit", // Keep default color
                          "&:hover": {
                            color: "red", // Change the color to red on hover
                            backgroundColor: "#f0f0f0", // Optional: Change the background on hover
                          },
                        }}
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default NewInventory;
