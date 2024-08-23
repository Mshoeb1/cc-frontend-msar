import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebookF, FaTwitter } from "react-icons/fa";
import "./index.css";

class Register extends Component {
  state = {
    tag: "Mentor",
    name: "",
    password: "",
    email: "",
    availability: "",
    isPremium: false,
    areaOfExperties: "",
    showSubmitError: false,
    errorMsg: "",
    isSignUpIn: false,
  };

  onSelectStudent = () => {
    this.setState({ tag: "student" });
  };

  onSelectMentor = () => {
    this.setState({ tag: "Mentor" });
  };

  onChangeUsername = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  onChangeAvailability = (event) => {
    this.setState({ availability: event.target.value });
  };

  onChangeIsPremium = (event) => {
    this.setState({ isPremium: event.target.value });
  };

  onChangeAreaOfexperties = (event) => {
    this.setState({ areaOfExperties: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    history.replace("/login");
    this.setState({ isSignUpIn: true });
  };

  onSubmitFailure = (error) => {
    this.setState({ showSubmitError: true, error });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const {
      name,
      email,
      password,
      areaOfExperties,
      isPremium,
      availability,
      tag,
    } = this.state;
    console.log(areaOfExperties);
    const userDetails = {
      name,
      email,
      password,
      areaOfExperties,
      isPremium,
      availability,
      tag,
    };
    console.log(areaOfExperties);
    const url = "http://localhost:4000/register";
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:4000/",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    console.log(userDetails);
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      console.log(data);
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data);
    }
  };

  renderEmailField = () => {
    const { email } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    );
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="username-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { name } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={name}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };

  renderAvailabilityField = () => {
    const { availability } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="availability">
          Check for Availability
        </label>
        <input
          type="datetime-local"
          id="availability"
          className="availability-input"
          value={availability}
          onChange={this.onChangeAvailability}
          placeholder="book your slot"
        />
      </>
    );
  };

  renderAreaOfExpertiesField = () => {
    const { areaOfExperties } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="areaOfExperties">
          Area of Experties
        </label>
        <input
          type="text"
          id="areaOfExperties"
          className="username-input-field"
          value={areaOfExperties}
          onChange={this.onChangeAreaOfexperties}
          placeholder="Enter you experties here"
        />
      </>
    );
  };

  renderIsPremiumField = () => {
    const { isPremium } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="isPremium">
          Premium Service
        </label>
        <select
          id="isPremium"
          className="select-input-field"
          value={isPremium}
          onChange={this.onChangeIsPremium}
          placeholder="See Here"
        >
          <option key="option1" value="true" className="optionEl">
            True
          </option>
          <option key="option2" value="false" className="optionEl">
            False
          </option>
        </select>
      </>
    );
  };

  //Modeling Mentor UI

  renderMentorField = () => (
    <form className="form-container" onSubmit={this.submitForm}>
      <h1 className="form-heading">Create your free mentor account</h1>
      <div className="input-container">{this.renderUsernameField()}</div>
      <div className="input-container">{this.renderEmailField()}</div>
      <div className="input-container">{this.renderPasswordField()}</div>
      <div className="input-container">{this.renderAreaOfExpertiesField()}</div>
      <div className="input-container">{this.renderAvailabilityField()}</div>
      <div className="input-container">{this.renderIsPremiumField()}</div>
      <button type="submit" className="login-button">
        SIGN UP
      </button>
    </form>
  );

  //Modeling Student UI

  renderStudentField = () => (
    <form className="form-container" onSubmit={this.submitForm}>
      <h1 className="form-heading">Create your free Student account</h1>
      <div className="input-container">{this.renderUsernameField()}</div>
      <div className="input-container">{this.renderEmailField()}</div>
      <div className="input-container">{this.renderPasswordField()}</div>
      <div className="input-container">{this.renderAreaOfExpertiesField()}</div>
      <div className="input-container">{this.renderAvailabilityField()}</div>
      <button type="submit" className="login-button">
        SIGN UP
      </button>
    </form>
  );

  render() {
    const { showSubmitError, errorMsg, isSignUpIn, tag, areaOfExperties } =
      this.state;
    console.log(areaOfExperties);
    if (isSignUpIn) {
      return <Redirect to="/login" />;
    }

    const textToShow = isSignUpIn
      ? "Don't have Account? Sign-up Here"
      : "Already have an account Login Here";

    return (
      <div className="main-registration-container">
        <div className="register-intro-container">
          <h1 className="main-heading">Career Carve</h1>
          <p className="main-para">
            One stop solution for all your career needs!
          </p>
          <div className="icon-container">
            <p className="follow-para">FOLLOW US</p>
            <a
              href="https://github.com/Mshoeb1"
              target="_blank"
              rel="noreferrer"
              className="icon-colour  home-social-icons"
            >
              <FaGithub className="icon" />
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/mohammad-shoeb-425573bb/"
              target="_blank"
              rel="noreferrer"
              className="icon-colour  home-social-icons"
            >
              <FaLinkedin className="icon" />
            </a>{" "}
            <a
              href="www.twitter.com"
              target="_blank"
              rel="noreferrer"
              className="icon-colour  home-social-icons"
            >
              <FaTwitter className="icon" />
            </a>{" "}
            <a
              href="www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="icon-colour  home-social-icons"
            >
              <FaFacebookF className="icon" />
            </a>
          </div>
        </div>
        <div className="form-outer-container">
          {tag === "Mentor"
            ? this.renderMentorField()
            : this.renderStudentField()}
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <p className="account-para">
            <Link to="/login">
              <span className="account-span">{textToShow}</span>
            </Link>
          </p>
          <div className="account-button-container">
            <button className="account-button" onClick={this.onSelectMentor}>
              Register as Mentor
            </button>
            <button className="account-button" onClick={this.onSelectStudent}>
              Register as Student
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
