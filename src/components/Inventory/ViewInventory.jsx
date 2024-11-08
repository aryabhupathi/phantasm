import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Box,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDataContext } from "../DataProvider";
import { TbShoppingBag } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillPieChart } from "react-icons/ai";
const ViewInventory = () => {
  const navigate = useNavigate();
  const { products, deleteProduct, setProductToEdit } = useDataContext();
  const [rows, setRows] = useState(products);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  useEffect(() => {
    setRows(products);
    const pending = products.filter(
      (product) => product.status === "draft"
    ).length;
    const completed = products.filter(
      (product) => product.status !== "published"
    ).length;
    setPendingCount(pending);
    setCompletedCount(completed);
  }, [products]);
  const handleEdit = (id) => {
    const product = rows.find((row) => row.id === id);
    if (product) {
      setProductToEdit(product);
      navigate("/new-inventory");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };
  const calculateTotalPrice = (sellingPrice, quantity) => {
    return sellingPrice * quantity;
  };
  const totalcount = rows.length;
  useEffect(() => {
    const updatedRows = products.map((product) => ({
      id: product.id,
      productName: product.productName,
      category: product.category,
      sellingPrice: product.sellingPrice,
      costPrice: product.costPrice,
      quantity: product.quantity,
      status: product.status === "draft" ? "Pending" : "Completed",
      orderType: product.orderType,
      discountPercentage: product.discountPercentage || 0,
      totalPrice: product.sellingPrice * product.quantity,
      dateAdded: `${product.dateAdded} ${product.timeAdded}`,
      timeAdded: product.timeAdded,
      shortDescription:product.shortDescription,
      longDescription:product.longDescription,
      coverImage:product.coverImage
    }));
    setRows(updatedRows);
    const pending = products.filter(
      (product) => product.status === "draft"
    ).length;
    const completed = products.filter(
      (product) => product.status === "published"
    ).length;
    setPendingCount(pending);
    setCompletedCount(completed);
  }, [products]);
  const columns = [
    { field: "dateAdded", headerName: "Date Added", width: 180 },
    { field: "orderType", headerName: "Order Type", width: 150 },
    { field: "sellingPrice", headerName: "Unit Price", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "discountPercentage", headerName: "Discount %", width: 120 },
    { field: "totalPrice", headerName: "Total Price", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const status = params.value;
        return (
          <Chip
            label={status}
            color={status === "Completed" ? "success" : "warning"}
            size="small"
            sx={{
              textTransform: "capitalize",
            }}
          />
        );
      },
    },
  ];
  const generateRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };
  const firstProduct = rows[0];
  return (
    <Grid container padding={4} sx={{ backgroundColor: "#F4F5FA" }}>
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
          <Typography variant="h5">View Inventory Item</Typography>
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
            onClick={() => handleEdit(firstProduct.id)}
            sx={{ borderRadius: "10px", backgroundColor: "black" }}
          >
            Edit Product
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDelete(firstProduct.id)}
            sx={{ borderRadius: "10px" }}
          >
            Unpublish Product
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  width: 150,
                  height: 100,
                  margin: "auto",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    firstProduct?.coverImage ||
                    "https://via.placeholder.com/150"
                  }
                  alt={firstProduct?.productName || "Product"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle1" fontWeight={"bold"}>Last Order</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                }}
              >
                <Box>
                  <Typography variant="body1">Price</Typography>
                  <Typography variant="body2">
                    {firstProduct?.sellingPrice || "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">InStock</Typography>
                  <Typography variant="body2">
                    {firstProduct?.quantity || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(0, 0, 255, 0.1)",
                  padding: 1,
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  marginLeft: 1,
                }}
              >
                <AiFillPieChart style={{ color: "blue" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection:'column',
                  marginTop: "auto",
                }}
              >
                <Typography variant="body1">Total Price</Typography>
                <Typography variant="body2">
                  {firstProduct
                    ? calculateTotalPrice(
                        firstProduct.sellingPrice,
                        firstProduct.quantity
                      )
                    : "N/A"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(255, 20, 147, 0.1)",
                  padding: 1,
                  borderRadius: "8px",
                  marginLeft: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  height: "20px",
                  width: "20px",
                }}
              >
                <IoEyeOutline style={{ color: "red" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                }}
              >
                <Box>
                  <Typography variant="body1">Views</Typography>
                  <Typography variant="body2">
                    {generateRandomNumber(100)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Favourites</Typography>
                  <Typography variant="body2">
                    {generateRandomNumber(100)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(255, 20, 147, 0.1)",
                  padding: 1,
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20px",
                  width: "20px",
                }}
                mb={1}
              >
                <TbShoppingBag style={{ color: "red", fontSize: "1.2rem" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "space-between" },
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Typography variant="body2">
                  All Orders: {totalcount}
                </Typography>
                <Typography variant="body2">Pending: {pendingCount}</Typography>
                <Typography variant="body2">
                  Completed: {completedCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(255, 20, 147, 0.1)",
                  padding: 1,
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20px",
                  width: "20px",
                  marginBottom: 1,
                }}
              >
                <TbShoppingBag style={{ color: "red", fontSize: "1.2rem" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "space-between" },
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Typography variant="body2">
                  Cancelled: {generateRandomNumber(10)}
                </Typography>
                <Typography variant="body2">
                  Returned: {generateRandomNumber(10)}
                </Typography>
                <Typography variant="body2">
                  Damaged: {generateRandomNumber(10)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={3} width={100}>
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          Purchases
        </Typography>
        <Paper sx={{ padding: 3, borderRadius: "12px" }}>
          <Grid item xs={12}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              rowHeight={40}
            />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ViewInventory;
