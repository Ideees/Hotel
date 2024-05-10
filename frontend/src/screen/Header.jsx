import Cookies from "js-cookie";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Login as LoginIcon,
  PersonAddAlt as PersonAddAltIcon,
  LocationOn as LocationOnIcon,
  Call as CallIcon,
} from "@mui/icons-material";

function Header() {
  // remove session
  function handleLogout() {
    localStorage.removeItem("token");
    Cookies.remove("token");

    navigate("/");
  }

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((response) => {
        if (response.data.Status !== "Success") {
          navigate("/");
        } else {
          setUserData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [navigate]);

  return (
    <header>
      <div className="headerCall">
        <LocationOnIcon
          style={{ color: "#fea116", fontSize: "16px", marginLeft: "5px" }}
        />
        <p>Pak, Multan</p>
        <CallIcon
          style={{ color: "#fea116", fontSize: "16px", marginLeft: "18px" }}
        />
        <p>+9230000000</p>
      </div>

      <div className="headerbtn">
        <button className="header-btn" onClick={handleLogout}>
          <LoginIcon
            style={{ fontSize: "16px", fontWeight: 800, marginRight: "5px" }}
          />
          Logout
        </button>

        <button className="header-btn">
          {" "}
          <PersonAddAltIcon
            style={{ fontSize: "16px", fontWeight: 800, marginRight: "5px" }}
          />
          {userData ? (
            <>
              {userData.name}
              {userData.bed}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
