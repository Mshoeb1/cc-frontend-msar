import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

import "./index.css";
class Booking extends Component {
  state = { bookingData: "", isDataFetched: false };

  componentDidMount() {
    this.getBookings();
  }

  getBookings = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const storedUserData = localStorage.getItem("details");
    const { id } = JSON.parse(storedUserData);
    const url = `http://localhost:4000/bookings/${id}`;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Access-Control-Allow-Origin": "http://localhost:4000",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.map((eachItem) => ({
        id: eachItem.id,
        studentName: eachItem.studentName,
        mentorName: eachItem.mentorName,
        timeSlot: eachItem.timeSlot,
      }));
      console.log(updatedData);
      this.setState({
        bookingData: updatedData,
        isDataFetched: true,
      });
    } else {
      this.setState({ isDataFetched: false });
      console.log("failed to fetch data");
    }
  };

  render() {
    const { bookingData, isDataFetched } = this.state;
    return (
      <>
        <Navbar />
        <div className="booking-main-container">
          <h1 className="bookings-heading">Your Bookings</h1>
          {isDataFetched && (
            <ul className="booking-list-container">
              {bookingData.map((eachItem) => (
                <li className="booking-item" key={eachItem.id}>
                  <span className="item">{eachItem.mentorName}</span>
                  <span className="item">{eachItem.timeSlot}</span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/payment">
            <button type="button" className="payment-button">
              Make Payment
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default Booking;
