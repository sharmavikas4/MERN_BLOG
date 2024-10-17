import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { Card } from "@mui/material";
function Login(props) {
  return (
    <div className="login">
      <Card className="log">
        <h1 className="n">Blogscape</h1>
        <p className="welcome">Welcome! Let's get started!</p>
        <button onClick={props.click} className="auth">
          <img className="google" src="images/google.png"></img> Google{" "}
        </button>
      </Card>
    </div>
  );
}
export default Login;
