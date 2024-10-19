// import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { Card } from "@mui/material";
import PropTypes from "prop-types";
function Login(props) {
  return (
    <div className="login">
      <Card className="log">
        <h1 className="n">Blog.</h1>
        <p className="welcome">Welcome! Let&apos;s get started!</p>
        <button onClick={props.click} className="auth">
          <img className="google" src="images/google.png"></img> Google{" "}
        </button>
      </Card>
    </div>
  );
}
Login.propTypes = {
  click: PropTypes.func.isRequired, // Validate click prop
};
export default Login;
