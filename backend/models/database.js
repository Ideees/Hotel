const mongoose = require("mongoose");

// schema 1
const HotelUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contact: Number,
  role: {
    type: String,
    default: "visitor",
  },
});

const HotelUserModel = mongoose.model("HUser", HotelUserSchema);

//schema 2

const DealSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  day: { type: String, required: true },
  price: { type: Number, required: true },
  bed: { type: Number, required: true },
  bath: { type: Number, required: true },
  guest: { type: Number, required: true },
  car: { type: String, required: true },
  floor: { type: String, required: true },
  fuel: { type: Number, required: true },
});

const DealModel = mongoose.model("Deal", DealSchema);

//schema 3

const GuestSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  day: { type: String, required: true },
  price: { type: Number, required: true },
  bed: { type: Number, required: true },
  bath: { type: Number, required: true },
  guest: { type: Number, required: true },
  car: { type: String, required: true },
  floor: { type: String, required: true },
  fuel: { type:  String, required: true },
});

const GuestModel = mongoose.model("Guest", GuestSchema);

//schema 3
const EventSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  day: { type: String, required: true },
  price: { type: String, required: true },
  bed: { type: String, required: true },
  bath: { type: String, required: true },
  guest: { type: String, required: true },
  car: { type: String, required: true },
  floor: { type: String, required: true },
  fuel: { type: String, required: true },
});
const EventModel = mongoose.model("Event", EventSchema);

//schema 4
const StudentSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  day: { type: String, required: true },
  price: { type: Number, required: true },
  bed: { type: Number, required: true },
  bath: { type: Number, required: true },
  guest: { type: Number, required: true },
  car: { type: String, required: true },
  floor: { type: String, required: true },
  fuel: { type: String, required: true },
});
const StudentModel = mongoose.model("Student", StudentSchema);

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "HUser", required: true },
  room: { type: Number, required: true },
  bed: { type: Number, required: true },
  guest: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});
const BookingModel = mongoose.model("Booking", bookingSchema);


const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "HUser", required: true },
  name: { type: String },
  price: { type: String },
  day: { type: String },
  floor: { type: String },
  bed: { type: String },
  bath: { type: String },
  guest: { type: String },
  car: { type: String },
  fuel: { type: String },
  UserName: { type: String },
  UserContact: { type: String },
  UserEmail: { type: String },
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = {
  HotelUserModel,
  DealModel,
  GuestModel,
  EventModel,
  StudentModel,
  BookingModel,
  OrderModel,
};
