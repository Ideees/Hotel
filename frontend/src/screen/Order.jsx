import axios from "axios";
import { useEffect, useState } from "react";


import LocalHotelOutlinedIcon from "@mui/icons-material/LocalHotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";

function Order() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/bookRoom")
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {book.map((bookData) => (
        <div className="roomssADMIN" key={bookData._id}>
          <h1></h1>
          <div className="adminData">
            {bookData.UserName} <br />
            {bookData.UserContact} <br />
            {bookData.UserEmail} <br />
          </div>
          <div className="roomDetails">
            <div className="room-title">
              <h5 className="room-names">{bookData.name}</h5>
              <h4 className="room-prices">
                {bookData.price}PKR
                <span id="room-timings">/{bookData.day}</span>
              </h4>
            </div>
            <h2 className="floors">{bookData.floor}</h2>
            <div className="room-allot">
              <div className="room-spaces">
                <LocalHotelOutlinedIcon
                  sx={{ fontSize: 12, color: "#fea116" }}
                />
                <h5>{bookData.bed} </h5>
              </div>
              <div className="room-spaces">
                <BathtubOutlinedIcon sx={{ fontSize: 12, color: "#fea116" }} />
                <h5>{bookData.bath} </h5>
              </div>
              <div className="room-spaces">
                <Diversity1OutlinedIcon
                  sx={{ fontSize: 12, color: "#fea116" }}
                />
                <h5>{bookData.guest} </h5>
              </div>
              <div className="room-spaces">
                <DirectionsCarFilledOutlinedIcon
                  sx={{ fontSize: 12, color: "#fea116" }}
                />
                <h5>{bookData.car} </h5>
              </div>
              <div className="room-spaces">
                <LocalGasStationOutlinedIcon
                  sx={{ fontSize: 12, color: "#fea116" }}
                />
                <h5>{bookData.fuel} </h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Order;
