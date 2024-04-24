import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../../scenes/layout";
import Dashboard from "../../scenes/dashboard";
import Products from "../../scenes/products";
import Customers from "../../scenes/customers";
import Transactions from "../../scenes/transactions";
import Applications from "../../scenes/applications";
import Overview from "../../scenes/overview";
import Daily from "../../scenes/daily";
import Monthly from "../../scenes/monthly";
import Breakdown from "../../scenes/breakdown";
import Admin from "../../scenes/admin";
import Performance from "../../scenes/performance";

function AdminDashboard() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coaches" element={<Products />} />
        <Route path="/Users" element={<Customers />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/breakdown" element={<Breakdown />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/performance" element={<Performance />} />
      </Route>
    </Routes>
  );
}

export default AdminDashboard;
