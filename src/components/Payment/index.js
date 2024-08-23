import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";
const Payment = () => (
  <Container className="container">
    <form action="#">
      <Row className="row">
        <Col className="col">
          <h3 className="title">Billing Address</h3>

          <div className="inputBox">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="inputBox">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="inputBox">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              required
            />
          </div>

          <div className="inputBox">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" placeholder="Enter city" required />
          </div>

          <div className="flex">
            <div className="inputBox">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                placeholder="Enter state"
                required
              />
            </div>

            <div className="inputBox">
              <label htmlFor="zip">Zip Code:</label>
              <input type="number" id="zip" placeholder="123 456" required />
            </div>
          </div>
        </Col>
        <Col className="col">
          <h3 className="title">Payment</h3>

          <div className="inputBox">
            <label htmlFor="name">Card Accepted:</label>
            <img
              src="https://res.cloudinary.com/dwekbzmuw/image/upload/v1714560052/Accepted-Cards-AU_yipt86.png"
              alt="credit/debit"
              className="card-image"
            />
          </div>

          <div className="inputBox">
            <label htmlFor="cardName">Name On Card:</label>
            <input
              type="text"
              id="cardName"
              placeholder="Enter card name"
              required
            />
          </div>

          <div className="inputBox">
            <label for="cardNum">Credit Card Number:</label>
            <input
              type="text"
              id="cardNum"
              placeholder="1111-2222-3333-4444"
              maxlength="19"
              required
            />
          </div>

          <div className="inputBox">
            <label htmlFor="">Exp Month:</label>
            <select name="" id="">
              <option value="">Choose month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <div className="flex">
            <div className="inputBox">
              <label for="">Exp Year:</label>
              <select name="" id="">
                <option value="">Choose Year</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>

            <div className="inputBox">
              <label htmlFor="cvv">CVV</label>
              <input type="number" id="cvv" placeholder="1234" required />
            </div>
          </div>
        </Col>
      </Row>

      <input type="submit" value="Proceed to Checkout" className="submit_btn" />
      <Link to="/">
        <input type="submit" Value="Cancel Payment" className="submit_btn" />
      </Link>
    </form>
  </Container>
);

export default Payment;
