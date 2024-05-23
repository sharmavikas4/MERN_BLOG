import { useNavigate } from "react-router-dom";
import ButtonAppBar from "./Navbar.jsx";
import "./CreatePost.css";
import { Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import axios from "axios";
function CreatePost(props) {
  const navigate = useNavigate();
  const [isSaving, setisSaving] = useState(false);
  const [file, setFile] = useState(null);
  const [post, setPost] = useState({
    title: "",
    image: "",
    content: "",
  });
  function change(event) {
    const { name, value } = event.target;
    if (name === "image") {
      setFile(event.target.files[0]);
    }
    setPost((prevValue) => {
      return name === "title"
        ? { ...prevValue, title: value }
        : name === "image"
        ? { ...prevValue, image: event.target.files[0].name }
        : { ...prevValue, content: value };
    });
  }
  function save(post) {
    setisSaving(true);
    console.log(`${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/success");
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/success",
        { title: post.title, content: post.content, image: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.message) {
          setisSaving(false);
          setPost({
            title: "",
            image: "",
            content: "",
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <>
      <ButtonAppBar logout={props.logout} />
      <Box sx={{ flexGrow: 1 }}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            save(post);
          }}
          action={`${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/success"}
          method="Post"
          encType="multipart/form-data"
        >
          <h1>
            Create Post <CreateIcon fontSize="large" />
          </h1>
          <input
            onChange={change}
            type="text"
            name="title"
            placeholder="Enter your title"
            value={post.title}
          ></input>
          <textarea
            onChange={change}
            name="content"
            placeholder="Enter your blog post content"
            rows="8"
            column="50"
            value={post.content}
          ></textarea>
          <input
            id="file"
            onChange={change}
            type="file"
            name="image"
            placeholder="Enter your image"
          />
          {isSaving ? (
            <h2>Saving...</h2>
          ) : (
            <button className="create" type="submit">
              Create
            </button>
          )}
        </form>
      </Box>
    </>
  );
}
// value={props.post.image}
export default CreatePost;
