import { useNavigate } from "react-router-dom";
import ButtonAppBar from "./Navbar.jsx";
import "./CreatePost.css";
import { Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
function CreatePost(props) {
  const navigate = useNavigate();
  const [isSaving, setisSaving] = useState(false);
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [post, setPost] = useState({
    title: "",
    image: "",
    content: "",
  });
  useEffect(() => {
    const fetchRole = async () => {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/role`, { withCredentials: "include" });
      setRole(res.data.role);
    };
    fetchRole();
  }, []);

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
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/createpost",
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
  // Redirect if the user is not admin or editor
  if (role !== "admin" && role !== "editor") {
    return <h1>You are not authorized to create a post</h1>;
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
          encType="multipart/form-data"
        >
          <div className="create">
            <h2>Create Your Blog</h2>
            <label>Title</label>
            <input
              className="bloginput"
              type="text"
              name="title"
              value={post.title}
              onChange={change}
              required
            />
            <label>Image</label>
            <input
              className="bloginput"
              type="file"
              name="image"
              onChange={change}
              required
            />
            <label>Content</label>
            <textarea
              className="blogtextarea"
              name="content"
              value={post.content}
              onChange={change}
              required
            />
            <button type="submit" className="createblogbutton">
              {isSaving ? "Saving..." : "Create"}
              <CreateIcon />
            </button>
          </div>
        </form>
      </Box>
    </>
  );
}
CreatePost.propTypes = {
  logout: PropTypes.func.isRequired,
};
export default CreatePost;