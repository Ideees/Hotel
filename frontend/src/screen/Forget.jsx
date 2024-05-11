import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Forget.css";
import {
  Email as EmailIcon,
  ChevronRight as ChevronRightIcon,
  Google as GoogleIcon,
  FacebookRounded as FacebookRoundedIcon,
} from "@mui/icons-material";
 

function Forget() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [send, setSend] = useState("");
 
    const loginHandle = () => {
      navigate("/");
    };

  function ForgotSubmit(e) {
    e.preventDefault();
    if (!email){
      setSend("fill all field")
    }else{

      axios
      .post("https://hotel-cyan-eta.vercel.app/forgot", { email })
      .then((result) => {
        if (result.data === "Password reset link sent to your email") {
         
          setSend("Check your mail box");
        }
        else {
          
           setSend(<p style={{color:"red"}}>user not exist</p>);
        }
      })
      .catch((err) => console.log(err));
  }
  
}
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="Forget" onSubmit={ForgotSubmit}>
            <div className="logoforget">
              <h1>Guest Harbor</h1>
              <h3>Forgot Password</h3>
            </div>
            <div className="Forget__field">
              <EmailIcon className="Forget__icon" style={{ fontSize: 17 }} />
              <input
                type="email"
                className="Forget__input"
                placeholder="xyz@gmail.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {send && (
              <h5 style={{ color: "#fea116", fontSize: "10" }}>{send}</h5>
            )}

            <button className="button Forget__submit" type="submit">
              <span className="button__text">Forget Password</span>
              <ChevronRightIcon className="button__icon" />
            </button>
            <button className="button login__submit" onClick={loginHandle}>
              <span className="button__text">Back to login </span>
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

export default Forget;
