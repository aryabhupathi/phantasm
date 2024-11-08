import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const DarkPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
