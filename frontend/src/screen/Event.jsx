import axios from "axios";
import { useEffect, useState } from "react";


import LocalHotelOutlinedIcon from "@mui/icons-material/LocalHotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";

function Event() {
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
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/event").then((res) => {
      setEvents(res.data);
    });
  }, []);

function eventSubmit(e) {
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

  if (editingEventId !== null) {
    axios
      .put(`http://localhost:5000/event/${editingEventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const updatedEvents = events.map((event) =>
          event._id === editingEventId ? res.data : event
        );
        setEvents(updatedEvents);
        resetFormFields();
        setEditingEventId(null);
      })
      .catch((err) => {
        console.log(err);
        // Handle error here
      });
  } else {
    axios
      .post("http://localhost:5000/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setEvents([...events, res.data]);
        resetFormFields();
      })
      .catch((err) => {
        console.log(err);
        // Handle error here
      });
  }
}

function updateEvent(event) {
  setEditingEventId(event._id);
  setName(event.name);
  setPrice(event.price);
  setDay(event.day);
  setBed(event.bed);
  setBath(event.bath);
  setGuest(event.guest);
  setCar(event.car);
  setFloor(event.floor);
  setFuel(event.fuel);
  // Clear file input
  setFile("");
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

  function deleteEvent(id) {
    axios
      .delete(`http://localhost:5000/event/${id}`)
      .then(() => {
        setEvents(events.filter((event) => event._id !== id));
      })
      .catch((err) => console.log(err));
  }

  

  return (
    <div className="mainpannel">
      <h1 style={{ marginBottom: 30 }}> Event Data</h1>

      <form onSubmit={eventSubmit} className="form-horizontal">
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
          <label htmlFor="name">Event Name</label>
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
          <label htmlFor="day">Date</label>
          <input
            type="text"
            id="day"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bed">space</label>
          <input
            type="text"
            id="bed"
            name="bed"
            value={bed}
            onChange={(e) => setBed(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bath">AC</label>
          <input
            type="text"
            id="bath"
            name="bath"
            value={bath}
            onChange={(e) => setBath(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="guest">Meal</label>
          <input
            type="text"
            id="guest"
            name="guest"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="car">Shift</label>
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
          <label htmlFor="fuel">Decoration</label>
          <input
            type="text"
            id="fuel"
            name="fuel"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          />
        </div>
        <button type="submit">{editingEventId ? "Update" : "Submit"}</button>
      </form>
      <div className="box">
        {events.map((event) => (
          <div className="roomssADMIN" key={event._id}>
            <img
              className="adminIMGS"
              src={`http://localhost:5000/${event.image}`}
              alt=""
            />
            <div className="roomDetails">
              <div className="room-title">
                <h5 className="room-names">{event.name}</h5>
                <h4 className="room-prices">
                  {event.price}PKR<span id="room-timings">/{event.day}</span>
                </h4>
              </div>
              <h2 className="floors">{event.floor}</h2>
              <div className="room-allot">
                <div className="room-spaces">
                  <LocalHotelOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{event.bed} </h5>
                </div>
                <div className="room-spaces">
                  <BathtubOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{event.bath} </h5>
                </div>
                <div className="room-spaces">
                  <Diversity1OutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{event.guest} </h5>
                </div>
                <div className="room-spaces">
                  <DirectionsCarFilledOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{event.car} </h5>
                </div>
                <div className="room-spaces">
                  <LocalGasStationOutlinedIcon
                    sx={{ fontSize: 12, color: "#fea116" }}
                  />
                  <h5>{event.fuel} </h5>
                </div>
              </div>
              <button
                className="booking-rooms"
                onClick={() => deleteEvent(event._id)}
              >
                Delete
              </button>
              <button
                className="booking-rooms"
                onClick={() => updateEvent(event)}
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

export default Event;
