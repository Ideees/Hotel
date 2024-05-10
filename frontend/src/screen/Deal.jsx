import axios from "axios";
import { useEffect, useState } from "react";


import LocalHotelOutlinedIcon from "@mui/icons-material/LocalHotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";

function Deal() {
   const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [day, setDay] = useState("");
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [guest, setGuest] = useState("");
  const [car, setCar] = useState("");
  const [floor, setFloor] = useState("");
  const [fuel, setFuel] = useState("");
  const [deals, setDeals] = useState([]);
  const [editingDealId, setEditingDealId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/deal").then((res) => {
      setDeals(res.data);
    });
  }, []);

  function dealSubmit(e) {
    e.preventDefault();
     const formData = new FormData();
     formData.append("file", file);
     formData.append("name", name);
     formData.append("price", price);
     formData.append("day", day);
     formData.append("bed", bed);
     formData.append("bath", bath);
     formData.append("guest", guest);
     formData.append("car", car);
     formData.append("floor", floor);
     formData.append("fuel", fuel);
    if (editingDealId) {
      axios
        .put(`http://localhost:5000/deal/${editingDealId}`, {
          name,
          price,
          day,
          bed,
          bath,
          guest,
          car,
          floor,
          fuel,
        })
        .then((res) => {
          const updatedDeals = deals.map((deal) =>
            deal._id === editingDealId ? res.data : deal
          );
          setDeals(updatedDeals);
          setEditingDealId(null);
          resetFormFields();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:5000/deal", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
           setDeals([...deals, res.data]);
          resetFormFields();
        })
        .catch((err) => console.log(err));
    }
  }

  function resetFormFields() {
     setFile("");
    setName("");
    setPrice("");
    setDay("");
    setBed("");
    setBath("");
    setGuest("");
    setCar("");
    setFloor("");
    setFuel("");
  }

  function deleteDeal(id) {
    axios
      .delete(`http://localhost:5000/deal/${id}`)
      .then(() => {
        setDeals(deals.filter((deal) => deal._id !== id));
      })
      .catch((err) => console.log(err));
  }

  function updateDeal(deal) {
    setEditingDealId(deal._id);
    setName(deal.name);
    setPrice(deal.price);
    setDay(deal.day);
    setBed(deal.bed);
    setBath(deal.bath);
    setGuest(deal.guest);
    setCar(deal.car);
    setFloor(deal.floor);

    setFuel(deal.fuel);
  }

  return (
    <div className="mainpannel">
      <h1 style={{ marginBottom: 30 }}> Deal Data</h1>

      <form onSubmit={dealSubmit} className="form-horizontal">
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="file">File</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label htmlFor="name">Deal Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="day">Day</label>
          <input
            type="text"
            id="day"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bed">Bed</label>
          <input
            type="text"
            id="bed"
            name="bed"
            value={bed}
            onChange={(e) => setBed(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bath">Bath</label>
          <input
            type="text"
            id="bath"
            name="bath"
            value={bath}
            onChange={(e) => setBath(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="guest">Guest</label>
          <input
            type="text"
            id="guest"
            name="guest"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="car">Car</label>
          <input
            type="text"
            id="car"
            name="car"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="floor">Floor</label>
          <input
            type="text"
            id="floor"
            name="floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fuel">Fuel</label>
          <input
            type="text"
            id="fuel"
            name="fuel"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          />
        </div>
        <button type="submit">{editingDealId ? "Update" : "Submit"}</button>
      </form>
      <div className="box">
        {deals.map((deal) => (
          <div className="roomssADMIN" key={deal._id}>
            <img
              className="adminIMGS"
              src={`http://localhost:5000/${deal.image}`}
              alt=""
            />
            <div className="roomDetails">
              <div className="room-title">
                <h5 className="room-names">{deal.name}</h5>
                <h4 className="room-prices">
                  {deal.price}PKR<span id="room-timings">/{deal.day}</span>
                </h4>
              </div>
              <h2 className="floors">{deal.floor}</h2>
              <div className="room-allot">
                <div className="room-spaces">
                  <LocalHotelOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{deal.bed} Bed</h5>
                </div>
                <div className="room-spaces">
                  <BathtubOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{deal.bath} Bath</h5>
                </div>
                <div className="room-spaces">
                  <Diversity1OutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{deal.guest} Guest</h5>
                </div>
                <div className="room-spaces">
                  <DirectionsCarFilledOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{deal.car} Car</h5>
                </div>
                <div className="room-spaces">
                  <LocalGasStationOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{deal.fuel} Fuel</h5>
                </div>
              </div>
              <button
                className="booking-rooms"
                onClick={() => deleteDeal(deal._id)}
              >
                Delete
              </button>
              <button
                className="booking-rooms"
                onClick={() => updateDeal(deal)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deal;
