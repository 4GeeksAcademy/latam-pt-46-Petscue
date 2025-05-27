import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenLogin } from "../services/tokenLogin";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Both fields are required");
      setMessageType("error");
      return;
    }

    try {
      const data = await tokenLogin(email, password);
      localStorage.setItem("token", data.token);
      
      dispatch({ type: "LOGIN", payload: { token: data.token, user: data.user } });
      dispatch({ type: "SET_ROLE", payload: data.role })

      setMessage("Login successful");
      setMessageType("success");

      const rolesRoutes = {
        "RESCUER": "/profile",
        "ADOPTER": "/inicio",
        "OWNER": "/profile"
      }

      setTimeout(() => {
        const redirectPath = rolesRoutes[data.role] || "/";
        navigate(redirectPath)
      }, 1000);
    } catch (error) {
      setMessage(error.message || "Login failed");
      setMessageType("error");
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">

        <div className="signup-left">
          <h1 className="signup-title-orange">Happiness</h1>
          <h2 className="signup-title-bold">starts here</h2>
          <div className="signup-image-placeholder">
            <img src="/perritodibujo.png" className="img-fluid" />
          </div>
        </div>

        <div className="signup-right">
          <h2 className="signup-heading">Start Session</h2>

          <form className="signup-form" onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email Address"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {message && (
              <div
                className={`alert ${messageType === "success"
                  ? "alert-success"
                  : "alert-danger"}`}
                role="alert"
              >
                {message}
              </div>
            )}

            <button type="submit">Login</button>
          </form>
          <p className="signup-login">
            you do not have account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};