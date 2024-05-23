import { StrictMode, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import User from "./User";
import Login from "./Login.jsx";
import CreatePost from "./CreatePost";
import Post from "./Post";
import axios from "axios";
import Dashboard from "./Dashboard";
import Edit from "./Edit.jsx";
import Blog from "./Blog.jsx";
import Trending from "./Trending.jsx";
import New from "./New.jsx";
function App() {
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
        ? { ...prevValue, image: value }
        : { ...prevValue, content: value };
    });
  }
  const [login, setLogin] = useState(false);
  // const [data,setData] = useState([]);
  // const [li,setLike] = useState([]);
  useEffect(() => {
    console.log(`${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/success");
    const fetchData = async function () {
      await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/success", {
        credentials: "include",
      }).then((res) => {
        res.json().then((data) => {
          console.log(data.message);
          setLogin(data.message);
        });
      });
    };
    fetchData();
    console.log(login);
  }, []);

  function click() {
    // const username = name;
    // const userage = age;
    // const user = {
    //   name: username,
    //   age: userage
    // }
    // axios.post('http://localhost:3000/',{user}).then((res)=>{console.log(res)});
    // axios.get('http://localhost:3000/auth/google').then((res)=>{res.json().then((data)=>{console.log(data.message)})});
    console.log(`${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/auth/google");
    window.open(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/auth/google",
      "_self"
    );
  }
  // async function login(){
  //   await fetch("http://localhost:3000/success",{credentials: "include"}).then((res)=>{res.json().then((data)=>{setMessage(data.message)})});
  // }
  async function logout() {
    console.log("logout clicked");
    await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/logout", {
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        setLogin(data.message);
      });
    });
  }
  // function change(event){
  //   const data = event.target.value;
  //   const name = event.target.name;
  //   if (name==='age'){
  //     setAge(data);
  //   }
  //   else{
  //     setName(data);
  //   }
  // }
  // function save(post) {
  //   // const formData = new FormData();
  //   // formData.append("title",post.title);
  //   // formData.append("content",post.content);
  //   // formData.append("image",file);
  //   // console.log(formData);
  //   axios
  //     .post(
  //       `${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/success",
  //       { title: post.title, content: post.content, image: file },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.message){
  //         setPost({
  //           title: "",
  //           image: "",
  //           content: "",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // function like(post,id,i){
  //   axios.post('http://localhost:3000/success/like',{...post,id: id},{withCredentials: true}).then((res)=>{
  //     console.log(res.data.message);
  //     if (res.data.message){
  //       setLike((prevValue)=>{
  //         let n = 0;
  //         if (res.data.n!==-1){
  //           n = 1;
  //         }
  //         else {
  //           n = -1;
  //         }
  //         const a = [...prevValue];
  //         a[i] = a[i]+n;
  //         return a;
  //       })
  //       // if (!res.data.n===-1){
  //       //   setLike((prevValue)=>{
  //       //     const a = [...prevValue];
  //       //     a[i] = a[i]+1;
  //       //     return a;
  //       //   })
  //       // }
  //     }
  //   });
  //   console.log(li);
  // }
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={login ? <User logout={logout} /> : <Login click={click} />}
          ></Route>
          <Route
            path="/createpost"
            element={
              login ? (
                <CreatePost
                  logout={logout}
                />
              ) : (
                <Login click={click} />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<Login logout={logout} click={click} />}
          ></Route>
          <Route
            path="/post"
            element={login ? <Post logout={logout} /> : <Login click={click} />}
          ></Route>
          <Route
            path="/dashboard"
            element={
              login ? <Dashboard logout={logout} /> : <Login click={click} />
            }
          >
          </Route>
          <Route
            path="/edit"
            element={login ? <Edit logout={logout} /> : <Login click={click} />}
          ></Route>
          <Route
            path="/trending"
            element={login ? <Trending logout={logout} /> : <Login click={click} />}
          ></Route>
          <Route
            path="/new"
            element={login ? <New logout={logout} /> : <Login click={click} />}
          ></Route>
          <Route path="/post/:id" element={<Blog/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
export default App;
