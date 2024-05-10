import {
  FacebookOutlined as FacebookOutlinedIcon,
  Google as GoogleIcon,
  Instagram,
} from "@mui/icons-material";

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

export default Footer;
