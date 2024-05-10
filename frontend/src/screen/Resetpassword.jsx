import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "./Forget.css";
import {
  Email as EmailIcon,
  ChevronRight as ChevronRightIcon,
  Google as GoogleIcon,
  FacebookRounded as FacebookRoundedIcon,
} from "@mui/icons-material";
 

function  Reset() {
  const navigate = useNavigate();
  const [ password,  setPassword] = useState("");
  const {id , token} = useParams()

  function RestSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/restPassword/${id}/${token}`, { password })
      .then((result) => {
        if (result.data === "Password reset link sent to your email") {
          navigate("/");
          console.log("Email sent");
        }
      })
      .catch((err) => console.log(err));
  }
  const ok = () => {
    alert("hy");
  };
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="Forget" onSubmit={RestSubmit}>
            <div className="logoforget">
              <h1>Guest Harbor</h1>
              <h3>Reset Password</h3>
            </div>
            <div className="Forget__field">
              <EmailIcon className="Forget__icon" style={{ fontSize: 17 }} />
              <input
                type="password"
                className="Forget__input"
                placeholder="********"
                name="password"
                onChange={(e) =>  setPassword(e.target.value)}
              />
            </div>

            <button
              className="button Forget__submit"
              onClick={ok}
              type="submit"
            >
              <span className="button__text">Rest Password</span>
              <ChevronRightIcon className="button__icon" />
            </button>
          </form>
          <div className="social-Forget">
            <h3 className="jj">log in via</h3>
            <div className="social-icons">
              <a href="#">
                <GoogleIcon className="social-Forget__icon" />
              </a>
              <a href="#">
                <FacebookRoundedIcon className="social-Forget__icon" />
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

export default  Reset;
