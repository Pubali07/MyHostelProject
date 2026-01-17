import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Hostels from "./pages/Hostels";
import Signup from "./pages/Signup";
import Recommendation from "./pages/Recommendation";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/hostels" element={<Hostels />} />
  <Route path="/rooms/:hostelId" element={<Rooms />} />
  <Route path="/booking" element={<Booking />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/recommendation" element={<Recommendation />} />

</Routes>
   <Footer/>
      </BrowserRouter>
  );
}

export default App;
