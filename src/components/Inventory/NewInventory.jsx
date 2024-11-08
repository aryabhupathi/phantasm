import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControlLabel,
  Box,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Switch,
  IconButton,
  InputLabel,
  Paper,
} from "@mui/material";
import { useDataContext } from "../DataProvider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "react-quill/dist/quill.snow.css";
import {
  DarkQuill,
  DarkTextField,
  DarkSelect,
  TextArea,
  DateField,
  UploadImage,
  AdditionalImage,
} from "./FormStyles";

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
    if (!formData.dateAdded) tempErrors.dateAdded = "Date is required";
    if (!formData.timeAdded) tempErrors.timeAdded = "Time is required";
    if (!formData.coverImage) tempErrors.coverImage = "Cover Image is required";
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
        justifyContent={"center"}
        alignContent={"center"}
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
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              mt: { xs: 2, sm: 3, md: 0 },
            }}
          >
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
                          color: "red",
                          backgroundColor: "#f0f0f0",
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
              {/* <Grid
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
                          color: "inherit", 
                          "&:hover": {
                            color: "red", 
                            backgroundColor: "#f0f0f0", 
                          },
                        }}
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid> */}
              <Grid container spacing={2} sx={{ overflowY: "auto", maxHeight: 200 }}>
  {formData.additionalImages && formData.additionalImages.length > 0 ? (
    formData.additionalImages.map((imageUrl, index) => (
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
              color: "inherit",
              "&:hover": {
                color: "red",
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <DeleteForeverIcon fontSize="small" />
          </Box>
        </Box>
      </Grid>
    ))
  ) : (
    <Grid item xs={12}>
      <Box sx={{ textAlign: "center", padding: "10px" }}>No images available</Box>
    </Grid>
  )}
</Grid>

            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default NewInventory;
