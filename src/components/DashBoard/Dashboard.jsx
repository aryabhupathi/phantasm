import React from 'react';
import { Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dashboardtable from './DashboardTable';
const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
      {/* <Grid size={{xs:12, sm:6}}> */}
        <Box sx={{ width: '100%', border: '2px solid orange', padding: 2, boxSizing: 'border-box' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AddIcon />
            <Box sx={{ ml: 1 }}>All Products</Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>Active</Box>
          </Box>
          <Box sx={{ mt: 1 }}>A</Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
      {/* <Grid size={{xs:12, sm:6}}> */}
        <Box sx={{ width: '100%', border: '2px solid green', padding: 2, boxSizing: 'border-box' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <RemoveIcon />
            <Box sx={{ ml: 1 }}>Alert</Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>Expired</Box>
            <Box>Rating</Box>
          </Box>
          <Box sx={{ mt: 1 }}>B</Box>
        </Box>
      </Grid>
      <Grid item xs={12} width={100}>
          <Dashboardtable />
      </Grid>
    </Grid>
  );
}
export default Dashboard;
