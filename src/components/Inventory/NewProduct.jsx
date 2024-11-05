import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Select, MenuItem, FormControl, InputLabel, Switch, Button, FormControlLabel, Box } from '@mui/material';

// Placeholder components for TextArea and Date
const TextArea = (props) => (
  <TextField {...props} multiline rows={4} variant="outlined" fullWidth margin="normal" />
);

const DateField = (props) => (
  <TextField {...props} type="date" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth margin="normal" />
);

const UploadImage = ({ onChange, label }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 2 }}>
    <Button variant="contained" component="label">
      {label}
      <input type="file" hidden accept="image/*" onChange={onChange} />
    </Button>
  </Box>
);

const NewProduct = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (event) => {
    const files = Array.from(event.target.files).map(file => URL.createObjectURL(file));
    setAdditionalImages(files);
  };

  return (
    <Grid container spacing={4}>
      {/* First Column */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField label="Product Name" variant="outlined" fullWidth />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select label="Category">
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem>
            <MenuItem value="home-appliances">Home Appliances</MenuItem>
            <MenuItem value="books">Books</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Unit Price" type="number" variant="outlined" fullWidth margin="normal" />
        <TextField label="Stock Quantity" type="number" variant="outlined" fullWidth margin="normal" />
        <FormControlLabel control={<Switch />} label="Is Featured" />
        <FormControlLabel control={<Switch />} label="Is Active" />
      </Grid>

      {/* Second Column */}
      <Grid item xs={12} sm={6} md={4}>
        <TextArea label="Description" variant="outlined" fullWidth />
        <TextArea label="Additional Information" variant="outlined" fullWidth />
        <FormControlLabel control={<Switch />} label="On Sale" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DateField label="Start Date" />
          </Grid>
          <Grid item xs={6}>
            <DateField label="End Date" />
          </Grid>
        </Grid>
      </Grid>

      {/* Third Column */}
      <Grid item xs={12} sm={6} md={4}>
        {/* Cover Image Upload */}
        <UploadImage label="Upload Cover Image" onChange={handleCoverImageChange} />
        {coverImage && (
          <Box sx={{ mb: 2 }}>
            <img src={coverImage} alt="Cover" style={{ width: '100%', borderRadius: '8px' }} />
          </Box>
        )}

        {/* Additional Images Upload */}
        <UploadImage label="Upload Additional Images" onChange={handleAdditionalImagesChange} />
        {additionalImages.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {additionalImages.map((image, index) => (
              <img key={index} src={image} alt={`Additional ${index + 1}`} style={{ width: '100px', borderRadius: '8px' }} />
            ))}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default NewProduct;
