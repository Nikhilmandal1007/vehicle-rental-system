import { Routes, Route } from "react-router-dom";

import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
