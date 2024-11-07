import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/DashBoard/Dashboard";
import Layout from "./components/Header/Appbar";
import { DataProvider } from "./components/DataProvider";
import NewInventory from "./components/Inventory/NewInventory";
import ViewInventory from "./components/Inventory/ViewInventory";
const App = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="new-inventory" element={<NewInventory />} />
            <Route path="view-inventory" element={<ViewInventory />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
};
export default App;
