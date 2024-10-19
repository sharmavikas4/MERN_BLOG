import { StrictMode, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import Login from "./Login.jsx";
import CreatePost from "./CreatePost"; // Import CreatePost
import Post from "./Post"; // Import Post
import Dashboard from "./Dashboard";
import Edit from "./Edit.jsx";
import Blog from "./Blog.jsx";
import Trending from "./Trending.jsx";
import New from "./New.jsx";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/success`, {
        credentials: "include",
      });
      const data = await res.json();
      setLogin(data.message);
    };
    fetchData();
  }, []);

  function click() {
    window.open(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/google`, "_self");
  }

  async function logout() {
    await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/logout`, {
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        setLogin(data.message);
      });
    });
  }

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={login ? <User logout={logout} /> : <Login click={click} />}
          />
          <Route
            path="/createpost"
            element={login ? <CreatePost logout={logout} /> : <Login click={click} />}
          />
          <Route path="/login" element={<Login click={click} />} />
          <Route path="/post" element={login ? <Post logout={logout} /> : <Login click={click} />} />
          <Route path="/dashboard" element={login ? <Dashboard logout={logout} /> : <Login click={click} />} />
          <Route path="/edit" element={login ? <Edit logout={logout} /> : <Login click={click} />} />
          <Route path="/trending" element={login ? <Trending logout={logout} /> : <Login click={click} />} />
          <Route path="/new" element={login ? <New logout={logout} /> : <Login click={click} />} />
          <Route path="/post/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
