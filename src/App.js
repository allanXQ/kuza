import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import RootLayout from "./components/Layouts/RootLayout";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="transact"></Route>
      </Route>
    </Routes>
  );
}

export default App;
