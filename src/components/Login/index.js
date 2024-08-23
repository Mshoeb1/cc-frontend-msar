import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect, Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebookF, FaTwitter } from "react-icons/fa";
import "./index.css";

class Register extends Component {
  state = {
    tag: "Mentor",
    password: "",
    email: "",
    showSubmitError: false,
    errorMsg: "",
    isLoggedIn: false,
  };

  onSelectMentor = () => {
    this.setState({ tag: "Mentor" });
  };

  onSelectStudent = () => {
    this.setState({ tag: "Student" });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onSubmitSuccess = (data) => {
    const { tag } = this.state;
    const id = data.id;
    const { history } = this.props;
    const user = { tag: `${tag}`, id: id };

    Cookies.set("jwt_token", data.jwtToken, {
      expires: 30,
    });
    this.setState({ isSignUpIn: true });
    localStorage.setItem("details", JSON.stringify(user));
    history.replace("/");
  };

  onSubmitFailure = (error) => {
    this.setState({ showSubmitError: true, error });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { email, password, tag } = this.state;
    const userDetails = {
      email,
      password,
      tag,
    };
    const url = "http://localhost:4000/login";
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
      this.onSubmitSuccess(data);
    } else {
      this.onSubmitFailure(data.error);
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

  //Modeling Mentor UI

  renderMentorField = () => (
    <form className="form-container" onSubmit={this.submitForm}>
      <h1 className="form-heading">Login as Mentor</h1>
      <div className="input-container">{this.renderEmailField()}</div>
      <div className="input-container">{this.renderPasswordField()}</div>
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  );

  //Modeling Student UI

  renderStudentField = () => (
    <form className="form-container" onSubmit={this.submitForm}>
      <h1 className="form-heading">Login as Student</h1>
      <div className="input-container">{this.renderEmailField()}</div>
      <div className="input-container">{this.renderPasswordField()}</div>
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  );

  render() {
    const { showSubmitError, errorMsg, isLoggedIn, tag } = this.state;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    const textToShow = isLoggedIn
      ? "Already have an account Login Here"
      : "Don't have Account? Sign-up Here";

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
            <Link to="/register">
              <span className="account-span">{textToShow}</span>
            </Link>
          </p>
          <div className="account-button-container">
            <button className="account-button" onClick={this.onSelectMentor}>
              Login as Mentor
            </button>
            <button className="account-button" onClick={this.onSelectStudent}>
              Login as Student
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
