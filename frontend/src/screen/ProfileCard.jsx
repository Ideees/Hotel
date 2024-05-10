import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Nav from "./Nav";
import Header from "./Header";

import LocalHotelOutlinedIcon from "@mui/icons-material/LocalHotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((res) => {
        setUser(res.data);
        setOrders(res.data.orders);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <Nav />
      {user && (
        <>
          <div className="profileDetails">
            <h1>
              <span id="wish">Welcome</span>, {user.name} 😍
            </h1>
            <p>Email: {user.email}</p>
            <p>Contact: {user.contact}</p>
          </div>
          <h1 id="bookdataprofile">Booking</h1>
          <div className="mainProfile">
            {orders.map((order) => (
              <div key={order._id} className="profileOrder">
                <h5>
                  Name : <p>{order.name}</p>
                </h5>
                <h5>
                  Price : <p>{order.price}</p>
                </h5>
                <h5>
                  Days : <p>{order.day}</p>
                </h5>
                <h5>
                  Floor : <p>{order.floor}</p>
                </h5>
                <h5>
                  Bath : <p>{order.bath}</p>
                </h5>
                <h5>
                  Guest : <p>{order.guest}</p>
                </h5>
                <h5>
                  car : <p>{order.car}</p>
                </h5>
                <h5>
                  fuel : <p>{order.fuel}</p>
                </h5>
              </div>
            ))}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default ProfileCard;
