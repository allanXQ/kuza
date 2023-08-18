import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout";
import Dashboard from "./Pages/Dashboard";
import DepositHistory from "Pages/TransactionHistory/DepositHistory";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="deposit-history" element={<DepositHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
