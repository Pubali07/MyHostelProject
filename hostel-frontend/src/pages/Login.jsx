import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="loginPage">
      <div className="loginCard">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        <form className="loginForm">
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>

        <div className="extraLinks">
     


<div className="extraLinks">
  <span className="forgot">Forgot Password?</span>
  <Link to="/signup" className="signup">
    Don’t have an account? <strong>Sign Up</strong>
  </Link>
</div>

        </div>
      </div>
    </div>
  );
}

export default Login;
