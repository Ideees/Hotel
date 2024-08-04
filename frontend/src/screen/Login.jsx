import {
  Email as EmailIcon,
  Lock as LockIcon,
  ChevronRight as ChevronRightIcon,
  Google as GoogleIcon,
  FacebookRounded as FacebookRoundedIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const loginHandle = () => {
    navigate("/sign");
  };
  const forgotHandle = () => {
    navigate("/forget");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;

  function LoginSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Fill all inputs");
    }
    else{

      axios
      .post("https://hotel-sage-beta.vercel.app/Login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.Status === "Success") {
          if (result.data.role === "admin") {
            navigate("/pannel");
            console.log('admin');
          } else {
            navigate("/home")
            console.log('user');
          }
        }
        else{
          setError("incorrect email or password")
        }
      })
      .catch((err) => console.log(err));
    }
  }
    
    return (
      <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={LoginSubmit}>
            <div className="logoLogin">
              <h1>Guest Harbor</h1>
            </div>
            <div className="login__field">
              <EmailIcon className="login__icon" style={{ fontSize: 17 }} />
              <input
                type="text"
                className="login__input"
                placeholder="xyz@gmail.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <LockIcon className="login__icon" style={{ fontSize: 17 }} />
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="forgot" onClick={forgotHandle}>
              Forgot password ?
            </div>
            {error && (
              <p
                style={{ textAlign: "center", marginTop: "8px", color: "red" }}
              >
                {error}
              </p>
            )}
            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
              <ChevronRightIcon className="button__icon" />
            </button>

            <button className="button login__submit" onClick={loginHandle}>
              <span className="button__text">Sign Up Now </span>
              <ChevronRightIcon className="button__icon" />
            </button>
          </form>
          <div className="social-login">
            <h3 className="jj">log in via</h3>
            <div className="social-icons">
              <a href="#">
                <GoogleIcon className="social-login__icon" />
              </a>
              <a href="#">
                <FacebookRoundedIcon className="social-login__icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>

          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
