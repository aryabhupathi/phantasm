import Grid from '@mui/material/Grid2'
import './App.css';
// import MiniDrawer from './components/Header/Appbar';
import NewProduct from './components/Inventory/NewProduct';

function App() {
  return (
    <Grid>
    {/* <MiniDrawer/> */}
    <NewProduct/>
    </Grid>
  );
}

export default App;
