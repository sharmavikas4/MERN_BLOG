import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types'; // <-- Import PropTypes
import "./New.css";

function New(props) {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/new`, post, {
        withCredentials: true,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="new-post">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={props.logout}>Logout</button> {/* Logout button */}
    </div>
  );
}

// Add PropTypes validation for 'logout'
New.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default New;
