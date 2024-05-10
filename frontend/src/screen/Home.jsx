import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import Cookies from "js-cookie";
import React from "react";
import ProfileCard from "./ProfileCard";

import {
  Login as LoginIcon,
  PersonAddAlt as PersonAddAltIcon,
  LocationOn as LocationOnIcon,
  Call as CallIcon,
  FacebookOutlined as FacebookOutlinedIcon,
  Google as GoogleIcon,
  SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
  Wifi as WifiIcon,
  Apartment as ApartmentIcon,
  SoupKitchen as SoupKitchenIcon,
  Hiking as HikingIcon,
  SportsEsports as SportsEsportsIcon,
  SelfImprovement as SelfImprovementIcon,
  CalendarMonth as CalendarMonthIcon,
  Instagram,
  LocalHotelOutlined as LocalHotelOutlinedIcon,
  BathtubOutlined as BathtubOutlinedIcon,
  Diversity1Outlined as Diversity1OutlinedIcon,
  DirectionsCarFilledOutlined as DirectionsCarFilledOutlinedIcon,
  LocalGasStationOutlined as LocalGasStationOutlinedIcon,
  SecurityOutlined as SecurityOutlinedIcon,
  LiquorOutlined as LiquorOutlinedIcon,
  PoolOutlined as PoolOutlinedIcon,
  MenuOutlined as MenuOutlinedIcon,
} from "@mui/icons-material";

import PedalBikeIcon from "@mui/icons-material/PedalBike";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import aboutImage from "../images/about.jpeg";
import chose from "../images/chose.jpeg";
import axios from "axios";
 
function Home() {
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);
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

  // remove session
  function handleLogout() {
    localStorage.removeItem("token");
    Cookies.remove("token");

    navigate("/");
  }

  return (
    <div className="mainCon">
      
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
            {userData ? <>{userData.name}
            {userData.bed}</> : <p>Loading...</p>}
          </button>
        </div>
      </header>

      <Nav />
      <Booking />
      <About />
      <ServiceData />
      <FutureRoom />
      <Chose />
      <Footer />
    </div>
  );
}

export default Home;

function Nav() {
  const [activeButton, setActiveButton] = useState(null);
  const [mobilebtn, setMobilebtn] = useState(null);
  const navigate = useNavigate();

  
  function  Profile(){
 navigate("/profile");
  }

  return (
    <>
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
            <li>Home</li>
            <li>Service</li>
            <li>Rooms</li>
            <li>Packages</li>
            <li>Amenities</li>
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

      <section>
        <div className="childsection"></div>
        <h1 data-aos="flip-up" data-aos-duration="500">
          Welcome to Hotel <br />
        </h1>
        <span id="guests" data-aos="flip-up" data-aos-duration="1000">
          Guest Harbor
        </span>

        <div className="sectionBtn">
          <button
            className={activeButton === "guest" ? "active" : ""}
            onClick={() => setActiveButton("guest")}
            data-aos="fade-left"
          >
            As a Guest
          </button>
          <button
            className={activeButton === "student" ? "active" : ""}
            onClick={() => setActiveButton("student")}
            data-aos="fade-right"
          >
            As a Student
          </button>
        </div>
      </section>
    </>
  );
}

function Booking() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [guest, setGuest] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/booking", {
        userId: userData.userId,
        date,
        room,
        bed,
        guest,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="book-table">
      <div className="booking">
        <form className="orderForm" onSubmit={handleSubmit}>
          <input
            type="date"
            placeholder=""
            className="order"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rooms"
            max="10"
            className="order"
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            type="number"
            placeholder="Beds"
            max="6"
            className="order"
            onChange={(e) => setBed(e.target.value)}
          />
          <input
            type="number"
            placeholder="Guest"
            max="10"
            className="order"
            onChange={(e) => setGuest(e.target.value)}
          />
          <button className="order" id="btn" type="submit">
            Book
          </button>
        </form>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="mainAbout" id="LINKS3">
      <div className="childBox1" data-aos="flip-up">
        <div className="imgs">
          <img src={aboutImage} alt="" width="470" height="570" id="aboutImg" />
        </div>
      </div>
      <div className="childBox2">
        <p className="title">About Us</p>
        <h1 className="headings">
          Welcome to Guest Harbor, offering modern hotel room sales services.
        </h1>
        <p className="pragraph">
          A modern hotel offering luxurious accommodations and exceptional
          services. Nestled in a picturesque environment, our hotel provides a
          peaceful and rejuvenating stay. With a range of amenities and dining
          options, we ensure a comfortable and delightful experience for our
          guests. Experience the epitome of hospitality and create unforgettable
          memories with us at Guest Harbor.
        </p>
        <div className="aboutIcon">
          <div
            className="customer"
            data-aos="flip-up"
            data-aos-duration="800"
          >
            <SentimentSatisfiedAltIcon
              sx={{ fontSize: 60, color: "#fea116" }}
            />
            <h1 className="num">700</h1>
            <p className="about-Para">Happy Customers</p>
          </div>
          <div className="room" data-aos="flip-up" data-aos-duration="1300">
            <ApartmentIcon sx={{ fontSize: 60, color: "#fea116" }} />
            <h1 className="num">120</h1>
            <p className="about-Para">Luxury Rooms</p>
          </div>
          <div
            className="amentities"
            data-aos="flip-up"
            data-aos-duration="1800"
          >
            <WifiIcon sx={{ fontSize: 60, color: "#fea116" }} />
            <h1 className="num">280</h1>
            <p className="about-Para">Lots of Amenities</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceData() {
  const service = [
    {
      name: "Rooms & Appartment",
      icon: <ApartmentIcon sx={{ fontSize: 85, color: "#fea116" }} id="icon" />,
      pragraph: "Great explorer of the truth the ter...",
    },
    {
      name: "Food & Restaurant",
      icon: (
        <SoupKitchenIcon sx={{ fontSize: 85, color: "#fea116" }} id="icon" />
      ),
      pragraph: "Great explorer of the truth the ter...",
    },
    {
      name: "Spa & Fitness",
      icon: <HikingIcon sx={{ fontSize: 85, color: "#fea116" }} id="icon" />,
      pragraph: "Great explorer of the truth the ter...",
    },
    {
      name: "Sports & Gaming",
      icon: (
        <SportsEsportsIcon sx={{ fontSize: 85, color: "#fea116" }} id="icon" />
      ),
      pragraph: "Great explorer of the truth the ter...",
    },
    {
      name: "Event & Party",
      icon: (
        <CalendarMonthIcon sx={{ fontSize: 85, color: "#fea116" }} id="icon" />
      ),
      pragraph: "Great explorer of the truth the ter...",
    },
    {
      name: "GYM & Yoga",
      icon: (
        <SelfImprovementIcon
          sx={{ fontSize: 85, color: "#fea116" }}
          id="icon"
        />
      ),
      pragraph: "Great explorer of the truth the ter...",
    },
  ];
  return (
    <div className="services" id="LINKS1">
      <h2 className="service-head" data-aos="flip-up" data-aos-duration="700">
        Our Services
      </h2>
      <h1 className="service-title" data-aos="flip-up" data-aos-duration="1000">
        We Provide Most Exclusive <br />
        Hotel & Room Services
      </h1>
      <div className="boxs">
        {service.map((serv, index) => (
          <Service key={index} objService={serv} />
        ))}
      </div>
    </div>
  );
}

function Service({ objService }) {
  return (
    <div className="box1" data-aos="flip-left">
      {objService.icon}
      <h1>{objService.name}</h1>
      <p>{objService.pragraph}</p>
      <button className="servicbtn">{objService.btn}</button>
    </div>
  );
}

function FutureRoom() {
  const [selectedPage, setSelectedPage] = useState("all");
  const [color, setColor] = useState("all");

  const handleItemClick = (page) => {
    setSelectedPage(page);
    setColor(page);
  };

  function Deal() {
    const [homeDeal, setHomeDeal] = useState([]);
    const [userData, setUserData] = useState({});
    useEffect(() => {
      axios
        .get("http://localhost:5000/homeDealGet")
        .then((res) => {
          setHomeDeal(res.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }, []);

    useEffect(() => {
      axios
        .get("http://localhost:5000/home")
        .then((res) => {
          setUserData(res.data);
          
        })
        .catch((err) => console.log(err));
    }, []);

    const bookRoom = (data) => {
      data.UserName = userData.name;
      data.UserEmail = userData.email;
      data.UserContact = userData.contact

      data.userId = userData.userId;
       

      axios
        .post("http://localhost:5000/bookRoom", data)
        .then((res) => {
          console.log("Booking successful:", res.data);
        })
        .catch((error) => {
          console.error("Error booking room: ", error);
        });
    };

    return (
      <>
        {homeDeal.map((data) => (
          <div className="rooms" data-aos="fade-up">
            <img
              src={`http://localhost:5000/${data.image}`}
              alt=""
              className="room-img"
              id="LINKS2"
            />
            <div className="roomDetail">
              <div className="room-title">
                <h5 className="room-name">{data.name}</h5>
                <h4 className="room-price">
                  {data.price}PKR <span id="room-timing">/ {data.day}</span>
                </h4>
              </div>
              <h2 className="floor">{data.floor}</h2>
              <div className="room-allot">
                <div className="room-space">
                  <LocalHotelOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.bed} Bed</h5>
                </div>
                <div className="room-space">
                  <BathtubOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.bath} Bath</h5>
                </div>
                <div className="room-space">
                  <Diversity1OutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.guest} Guest</h5>
                </div>
                <div className="room-space">
                  <DirectionsCarFilledOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.car}</h5>
                </div>
                <div className="room-space">
                  <LocalGasStationOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.fuel} Liter</h5>
                </div>
              </div>
              <button className="booking-room" onClick={() => bookRoom(data)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }

  function Guest() {
    const [homeGuest, setHomeGuest] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
      axios
        .get("http://localhost:5000/homeGuestGet")
        .then((res) => {
          setHomeGuest(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

    useEffect(() => {
      axios
        .get("http://localhost:5000/home")
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    const bookRoom = (data) => {
      data.userId = userData.userId;
       data.UserName = userData.name;
       data.UserEmail = userData.email;
       data.UserContact = userData.contact;

      axios
        .post("http://localhost:5000/bookRoom", data)
        .then((res) => {
          console.log("Booking successful:", res.data);
        })
        .catch((error) => {
          console.error("Error booking room: ", error);
        });
    };

    return (
      <>
        {homeGuest.map((data) => (
          <div className="rooms" key={data._id}  data-aos="fade-up">
            <img
              src={`http://localhost:5000/${data.image}`}
              alt=""
              className="room-img"
            />
            <div className="roomDetail">
              <div className="room-title">
                <h5 className="room-name">{data.name}</h5>
                <h4 className="room-price">
                  {data.price}PKR <span id="room-timing">/ {data.day}</span>
                </h4>
              </div>
              <h2 className="floor">{data.floor}</h2>
              <div className="room-allot">
                <div className="room-space">
                  <LocalHotelOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.bed} Bed</h5>
                </div>
                <div className="room-space">
                  <BathtubOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.bath} Bath</h5>
                </div>
                <div className="room-space">
                  <Diversity1OutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.guest} Guest</h5>
                </div>
                <div className="room-space">
                  <DirectionsCarFilledOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.car}</h5>
                </div>
                <div className="room-space">
                  <LocalGasStationOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.fuel} Liter</h5>
                </div>
              </div>
              <button className="booking-room" onClick={() => bookRoom(data)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
  function Student() {
    const [homeStudent, setHomeStudent] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
      axios
        .get("http://localhost:5000/student")
        .then((res) => {
          setHomeStudent(res.data);
        })
        .catch((error) => {
          console.error("Error fetching student data: ", error);
        });
    }, []);

    useEffect(() => {
      axios
        .get("http://localhost:5000/home")
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    const bookRoom = (data) => {
      data.userId = userData.userId;
       data.UserName = userData.name;
       data.UserEmail = userData.email;
       data.UserContact = userData.contact;

      axios
        .post("http://localhost:5000/bookRoom", data)
        .then((res) => {
          console.log("Booking successful:", res.data);
        })
        .catch((error) => {
          console.error("Error booking room: ", error);
        });
    };

    return (
      <>
        {homeStudent.map((data) => (
          <div className="rooms" data-aos="fade-up">
            <img
              src={`http://localhost:5000/${data.image}`}
              alt=""
              className="room-img"
            />
            <div className="roomDetail">
              <div className="room-title">
                <h5 className="room-name">{data.name}</h5>
                <h4 className="room-price">
                  {data.price} PKR{" "}
                  <span id="room-timing">/ {data.day} month</span>
                </h4>
              </div>
              <h2 className="floor">{data.floor} </h2>
              <div className="room-allot">
                <div className="room-space">
                  <LocalHotelOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.bed} Bed</h5>
                </div>
                <div className="room-space">
                  <BathtubOutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.bath} Bath</h5>
                </div>
                <div className="room-space">
                  <Diversity1OutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.guest} Guest</h5>
                </div>

                <div className="room-space">
                  <PedalBikeIcon sx={{ fontSize: 20, color: "#fea116" }} />
                  <h5>{data.car} </h5>
                </div>
                <div className="room-space">
                  <AcUnitIcon sx={{ fontSize: 20, color: "#fea116" }} />
                  <h5> {data.fuel} AC</h5>
                </div>
              </div>
              <button className="booking-room" onClick={() => bookRoom(data)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
  function Event() {
    const [homeEvent, setHomeEvent] = useState([]);
    const [userData, setUserData] = useState({});
    useEffect(() => {
      axios
        .get("http://localhost:5000/home")
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
      axios
        .get("http://localhost:5000/event")
        .then((res) => {
          setHomeEvent(res.data);
        })
        .catch((error) => {
          console.error("Error fetching event data: ", error);
        });
    }, []);

    const bookRoom = (data) => {
      data.userId = userData.userId;

       data.UserName = userData.name;
       data.UserEmail = userData.email;
       data.UserContact = userData.contact;

      axios
        .post("http://localhost:5000/bookRoom", data)
        .then((res) => {
          console.log("Booking successful:", res.data);
        })
        .catch((error) => {
          console.error("Error booking room: ", error);
        });
    };

    return (
      <>
        {homeEvent.map((data) => (
          <div className="rooms" data-aos="fade-up">
            <img
              src={`http://localhost:5000/${data.image}`}
              className="room-img"
              alt=""
            />
            <div className="roomDetail">
              <div className="room-title">
                <h5 className="room-name">{data.name}</h5>
                <h4 className="room-price">
                  {data.price}PKR <span id="room-timing">/ {data.day}</span>
                </h4>
              </div>
              <h2 className="floor">{data.floor}</h2>
              <div className="room-allot">
                <div className="room-space">
                  <AcUnitIcon sx={{ fontSize: 20, color: "#fea116" }} />
                  <h5>{data.bed} </h5>
                </div>
                <div className="room-space">
                  <RestaurantIcon sx={{ fontSize: 20, color: "#fea116" }} />
                  <h5>{data.bath} </h5>
                </div>
                <div className="room-space">
                  <Diversity1OutlinedIcon
                    sx={{ fontSize: 20, color: "#fea116" }}
                  />
                  <h5>{data.guest} </h5>
                </div>
                <div className="room-space">
                  <Brightness4Icon sx={{ fontSize: 20, color: "#fea116" }} />
                  <h5>{data.car}</h5>
                </div>
                <div className="room-space">
                  <ReduceCapacityIcon sx={{ fontSize: 20, color: "#fea116" }} />
                  <h5>{data.fuel} </h5>
                </div>
              </div>
              <button className="booking-room" onClick={() => bookRoom(data)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="btn-future">
      <h1>Featured Rooms</h1>
      <div className="btnRoom" data-aos="flip-up">
        <button
          onClick={() => handleItemClick("all")}
          style={{ backgroundColor: color === "all" ? "#fea116" : "white" }}
        >
          All
        </button>
        <button
          onClick={() => handleItemClick("deal")}
          style={{ backgroundColor: color === "deal" ? "#fea116" : "white" }}
        >
          Deal
        </button>
        <button
          onClick={() => handleItemClick("guest")}
          style={{ backgroundColor: color === "guest" ? "#fea116" : "white" }}
        >
          Guest
        </button>
        <button
          onClick={() => handleItemClick("student")}
          style={{ backgroundColor: color === "student" ? "#fea116" : "white" }}
        >
          Student
        </button>
        <button
          onClick={() => handleItemClick("event")}
          style={{ backgroundColor: color === "event" ? "#fea116" : "white" }}
        >
          Event
        </button>
      </div>
      <div className="content">
        {selectedPage === "all" && (
          <>
            <Deal />
            <Guest />
            <Student />
            <Event />
          </>
        )}
        {selectedPage === "deal" && <Deal />}

        {selectedPage === "guest" && <Guest />}
        {selectedPage === "student" && <Student />}
        {selectedPage === "event" && <Event />}
      </div>
    </div>
  );
}

function Chose() {
  return (
    <div className="mainChose">
      <div className="choseDetail" >
        <h4>Why Choose Us</h4>
        <h1>We Care You & We Feel What’s Needs For Good Living</h1>
        <div className="choseIcon">
          <div className="chooseIcon">
            <PoolOutlinedIcon style={{ fontSize: "18px" }} />
          </div>
          <div className="iconDetail">
            <h5>Relex Living</h5>
            <p>
              Dreat explorer of the truth, the master-builder of human happines
              one rejects, dislikes avoids
            </p>
          </div>
        </div>
        <div className="choseIcon">
          <div className="chooseIcon">
            <SecurityOutlinedIcon style={{ fontSize: "18px" }} />
          </div>
          <div className="iconDetail">
            <h5>High Security System</h5>
            <p>
              Procure him some great pleasure. To take a trivial example, which
              of us ever undertakes labor
            </p>
          </div>
        </div>
        <div className="choseIcon">
          <div className="chooseIcon">
            <LiquorOutlinedIcon style={{ fontSize: "18px" }} />
          </div>
          <div className="iconDetail">
            <h5>Such Events & Party</h5>
            <p>
              Libero tempore, cum soluta nobis est eligenoptio cumque nihil
              impedit quo minus id quod
            </p>
          </div>
        </div>
      </div>
      <div className="choseImg" data-aos-duration="1000">
        <img src={chose} alt="" width="100%" height="500" />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      
      <div className="footerStyle">
        <h1>Guest Harbor</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing . <br />{" "}
          EvenietLorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="footerlink">
          <FacebookOutlinedIcon
            style={{
              fontSize: "26px",
            }}
            className="forterIcon"
          />
          <GoogleIcon
            style={{
              fontSize: "26px",
            }}
            className="forterIcon"
          />
          <Instagram
            style={{
              fontSize: "26px",
            }}
            className="forterIcon"
          />
        </div>
      </div>
      <div className="footerQuick">
        <h2>Quick Link</h2>
        <div className="quicklink">
          <li>About Us</li>
          <li>Services</li>
          <li>Rooms</li>
          <li>Amenities</li>
        </div>
      </div>
    </div>
  );
}
 