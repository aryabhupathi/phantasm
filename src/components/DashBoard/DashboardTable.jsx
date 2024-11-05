import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

// Define the columns for the DataGrid
const columns = [
  { field: 'productName', headerName: 'Product Name', flex: 1 }, // Use flex for responsiveness
  { field: 'category', headerName: 'Category', flex: 1 },
  { field: 'unitPrice', headerName: 'Unit Price ($)', type: 'number', width: 130 },
  { field: 'inStock', headerName: 'In-Stock', type: 'number', width: 100 },
  { field: 'discount', headerName: 'Discount (%)', type: 'number', width: 100 },
  { field: 'totalValue', headerName: 'Total Value ($)', type: 'number', width: 130 },
  { field: 'action', headerName: 'Action', width: 150, renderCell: (params) => (
      <strong>
        <button onClick={() => handleAction(params.row)}>Edit</button>
        <button onClick={() => handleAction(params.row)}>Delete</button>
      </strong>
    ) 
  },
  { field: 'status', headerName: 'Status', width: 130 },
];

// Sample data for the DataGrid
const rows = [
  { id: 1, productName: 'Wireless Mouse', category: 'Electronics', unitPrice: 29.99, inStock: 100, discount: 10, totalValue: 2699.10, status: 'Active' },
  { id: 2, productName: 'Bluetooth Headphones', category: 'Electronics', unitPrice: 59.99, inStock: 50, discount: 15, totalValue: 2549.85, status: 'Active' },
  { id: 3, productName: 'Running Shoes', category: 'Fashion', unitPrice: 79.99, inStock: 200, discount: 5, totalValue: 15139.80, status: 'Active' },
  { id: 4, productName: 'Smartphone', category: 'Electronics', unitPrice: 499.99, inStock: 30, discount: 20, totalValue: 11999.70, status: 'Inactive' },
  { id: 5, productName: 'Office Chair', category: 'Furniture', unitPrice: 150.0, inStock: 20, discount: 10, totalValue: 2700.00, status: 'Active' },
  { id: 6, productName: 'Electric Kettle', category: 'Home Appliances', unitPrice: 39.99, inStock: 80, discount: 5, totalValue: 3039.20, status: 'Active' },
  { id: 7, productName: 'Men’s Watch', category: 'Fashion', unitPrice: 199.99, inStock: 60, discount: 10, totalValue: 10799.40, status: 'Inactive' },
  { id: 8, productName: 'Blender', category: 'Kitchen Appliances', unitPrice: 45.0, inStock: 100, discount: 0, totalValue: 4500.00, status: 'Active' },
  { id: 9, productName: 'Book: JavaScript Mastery', category: 'Books', unitPrice: 25.99, inStock: 300, discount: 5, totalValue: 7386.00, status: 'Active' },
  { id: 10, productName: 'Gaming Laptop', category: 'Electronics', unitPrice: 1199.99, inStock: 10, discount: 0, totalValue: 11999.90, status: 'Inactive' },
];

// Dummy action handler
const handleAction = (row) => {
  console.log('Action on row:', row);
};

const Dashboardtable = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        autoHeight
        sx={{ overflowX: 'auto' }}
      />
    </Box>
  );
};

export default Dashboardtable;
