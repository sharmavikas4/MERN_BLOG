import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card } from "@mui/material";
import "./Edit.css";
import ButtonAppBar from "./Navbar";
function Edit(props) {
    const {state} = useLocation();
    const [isDeleting,setIsDeleting] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    const [post,setPost] = useState({
        title: state.title,
        content: state.content,
        image:"",
    });
    console.log(state);
    const [file,setFile] = useState(null);
    const navigate = useNavigate();
    function change(event){
        const {name,value} = event.target;
        if (name==="image"){
            setFile(event.target.files[0]);
        }
    setPost((prevValue)=>{
      return name==="title"?{...prevValue,title:value}:(name==="image"?{...prevValue,image: value}:{...prevValue,content: value});
    })
    }
    function del(pid,id){
      setIsDeleting(true);
      axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}`+"/del",{pid: pid,id: id,...post},{withCredentials: true}).then((res)=>{if (res.data.message){
        setIsDeleting(false);
        navigate("/dashboard");
      }});
    }
    function ed(pid,id){
      setIsEditing(true);
      axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}`+"/edit",{pid: pid,id: id,title: post.title,content: post.content,image: file},{headers:{
        'Content-Type': 'multipart/form-data'
      },withCredentials: true}).then((res)=>{if (res.data.message){
        setIsEditing(false);
        navigate("/dashboard");
      }})
    }
  return (
    <>
    <ButtonAppBar logout={props.logout}></ButtonAppBar>
    <div className="edit">
    <Card>
    <form onSubmit={((event)=>{
      event.preventDefault();
      ed(state.pid,state.id);
    })}action={`${import.meta.env.VITE_REACT_APP_SERVER_URL}`+"/edit"} method="Post"encType="multipart/form-data">
    <h1>Edit</h1>
    <input type="text" name="title" onChange={change} value={post.title}></input>
    <textarea rows="8" column="50" name="content" onChange={change} value={post.content}></textarea>
    <label className="label">Select a new image if you want to change image</label>
    <input type="file" onChange={change} name="image" value={post.image} className="file"></input>
    <div>
    {!(isDeleting||isEditing)&&<DeleteIcon onClick={()=>{del(state.pid,state.id)}} fontSize="large"></DeleteIcon>}
    {!(isDeleting||isEditing)&&<button type="submit" className="ed"><EditIcon fontSize="large"></EditIcon></button>}
    {(isDeleting)&&<h2>Deleting...</h2>}
    {(isEditing)&&<h2>Saving changes...</h2>}
    </div>
    </form>
    </Card>
    </div>
    </>
  )
}
export default Edit;