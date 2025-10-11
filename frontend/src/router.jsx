import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBuses from "./pages/SearchBuses";
import BusDetails from "./pages/BusDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import TicketView from "./pages/TicketView";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchBuses />} />
        <Route path="/bus/:id" element={<BusDetails />} />
        <Route path="/booking" element={<Booking />} />       
        <Route path="/bookings" element={<MyBookings />} />    
        <Route path="/ticket/:id" element={<TicketView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
