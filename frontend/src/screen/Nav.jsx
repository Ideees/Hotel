import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { MenuOutlined as MenuOutlinedIcon } from "@mui/icons-material";
function Nav() {
  const [mobilebtn, setMobilebtn] = useState(null);
  const navigate = useNavigate();

  function Profile() {
    navigate("/profile");
  }
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);

  return (
    <nav>
      <h1>Guest Harbor</h1>
      <ul className="website">
        <li data-aos="flip-up" data-aos-duration="400">
          Home
        </li>
        <a href="#LINKS1">
          {" "}
          <li data-aos="flip-up" data-aos-duration="800">
            Service
          </li>
        </a>
        <a href="#LINKS2">
          <li data-aos="flip-up" data-aos-duration="1200">
            Rooms
          </li>
        </a>
        <a href="#LINKS3">
          <li data-aos="flip-up" data-aos-duration="1600">
            About
          </li>
        </a>
      </ul>
      <div className="mobile">
        <ul className={mobilebtn === "al" ? " " : "active"}>
          <h2 className="bookOrderss" data-aos="flip-up" onClick={Profile}>
            My Booking
          </h2>
          <a href="#">
            <li data-aos="fade-up" data-aos-duration="800">
              Home
            </li>
          </a>
          <a href="#LINKS1">
            {" "}
            <li data-aos="fade-up" data-aos-duration="800">
              Service
            </li>
          </a>
          <a href="#LINKS2">
            <li data-aos="fade-up" data-aos-duration="1200">
              Rooms
            </li>
          </a>
          <a href="#LINKS3">
            <li data-aos="fade-up" data-aos-duration="1600">
              About
            </li>
          </a>
        </ul>
        <button
          onClick={(e) => setMobilebtn(mobilebtn === "al" ? "" : "al")}
          className="menuBtn"
        >
          <MenuOutlinedIcon sx={{ fontSize: 35 }} />
        </button>
      </div>

      <h2 className="bookOrder" data-aos="flip-up" onClick={Profile}>
        My Booking
      </h2>
    </nav>
  );
}

export default Nav;
