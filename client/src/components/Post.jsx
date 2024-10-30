import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import Navbar from "./Navbar.jsx";
import Box from '@mui/material/Box';
import { Card } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Fragment } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
function Post(props) {
    const {state} = useLocation();
    const [isCopied,setIsCopied] = useState(false);
    const [l,setl] = useState();
    const [c,setC] = useState("");
    const [color,setColor] = useState("");
    const [comments,setComments] = useState([]);
    // console.log(comment);
    // console.log(l);
    // console.log(state);
    function newC(event){
      setC(event.target.value);
    }
    useEffect(()=>{
      const fetchData= async function(){
        await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}`+"/success/check",{id: state.id,pid: state.post._id},{withCredentials: true}).then((res)=>{
          setComments(res.data.comment);
          setl(res.data.like);
          console.log(res.data.like);
          if (res.data.message){
             setColor("red");
          }
          else{
            setColor("black");
          }
        })
      };
      fetchData();
    },[state.id,state.post._id]);
    function like(post,id){
      axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}`+"/success/like",{...post,id: id},{withCredentials: true}).then((res)=>{
        console.log(res.data.message);
        if (res.data.message){
          setl((prevValue)=>{
            let n = 0;
            if (res.data.n===-1){
              n = 1;
              setColor("red");
            }
            else {
              n = -1;
              setColor("black");
            }
            let a = prevValue;
            a = a + n
            return a;
          })
          // if (!res.data.n===-1){
          //   setLike((prevValue)=>{
          //     const a = [...prevValue];
          //     a[i] = a[i]+1;
          //     return a;
          //   })
          // }
        }
      });
    }
    function comment(post,id){
      axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}`+'/success/comment',{...post,id: id,comment: c},{withCredentials: true}).then((res)=>{
        setComments((prevValue)=>{
          let newComment = {
            user: res.data.user,
            image: res.data.image,
            comment: c
          }
          if (prevValue&&prevValue.length!==0){
            let a = [...prevValue];
          a.push(newComment);
          setC("");
          return a;
          }
          else{
            let a = [];
            a.push(newComment);
            return a;
          }
        })
      })
    }
    const copy = ()=>{
      navigator.clipboard.writeText(`${import.meta.env.VITE_REACT_APP_CLIENT_URL}`+"/post/" + state.post._id);
      setIsCopied(true);
    }
    console.log(state);
  return (
    <>
    <Navbar logout={props.logout}></Navbar>
    <Box sx={{ flexGrow: 1 }} className="bo">
     <Card className="card">
        <h1 className="title">{state.post?.title?.slice(0,1).toUpperCase() + state.post?.title?.slice(1)}</h1>
        {state.post.image && <img className="postImage" src = {state.post.image} alt = "Post" />}
        <p className="content">{state.post?.content?.split('\n').map((line,i)=>{return <Fragment key={i}>{line}<br/></Fragment>})}</p>
        <h6>Created by <span className="name">{state.name.slice(0,1).toUpperCase() + state.name.slice(1)}</span></h6>
        <button onClick={copy} className="copy" style={{width:isCopied?"10%":"5%",opacity:isCopied?"0.8":"1"}}>{isCopied?"Copied the link":<ContentCopyIcon/>}</button>
        <div><FavoriteIcon className="heart"sx={{color: {color} }} onClick={()=>{
          like(state.post,state.id);
        }}></FavoriteIcon> {l}</div>
        <hr></hr>
        <div className="createC">
        <img className="userImage" src={state.image.image} alt="User"/>
          <input className="comment" onChange={newC} placeholder="Type your comment" value={c}></input>
          <CommentIcon onClick={()=>{
            comment(state.post,state.id);
          }}></CommentIcon>
        </div>
        <div>
          {comments&&(comments.length!==0)&&comments.map((cs,i)=>{
            return <div className="commentName" key={i}>
             <img className="userImage" src={cs.image} alt="user"></img>
              <div className="users">
              <h4 className="username">{cs.user.slice(0,1).toUpperCase() + cs.user.slice(1)}</h4>
              <p className="usercomment">{cs.comment}</p>
              </div>
            </div>
          })}
        </div>
        </Card>
    </Box>
    </>
  )
}
export default Post