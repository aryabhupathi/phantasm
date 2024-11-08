import React from "react";
import { Box, Grid, Button, Typography,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dashboardtable from "./DashboardTable";
import { TiFolderDelete } from "react-icons/ti";
import { HiUsers } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { DarkPaper } from "./DashboradStyle";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/new-inventory");
  };
  return (
    <Grid container spacing={2} padding={1} sx={{ backgroundColor: "#F4F5FA" }}>
      <Grid item xs={12} mt={0}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            Inventory Summary
          </Typography>
          <Button
            onClick={handleAdd}
            sx={{
              backgroundColor: "#5570F1",
              color: "white",
              borderRadius: "12px",
              marginTop: { xs: "8px", sm: "0" },
            }}
            size="small"
            startIcon={<AddIcon />}
          >
            Add New Product
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <DarkPaper
          sx={{
            padding: 3,
            backgroundColor: "#5570F1",
            borderRadius: "12px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <TiFolderDelete style={{ fontSize: "40px", marginRight: "10px" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontSize: "16px" }}>Total</Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                123
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "16px" }}>Active</Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                83%
              </Typography>
            </Box>
          </Box>
        </DarkPaper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <DarkPaper
          sx={{
            padding: 3,
            backgroundColor: "white",
            borderRadius: "12px",
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <HiUsers style={{ fontSize: "30px", marginRight: "10px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: "16px", color: "#CC5F5F" }}>
                Low Stock Alert
              </Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                23
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: "16px" }}>Expired</Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                3
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: "16px" }}>1-Star Rating</Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                2
              </Typography>
            </Box>
          </Box>
        </DarkPaper>
      </Grid>
      <Grid item xs={12} width={100}>
        <DarkPaper sx={{ padding: 3, borderRadius: "12px" }}>
          <Dashboardtable />
        </DarkPaper>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
