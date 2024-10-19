import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { Box,Card } from "@mui/material";
import { Fragment } from "react";
import AppBar from '@mui/material/AppBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import './Blog.css';
function Blog() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [post,setPost] = useState({
    name: "",
    post: {
      title:"",
      content:"",
      image:"",
      like:{
        n: 0
      },
      comments:[
        {
          comment: "",
          user: "",
          image: ""
        }
      ]
    }
  });
  const [isLoading,setIsLoading] = useState(false);
    useEffect(()=>{
    setIsLoading(true);
    const fetchData = ()=>{
      axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}`+"/blog",{id}).then((res)=>{
        setPost(res.data.post);
        setIsLoading(false);
      }).catch((err)=>{
        console.log(err.message);
      })
    }
    fetchData();
  },[]);
  return (
    <>
    <Box sx={{ flexGrow: 1 }} margin={2}>
      <AppBar position="static" style={{backgroundColor:"white",color:"black",fontWeight:"bolder"}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} onClick={()=>{
            navigate("/");
          }}>
            Blog.
          </Typography>
          <button className='createButton'  onClick={()=>{
            navigate("/createpost");
          }}>Create Blog<AddIcon/></button>
        </Toolbar>
      </AppBar>
    </Box>
    {isLoading?
    <h4 className="h4">Loading...</h4>:
    <Box sx={{ flexGrow: 1 }} className="bo">
     <Card className="card">
        <h1 className="title">{post?.post?.title?.slice(0,1).toUpperCase() + post?.post?.title?.slice(1)}</h1>
        <img className="postImage" src = {post?.post?.image} alt = "Post" />
        <p className="content">{post?.post?.content?.split('\n').map((line,i)=>{return <Fragment key={i}>{line}<br/></Fragment>})}</p>
        <div><FavoriteIcon className="heart"></FavoriteIcon> {post?.post?.like?.n}</div>
        <h6>Created by <span className="name">{post?.name?.slice(0,1).toUpperCase() + post?.name?.slice(1)}</span></h6>
        <hr></hr>
        <div>
          {post?.post?.comments&&(post?.post?.comments.length!==0)&&post?.post?.comments.map((cs,i)=>{
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
    </Box>}
    </>
  )
}
export default Blog