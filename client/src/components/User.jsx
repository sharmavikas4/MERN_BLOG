import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardMedia, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonAppBar from "./Navbar";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Slide from "./Slide";
import "./User.css";
import PropTypes from 'prop-types';

function User(props) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ post: [] });
  const [image, setImage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      const fetchData = async function () {
        setIsLoading(true);
        try {
          const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/likedPost`, { credentials: "include" });
          if (!res.ok) throw new Error('Network response was not ok');
          const data = await res.json();
          setImage(data.image);
          setData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [location.pathname]);

  console.log(data);

  return (
    <>
      <ButtonAppBar image={image} logout={props.logout} />
      <Slide />
      <Box sx={{ flexGrow: 1 }} className="box">
        <h2 className="blog">My Liked Blogs</h2>
        <hr className="blogline" />

        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <Grid container className="grid" spacing={3}>
            {data?.post?.length > 0 ? (
              data.post.map((p) => {
                if (p.post) { // Check if p.post exists
                  return (
                    <Grid item xs={12} sm={4} key={p.post._id}>
                      <Item>
                        <Card
                          onClick={() => {
                            navigate("/post", {
                              state: {
                                image: { image },
                                name: data.name,
                                post: p.post,
                                id: p.id,
                                l: p.post.like?.n || 0, // Safely access like.n
                              },
                            });
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={p.post.image}
                            alt="Blog Post"
                          />
                          <CardHeader title={p.post.title} />
                        </Card>
                      </Item>
                    </Grid>
                  );
                }
                return null; // Return null if p.post doesn't exist
              })
            ) : (
              <h2 className="blog1">
                No liked blogs; explore the new and trending section.
              </h2>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
}

User.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default User;
