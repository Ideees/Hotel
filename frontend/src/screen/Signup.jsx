 import { useNavigate } from "react-router-dom";
 import axios from "axios";

 import {
   Person as PersonIcon,
   Lock as LockIcon,
   ChevronRight as ChevronRightIcon,
   Google as GoogleIcon,
   FacebookRounded as FacebookRoundedIcon,
   Email as EmailIcon,
   PhoneAndroid as PhoneAndroidIcon,
 } from "@mui/icons-material";
 import "./Signup.css";
 import { useState } from "react";

 function Sign() {
   const navigate = useNavigate();

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [contact, setContact] = useState("");
   const [error ,setError] = useState("")
function RegisterSubmit(e) {
  e.preventDefault();

  if (!name || !email || !password || !contact) {
    setError("Fill in all fields");
    return;
  }

  axios
    .post("http://localhost:5000/Huser", {
      name,
      email,
      password,
      contact,
    })
    .then((result) => {
      console.log(result.data);
      navigate("/");
      // Show success message
      alert("Registration successful!");
      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");
      setContact("");
    })
    .catch((err) => console.log(err));
}


   const signHandle = () => {
     navigate("/");
   };

   return (
     <div className="container">
       <div className="screen">
         <div className="screen__content">
           <form className="sign" onSubmit={RegisterSubmit}>
             <div className="logoSign">
               <h1>Guest Harbor</h1>
               
             </div>
             <div className="sign__field">
               <PersonIcon className="sign__icon" style={{ fontSize: 17 }} />
               <input
                 type="text"
                 className="sign__input"
                 placeholder="your name"
                 name="name"
                 onChange={(e) => setName(e.target.value)}
               />
             </div>
             <div className="sign__field">
               <EmailIcon className="sign__icon" style={{ fontSize: 17 }} />
               <input
                 type="email"
                 className="sign__input"
                 placeholder="xyz@gmail.com"
                 name="email"
                 onChange={(e) => setEmail(e.target.value)}
               />
             </div>
             <div className="sign__field">
               <PhoneAndroidIcon
                 className="sign__icon"
                 style={{ fontSize: 17 }}
               />
               <input
                 type="text"
                 className="sign__input"
                 placeholder="mobile number"
                 name="contact"
                 onChange={(e) => setContact(e.target.value)}
               />
             </div>
             <div className="sign__field">
               <LockIcon className="sign__icon" style={{ fontSize: 17 }} />
               <input
                 type="password"
                 className="sign__input"
                 placeholder="Password"
                 name="password"
                 onChange={(e) => setPassword(e.target.value)}
               />
               {error && (
                 <p style={{ fontSize: 12, color: "red", marginTop: 2 }}>
                   {error}
                 </p>
               )}
             </div>
             <button type="submit" className="button sign__submit">
               <span className="button__text">Sign Up Now</span>
               <ChevronRightIcon className="button__icon" />
             </button>
             <button className="button sign__submit" onClick={signHandle}>
               <span className="button__text">Already Account</span>
               <ChevronRightIcon className="button__icon" />
             </button>
           </form>
           <div className="social-sign">
             <h3 className="jj">log in via</h3>
             <div className="social-icons">
               <a href="#">
                 <GoogleIcon className="social-sign__icon" />
               </a>
               <a href="#">
                 <FacebookRoundedIcon className="social-sign__icon" />
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

 export default Sign;
