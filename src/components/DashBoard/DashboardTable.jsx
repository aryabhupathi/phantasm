import React, { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Select,
  MenuItem,
  Chip,
  FormControl,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const columns = [
  { field: "productName", headerName: "Product Name", flex: 1, width: 100 },
  { field: "category", headerName: "Category", flex: 1, width: 100 },
  {
    field: "unitPrice",
    headerName: "Unit Price ($)",
    type: "number",
    width: 100,
  },
  { field: "inStock", headerName: "In-Stock", type: "number", width: 100 },
  { field: "discount", headerName: "Discount (%)", type: "number", width: 100 },
  {
    field: "totalValue",
    headerName: "Total Value ($)",
    type: "number",
    width: 100,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <FormControl
        fullWidth
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Select
          value={params.row.action}
          onChange={(e) => handleStatusChange(e, params.row)}
          size="small"
          sx={{
            marginTop: "4px",
            "& .MuiSelect-select": {
              height: 28,
              width: "75px",
              padding: "0 10px",
              borderRadius: "16px",
              backgroundColor: "#8B8D97",
              color: "black",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              marginTop: "2px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            height: "100%",
          }}
        >
          <MenuItem value="publish">Publish</MenuItem>
          <MenuItem value="unpublish">Unpublish</MenuItem>
        </Select>
      </FormControl>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value}
        sx={{
          backgroundColor: params.value === "Publish" ? "#5570F1" : "#FFF2E2",
          fontWeight: "bold",
          height: 28,
          fontSize: "0.875rem",
          padding: "0 10px",
          alignItems: "center",
          width: "100%",
        }}
      />
    ),
  },
];
const rows = [
  {
    id: 1,
    productName: "Wireless Mouse",
    category: "Electronics",
    unitPrice: 29.99,
    inStock: 100,
    discount: 10,
    totalValue: 2699.1,
    status: "Publish",
    action: "publish",
  },
  {
    id: 2,
    productName: "Bluetooth Headphones",
    category: "Electronics",
    unitPrice: 59.99,
    inStock: 50,
    discount: 15,
    totalValue: 2549.85,
    status: "Publish",
    action: "unpublish",
  },
  {
    id: 3,
    productName: "Running Shoes",
    category: "Fashion",
    unitPrice: 79.99,
    inStock: 200,
    discount: 5,
    totalValue: 15139.8,
    status: "Publish",
    action: "publish",
  },
  {
    id: 4,
    productName: "Smartphone",
    category: "Electronics",
    unitPrice: 499.99,
    inStock: 30,
    discount: 20,
    totalValue: 11999.7,
    status: "Unpublish",
    action: "unpublish",
  },
  {
    id: 5,
    productName: "Office Chair",
    category: "Furniture",
    unitPrice: 150.0,
    inStock: 20,
    discount: 10,
    totalValue: 2700.0,
    status: "Publish",
    action: "publish",
  },
  {
    id: 6,
    productName: "Electric Kettle",
    category: "Home Appliances",
    unitPrice: 39.99,
    inStock: 80,
    discount: 5,
    totalValue: 3039.2,
    status: "Publish",
    action: "unpublish",
  },
  {
    id: 7,
    productName: "Men’s Watch",
    category: "Fashion",
    unitPrice: 199.99,
    inStock: 60,
    discount: 10,
    totalValue: 10799.4,
    status: "Unpublish",
    action: "publish",
  },
  {
    id: 8,
    productName: "Blender",
    category: "Kitchen Appliances",
    unitPrice: 45.0,
    inStock: 100,
    discount: 0,
    totalValue: 4500.0,
    status: "Publish",
    action: "unpublish",
  },
  {
    id: 9,
    productName: "Book: JavaScript Mastery",
    category: "Books",
    unitPrice: 25.99,
    inStock: 300,
    discount: 5,
    totalValue: 7386.0,
    status: "Publish",
    action: "publish",
  },
  {
    id: 10,
    productName: "Gaming Laptop",
    category: "Electronics",
    unitPrice: 1199.99,
    inStock: 10,
    discount: 0,
    totalValue: 11999.9,
    status: "Unpublish",
    action: "unpublish",
  },
];

const handleStatusChange = (event, row) => {
  const newAction = event.target.value;
  const newStatus = newAction === "publish" ? "Publish" : "Unpublish";
  row.status = newStatus;
  row.action = newAction;
  console.log(`Product ${row.productName} is now ${newStatus}`);
};
const Dashboardtable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) =>
          row.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Typography variant="h5">Inventory Items</Typography>
        <TextField
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderBottom: "2px solid #8B8D97",
              "& .MuiInputBase-input": {
                paddingLeft: "32px",
              },
            },
          }}
        />
      </Grid>
      <Grid item  xs={12}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          rowHeight={40}
        />
      </Grid>
    </Grid>
  );
};
export default Dashboardtable;
