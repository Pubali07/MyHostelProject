import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar">
      <h2>Hostel Hub</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/hostels">Hostels</Link></li>
        <li><Link to="/booking">Booking</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login" className="login-btn">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
