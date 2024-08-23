import { Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Bookings from "./components/Bookings";
import Payment from "./components/Payment";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/bookings" component={Bookings} />
      <ProtectedRoute exact path="/payment" component={Payment} />
    </Switch>
  );
}

export default App;
