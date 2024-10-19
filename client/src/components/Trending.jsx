import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { Card, CardHeader, CardMedia, Grid } from "@mui/material";
import "./Trending.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Category from "./Category";
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = () => {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/trending", {
          withCredentials: true,
        })
        .then((res) => {
          setPost(res.data.post);
          setFilteredPosts(res.data.post);
          setImage(res.data.image);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterPosts();
}, [selectedCategory]);

const filterPosts = () => {
    let filtered = post;
    if (selectedCategory !== 'All') {
        filtered = filtered.filter(p => p.post.category === selectedCategory);
    }
    setFilteredPosts(filtered);
  };

  return (
    <>
      <Navbar logout={props.logout} />
      {isLoading ? (
        <h4 className="h4">Loading...</h4>
      ) : (
        <Box sx={{ flexGrow: 1 }} className="box">
          <Category onCategoryChange={setSelectedCategory}/>
          <Grid container className="grid" spacing={3}>
            {filteredPosts.length!=0?
              filteredPosts.map((p) => {
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
              }):
              <div className="nocategory"><p>Coming Soon....</p></div>}
          </Grid>
        </Box>
      )}
    </>
  );
};
export default Trending;
