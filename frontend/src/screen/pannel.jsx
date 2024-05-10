import "./admin.css";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";


import Deal from './Deal'
import Guest from "./Guest";
import Event from "./Event";
import  Student from "./Student";
import Order from "./Order";



function Pannel() {
  const [page, setPage] = useState("deal");
  const handlePage = useCallback((page) => {
    setPage(page);
  }, []);

  return (
    <div className="dashboardAdmin">
      <div className="sidebarAdmin">
        <div className="admin">
          <div className="adminlist" onClick={() => handlePage("user")}>
            User
          </div>
          <div className="adminlist" onClick={() => handlePage("deal")}>
            Deal
          </div>
          <div className="adminlist" onClick={() => handlePage("guest")}>
            Guest
          </div>
          <div className="adminlist" onClick={() => handlePage("event")}>
            Event
          </div>
          <div className="adminlist" onClick={() => handlePage("student")}>
            Student
          </div>
          <div className="adminlist" onClick={() => handlePage("order")}>
            Order
          </div>
        </div>
      </div>
      <div className="admincall">
        {page === "user" && <User />}
        {page === "deal" && <Deal />}
        {page === "guest" && <Guest />}
        {page === "event" && <Event />}
        {page === "student" && <Student />}
        {page === "order" && < Order />}
      </div>
    </div>
  );
}
export default Pannel;

function User() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getuser")
      .then((user) => {
        setUser(user.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="userComponent">
      <h1>User Page</h1>
      
      <table className="userTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            
          </tr>
        </thead>
        <tbody>
          {user.map((userData) => (
            <tr key={userData.id}>
              <td>{userData.name}</td>
              <td>{userData.email}</td>
              <td>{userData.contact}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

 
