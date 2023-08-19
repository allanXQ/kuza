import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import DepositHistory from "pages/TransactionHistory/DepositHistory";
import Login from "pages/Auth/login";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="deposit-history" element={<DepositHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
