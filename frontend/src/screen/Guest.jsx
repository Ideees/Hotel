import { useState, useEffect } from "react";
import axios from "axios";


import LocalHotelOutlinedIcon from "@mui/icons-material/LocalHotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";

function Guest() {
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
  const [guests, setGuests] = useState([]);
  const [editingGuestId, setEditingGuestId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDay, setEditDay] = useState("");
  const [editBed, setEditBed] = useState("");
  const [editBath, setEditBath] = useState("");
  const [editGuest, setEditGuest] = useState("");
  const [editCar, setEditCar] = useState("");
  const [editFloor, setEditFloor] = useState("");

  const [editFuel, setEditFuel] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/guest").then((res) => {
      
      setGuests(res.data);
      
    });
  }, []);

  function GuestSubmit(e) {
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

    e.preventDefault();
    axios
      .post("http://localhost:5000/guest", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setName("");
        setPrice("");
        setDay("");
        setBed("");
        setBath("");
        setGuest("");
        setCar("");
        setFloor("");
        setFile("")
        setFuel("");
        setGuests([...guests, res.data]);
      })
      .catch((err) => console.log(err));
  }

  function toggleEditing(
    guestId,
    name,
    price,
    day,
    bed,
    bath,
    guest,
    car,
    floor,
    fuel
  ) {
    setEditingGuestId(guestId);
    setEditName(name);
    setEditPrice(price);
    setEditDay(day);
    setEditBed(bed);
    setEditBath(bath);
    setEditGuest(guest);
    setEditCar(car);
    setEditFloor(floor);
    setEditFuel(fuel);
  }

  function updateGuest(guestId) {
    axios
      .put(`http://localhost:5000/guest/${guestId}`, {
        name: editName,
        price: editPrice,
        day: editDay,
        bed: editBed,
        bath: editBath,
        guest: editGuest,
        car: editCar,
        floor: editFloor,
        fuel: editFuel,
      })
      .then((res) => {
        console.log(res);
        setGuests(
          guests.map((guest) => (guest._id === guestId ? res.data : guest))
        );
        setEditingGuestId(null);
      })
      .catch((err) => console.log(err));
  }

  function deleteGuest(id) {
    axios
      .delete(`http://localhost:5000/guest/${id}`)
      .then(() => {
        console.log("guest deleted");
        setGuests(guests.filter((guest) => guest._id !== id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="mainpannel">
      <h1 style={{ marginBottom: 30 }}> Guest Data</h1>

      <form onSubmit={GuestSubmit} className="form-horizontal">
        <div className="form-group">
          <label htmlFor="file">File</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Room Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="day">Day</label>
          <input
            type="text"
            id="day"
            name="day"
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bed">Bed</label>
          <input
            type="text"
            id="bed"
            name="bed"
            onChange={(e) => setBed(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bath">Bath</label>
          <input
            type="text"
            id="bath"
            name="bath"
            onChange={(e) => setBath(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="guest">Guest</label>
          <input
            type="text"
            id="guest"
            name="guest"
            onChange={(e) => setGuest(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="car">Car</label>
          <input
            type="text"
            id="car"
            name="car"
            onChange={(e) => setCar(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="floor">Floor</label>
          <input
            type="text"
            id="floor"
            name="floor"
            onChange={(e) => setFloor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fuel">Fuel</label>
          <input
            type="text"
            id="fuel"
            name="fuel"
            onChange={(e) => setFuel(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <div className="box">
        {guests.map((guest) => (
          <div className="roomssADMIN" key={guest._id}>
            {guest._id}

            <img
              src={`http://localhost:5000/${guest.image}`}
              alt=""
              className="adminIMGS"
              onError={(e) => console.log("Image load error", e)}
            />

            <div className="roomDetails">
              <div className="room-title">
                <h5 className="rooms-names">{guest.name}</h5>
                <h4 className="room-prices">
                  {guest.price}PKR<span id="room-timings">/{guest.day}</span>
                </h4>
              </div>
              <h2 className="floors">{guest.floor}</h2>
              <div className="room-allot">
                <div className="room-spaces">
                  <LocalHotelOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{guest.bed} Bed</h5>
                </div>
                <div className="room-spaces">
                  <BathtubOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{guest.bath} Bath</h5>
                </div>
                <div className="room-spaces">
                  <Diversity1OutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{guest.guest} Guest</h5>
                </div>
                <div className="room-spaces">
                  <DirectionsCarFilledOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{guest.car}</h5>
                </div>
                <div className="room-spaces">
                  <LocalGasStationOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{guest.fuel} Liter</h5>
                </div>
              </div>
              <button
                className="booking-rooms"
                onClick={() =>
                  toggleEditing(
                    guest._id,
                    guest.name,
                    guest.price,
                    guest.day,
                    guest.bed,
                    guest.bath,
                    guest.guest,
                    guest.car,
                    guest.fuel
                  )
                }
              >
                Update
              </button>
              <button
                className="booking-rooms"
                onClick={() => deleteGuest(guest._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {guests.map((guest) => (
          <div key={guest._id}>
            {editingGuestId === guest._id ? (
              <>
                <label htmlFor="edit-name">Room Name</label>
                <input
                  id="edit-name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <label htmlFor="edit-price">Price</label>
                <input
                  id="edit-price"
                  type="text"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
                <label htmlFor="edit-day">Day</label>
                <input
                  id="edit-day"
                  type="text"
                  value={editDay}
                  onChange={(e) => setEditDay(e.target.value)}
                />
                <label htmlFor="edit-bed">Bed</label>
                <input
                  id="edit-bed"
                  type="text"
                  value={editBed}
                  onChange={(e) => setEditBed(e.target.value)}
                />
                <label htmlFor="edit-bath">Bath</label>
                <input
                  id="edit-bath"
                  type="text"
                  value={editBath}
                  onChange={(e) => setEditBath(e.target.value)}
                />
                <label htmlFor="edit-guest">Guest</label>
                <input
                  id="edit-guest"
                  type="text"
                  value={editGuest}
                  onChange={(e) => setEditGuest(e.target.value)}
                />
                <label htmlFor="edit-car">Car</label>
                <input
                  id="edit-car"
                  type="text"
                  value={editCar}
                  onChange={(e) => setEditCar(e.target.value)}
                />
                <label htmlFor="edit-floor">Floor</label>
                <input
                  id="edit-floor"
                  type="text"
                  value={editFloor}
                  onChange={(e) => setEditFloor(e.target.value)}
                />
                <label htmlFor="edit-fuel">Fuel</label>
                <input
                  id="edit-fuel"
                  type="text"
                  value={editFuel}
                  onChange={(e) => setEditFuel(e.target.value)}
                />

                <button onClick={() => updateGuest(guest._id)}>Save</button>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guest;
