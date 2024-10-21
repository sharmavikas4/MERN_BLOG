import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

function ButtonAppBar({ image, logout }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
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
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

ButtonAppBar.propTypes = {
  image: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default ButtonAppBar;
