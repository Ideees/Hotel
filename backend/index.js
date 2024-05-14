const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const {
  HotelUserModel,
  DealModel,
  GuestModel,
  EventModel,
  StudentModel,
  BookingModel,
  OrderModel
} = require("./models/database");

const app = express();

// Middleware setup
app.use(
  cors({
    origin: 'https://hotel-front-taupe.vercel.app',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    allowedHeaders: ['Content-Type', 'Authorization'], // Add headers you want to allow
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect("mongodb+srv://idreesfaiz9:goodlu11@hotel.pne77u9.mongodb.net/Hotels?retryWrites=true&w=majority&appName=Hotel")
   
app.get("/", (req, res) => {
    res.json("hello idrees");
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/Images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({
  storage: storage,
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "idreesfaiz9@gmail.com",
    pass: "bent smdn gdba kfmq",
  },
});
// Function to send email
function sendEmail(to, subject, text) {
  const mailOptions = {
    from: "idreesfaiz9@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email sending error:", error);
    } else {
      res.send({ Status: "Success" });
    }
  });
}

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("token not availabe");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decode) => {
      if (err || !decode) {
        return res.json("wrong token");
      }
      req.user = decode; 
      next(); // Call next middleware
    });
  }
};

// Home endpoint
app.get("/home", verifyUser, async (req, res) => {
  
  // Now you can access user information from req.user
  const { email, name, contact } = req.user;
  const { userId } = req.user;
 const orders = await OrderModel.find({ user: userId });
 const book = await BookingModel.find({ user: userId });

 
  // console.log("User Email:", email);
  // console.log("User Name:", name);
  // console.log("User Mobile:", contact);
  // console.log("User ID:", userId);
  console.log(orders);
  return res.json({ Status: "Success", email, name, contact, userId , orders ,book });
});

// Login endpoint
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const Huser = await HotelUserModel.findOne({ email });
    if (!Huser) {
      return res.json("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, Huser.password);
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          userId: Huser._id,
          email: Huser.email,
          role: Huser.role,
          name: Huser.name,
          contact: Huser.contact,
        },
        "jwt-secret-key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);

      return res.json({ Status: "Success", role: Huser.role });
    } else {
      return res.json("Incorrect password");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Register endpoint
app.post("/Huser", async (req, res) => {
  const { name, email, password, contact } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const Huser = await HotelUserModel.create({
      name,
      email,
      password: hash,
      contact,
    });

    sendEmail(
      email,
      `Welcome to GuestHarbor`,
      `Subject: Welcome to GuestHarbor - Your New Home Away from Home

Dear ${name},

Welcome to GuestHarbor! We are thrilled to have you join our community of travelers and hotel enthusiasts. Your registration is the first step towards unlocking a world of delightful stays and memorable experiences.

At GuestHarbor, we understand that every journey is unique, and we are committed to ensuring that your stay with us is nothing short of exceptional. Whether you're traveling for business or leisure, our goal is to provide you with a comfortable and welcoming environment that feels like home.

As a registered member, you now have access to exclusive features and benefits, including:

- Personalized recommendations based on your travel preferences
- Special deals and discounts on future bookings
- Easy reservation management through your personalized dashboard
- 24/7 customer support to assist you with any questions or concerns

We want your experience with GuestHarbor to be seamless from start to finish. If you have any questions or need assistance, please do not hesitate to contact us at [email protected]

Once again, welcome to GuestHarbor. We look forward to being a part of your travel adventures and helping you create unforgettable memories.

Best regards,

 
GuestHarbor Team`
    );

    res.json(Huser);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//forgot password
app.post("/forgot", async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await HotelUserModel.findOne({ email });
    if (!user) {
      return res.send("User does not exist");
    }

    const token = jwt.sign({ id: user._id }, "jwt-secret-key", {
      expiresIn: "1d",
    });

    sendEmail(
      email,
      "Reset Your GuestHarbor Password",
      `Dear ${name},

You are receiving this email because you have requested to reset your password for your GuestHarbor account. To reset your password, please click on the link below:

http://localhost:3000/restPassword/${user._id}/${token}
If you did not request this password reset, you can safely ignore this email. Your password will not be changed unless you click the link above and create a new password.
If you have any questions or need further assistance, please contact us at [email protected]
Best regards,

GuestHarbor Team`
    );

    res.send("Password reset link sent to your email");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/restPassword/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, "jwt-secret-key", (err, decode) => {
    if (err) {
      return res.json({ Status: "error in token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          HotelUserModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((res) => {
              res.send({ Status: "Success" });
            })
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});
// Admin get endpoint
app.get("/getuser", async (req, res) => {
  try {
    const users = await HotelUserModel.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// deal admin post and get on home page

app.post("/deal", uploads.single("file"), async (req, res) => {
  try {
    const { name, day, price, bed, bath, guest, car, floor, fuel } = req.body;
    const newDeal = await DealModel.create({
      name,
      day,
      price,
      bed,
      bath,
      guest,
      car,
      floor,
      fuel,
      image: req.file.path,
    });
    res.status(201).json(newDeal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/deal", async (req, res) => {
  try {
    const deals = await DealModel.find();
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/homeDealGet", async (req, res) => {
  try {
    const deals = await DealModel.find();
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/deal/:id", async (req, res) => {
  try {
    const { name, day, price, bed, bath, guest, car, floor, fuel } = req.body;
    const updatedDeal = await DealModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        day,
        price,
        bed,
        bath,
        guest,
        car,
        floor,
        fuel,
      },
      { new: true }
    );
    res.json(updatedDeal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deal/:id", async (req, res) => {
  try {
    await DealModel.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  guest admin post and get on home page

app.post("/guest", uploads.single("file"), async (req, res) => {
  try {
    const { name, day, price, bed, bath, guest, car, floor, fuel } = req.body;
    const newGuest = await GuestModel.create({
      name,
      day,
      price,
      bed,
      bath,
      guest,
      car,
      floor,
      fuel,
      image: req.file.path, // Assuming `image` is the field name for the file in your form
    });
    res.status(201).json(newGuest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/guest", async (req, res) => {
  try {
    const deals = await GuestModel.find();
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/homeGuestGet", async (req, res) => {
  try {
    const deals = await GuestModel.find();
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/guest/:id", async (req, res) => {
  try {
    const { name, day, price, bed, bath, guest, car, floor, fuel } = req.body;
    const updatedGuest = await GuestModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        day,
        price,
        bed,
        bath,
        guest,
        car,
        floor,
        fuel,
      },
      { new: true }
    );
    res.json(updatedGuest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/guest/:id", async (req, res) => {
  try {
    await GuestModel.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//event
app.post("/event", uploads.single("file"), async (req, res) => {
  try {
    const { name, day, price, bed, bath, guest, car, floor, fuel } = req.body;
    const newEvent = await EventModel.create({
      name,
      day,
      price,
      bed,
      bath,
      guest,
      car,
      floor,
      fuel,
      image: req.file.path,
    });
    res.status(200).json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/event", async (req, res) => {
  try {
    const event = await EventModel.find();
    res.json(event);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/event/:id", async (req, res) => {
  try {
    await EventModel.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/event/:id", async (req, res) => {
  try {
    const { name, day, price, bed, bath, guest, car, floor, fuel } = req.body;
    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        day,
        price,
        bed,
        bath,
        guest,
        car,
        floor,
        fuel,
      },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//student
app.post("/student", uploads.single("file"), async (req, res) => {
  try {
    const { name, day, price, bed, bath, guest, car, floor, fuel } = req.body;
    const newStudent = await StudentModel.create({
      name,
      day,
      price,
      bed,
      bath,
      guest,
      car,
      floor,
      fuel,
      image: req.file.path,
    });
    res.status(200).json(newStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/student", async (req, res) => {
  try {
    const student = await StudentModel.find();
    res.json(student);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    await StudentModel.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    const { name, day, price, bed, bath, guest, car, floor, fuel } = req.body;
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        day,
        price,
        bed,
        bath,
        guest,
        car,
        floor,
        fuel,
      },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//booking

app.get("/user", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await HotelUserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/booking", async (req, res) => {
  try {
    const { userId, room, bed, guest, date } = req.body;
    const newBooking = await BookingModel.create({
      user: userId,
      room,
      bed,
      guest,
      date,
    });
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/bookRoom", async (req, res) => {
  try {
    const {
      userId,
      name,
      price,
      day,
      floor,
      bed,
      bath,
      guest,
      car,
      fuel,
      UserName,
      UserContact,
      UserEmail,
    } = req.body;
    const order = new OrderModel({
      user: userId,
      name,
      price,
      day,
      floor,
      bed,
      bath,
      guest,
      car,
      fuel,
      UserName,
      UserContact,
      UserEmail,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("Error booking room:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/bookRoom" , async (req,res) =>{
  try {
    const book = await OrderModel.find()
    res.status(200).json(book)
  }
  catch(err){
    console.log(err);
  }
});



app.get("/profileOrder", async (req, res) => {
  try {
    const { name } = req.query; // Use req.query to get query parameters from the URL
    const data = await HotelUserModel.findOne({ name });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
