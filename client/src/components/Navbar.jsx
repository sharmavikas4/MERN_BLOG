import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HistoryIcon from "@mui/icons-material/History";
export default function ButtonAppBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchData = async function () {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/success", {
          withCredentials: "include",
        })
        .then((res) => {
          setImage(res.data.img);
        });
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }} margin={2}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "white",
          color: "black",
          fontWeight: "bolder",
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img height={"45rem"} width={"45rem"} src="images/blog2.png" alt="icon"></img>
              <span className="title">BlogScape</span>
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/trending");
            }}
          >
            Trending
            <TrendingUpIcon fontSize="large" />
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/new");
            }}
          >
            New
            <HistoryIcon fontSize="large" />
          </Typography>
          <button
            className="createButton"
            onClick={() => {
              navigate("/createpost");
            }}
          >
            Create Blog
            <AddIcon />
          </button>
          <button className="logoutButton" onClick={props.logout}>
            Logout
          </button>
          <Avatar sx={{ width: 48, height: 48 }}>
            <img
              onClick={() => {
                navigate("/dashboard");
              }}
              src={image}
              alt="Profile"
            />
          </Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
