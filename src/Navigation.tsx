import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import { Edit } from "./pages/Edit/Edit";
import { Create, Login } from "./pages";

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/create" element={<Create />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};
