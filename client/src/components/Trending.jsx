import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { Card, CardHeader, CardMedia, Grid } from "@mui/material";
import "./Trending.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types'; // Import PropTypes

const Trending = (props) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();
  useEffect(() => {
    setIsLoading(true);
    const fetchData = () => {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/trending", {
          withCredentials: true,
        })
        .then((res) => {
          setPost(res.data.post);
          console.log(res.data.post);
          setImage(res.data.image);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar logout={props.logout} />
      {isLoading ? (
        <h4 className="h4">Loading...</h4>
      ) : (
        <Box sx={{ flexGrow: 1 }} className="box">
          <h2 className="blog">Trending Blogs.</h2>
          <hr className="hr"></hr>
          <Grid container className="grid" spacing={3}>
            {post &&
              post.map((p) => {
                return (
                  <Grid item xs={12} sm={4} key={p.post.id}>
                    <Item>
                      <Card
                        key={p.CardMedia}
                        onClick={() => {
                          navigate("/post", {
                            state: {
                              image: { image },
                              name: p.name,
                              post: p.post,
                              id: p.id,
                              l: p.post.like.n,
                            },
                          });
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={p.post.image}
                          alt="Chevrolet"
                        />
                        <CardHeader title={p.post.title} />
                      </Card>
                    </Item>
                  </Grid>
                );
              })}
            ;
          </Grid>
        </Box>
      )}
    </>
  );
};
Trending.propTypes = {
  logout: PropTypes.func.isRequired, // Validate logout prop
};
export default Trending;
