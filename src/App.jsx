import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import AddNewTask from "./pages/AddNewTask/AddNewTask";
import DisplayTask from "./pages/DisplayTask/DisplayTask";
import Footer from "./components/Footer/Footer";
import {
  initializeNotifications,
  handleForegroundNotifications,
  checkTokenRefresh,
} from "./notificationService";

function App() {
  useEffect(() => {
    // Initialize notifications
    initializeNotifications();

    // foreground notifications
    handleForegroundNotifications();

    //token refresh
    checkTokenRefresh();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addnewtask" element={<AddNewTask />} />
        <Route path="/tasks" element={<DisplayTask />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
