import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
function Signup() {
  return (
    <div className="signupPage">
      <div className="signupCard">
        <h2>Create Account</h2>
        <p className="subtitle">Join us to book your hostel easily</p>

        <form className="signupForm">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>

        <div className="extraLinks">
     


<div className="extraLinks">
  <Link to="/" className="login">
    Already have an account? <strong>Login</strong>
  </Link>
</div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
