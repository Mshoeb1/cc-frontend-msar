import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";

class Home extends Component {
  state = {
    mentors: "",
    data: [],
    isMentorFetched: true,
  };

  selectMentor = (item) => {
    this.setState({ mentors: item });
  };

  //Fethching all available mentors

  fetchMentor = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = "http://localhost:4000/mentors";
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
        name: eachItem.name,
        areaOfExperties: eachItem.areasOfExpertise,
        availability: eachItem.availability,
        isPremium: eachItem.isPremium,
      }));
      console.log(updatedData);
      this.setState({
        data: updatedData,
        isMentorFetched: false,
      });
    } else {
      this.setState({
        isMentorFetched: true,
      });
    }
  };

  //Creating appointment with vendor

  createBookings = async () => {
    const { mentors } = this.state;
    const storedUserData = localStorage.getItem("details");
    const { id } = JSON.parse(storedUserData);
    let studentId = id;
    const mentorId = mentors.id;
    const mentorName = mentors.name;
    const timeSlot = mentors.availability;
    let jwtToken = Cookies.get("jwt_token");
    const details = { studentId, mentorId, mentorName, jwtToken, timeSlot };
    const url = "http://localhost:4000/bookings";
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:4000/",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(details),
    };
    console.log(details);
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      console.log("data sent to db");
      console.log(data);
    } else {
      console.log("unable to send data");
    }
  };

  renderMentorList = () => {
    const { data, isMentorFetched } = this.state;
    return (
      <div className="mentors-main-container">
        <h1 className="list-heading">Student Screen</h1>
        {!isMentorFetched && (
          <ul className="mentor-list-container">
            <div className="name-container">
              <span className="name1">Mentor Name</span>{" "}
              <span className="name1">Experties</span>
              <span className="name1">Availability</span>
              <span className="name1">Premium Service</span>
            </div>
            {data.map((item) => (
              <li
                key={item.id}
                className="mentor-list-item"
                onClick={() => this.selectMentor(item)}
              >
                <span className="name">{item.name}</span>{" "}
                <span className="name">{item.areaOfExperties}</span>
                <span className="name">{item.availability}</span>
                <span className="name">{item.isPremium}</span>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className="student-button"
          onClick={this.fetchMentor}
        >
          Fetch Mentors
        </button>
        <Link to="/bookings" className="bookings">
          <button
            type="button"
            className="create-button"
            onClick={this.createBookings}
            disabled={isMentorFetched}
          >
            Book now
          </button>
        </Link>
      </div>
    );
  };

  renderMentorView = () => (
    <div className="mentor-container">
      <h1 className="mentor-heading">Mentor Screen</h1>
      <Link to="/bookings">
        <button type="button" className="mentor-button">
          See your bookings
        </button>
      </Link>
    </div>
  );

  render() {
    const { mentors } = this.state;
    const storedUserData = localStorage.getItem("details");
    const { tag } = JSON.parse(storedUserData);
    console.log(mentors);
    return (
      <>
        <Navbar />
        <div className="home-main-container">
          {tag === "Student"
            ? this.renderMentorList()
            : this.renderMentorView()}
        </div>
      </>
    );
  }
}

export default Home;
