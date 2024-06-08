import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Moment from 'react-moment';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ReportIcon from '@mui/icons-material/Report';
import BookmarkIcon from '@mui/icons-material/Bookmark';


import { Link } from 'react-router-dom';
import * as api from "../../api";

import Loading from '../loading.js';
import { deletePost, savePost, reportPosts } from '../../actions/post';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function Post(props) {
  
  const dispatch = useDispatch();
  async function  savepost() {
    const formData={
      "id": props.data._id
    }

    dispatch(savePost(formData));
    if(savedpostsid?.includes(props.data._id)){
      console.log("true");
      let filteredArray = savedpostsid.filter(item => item !== props.data._id)
      console.log(filteredArray);
      setsavedpostsid(filteredArray);
    }
    else{  
      setsavedpostsid([...savedpostsid,props.data._id]);
    }
  }

  function reportPost() {
    const formData={
      "id": props.data._id
    }
    if (props.data.reportCount && props.data.reportCount >= 5) {
      dispatch(deletePost(formData));
    } else {
      dispatch(reportPosts(formData));
    }
  }


  const [id, setid] = useState();
  const [savedcolor,setsavedcolor] = useState("");


  const [post, setpost] = useState(null);
  const [savedpostsid,setsavedpostsid] = useState([]);
  useEffect(() => {

    setid(localStorage.getItem('id'));

    setpost(props.data);
    setsavedpostsid(JSON.parse(localStorage.getItem('savedposts')));


  }, []);



  const [iconcolor, seticoncolor] = useState("");
  const [vote, setvote] = useState("");

  async function postvote(str) {
    let formdata = {
      voteID: props.data._id
    }

    if (str === "down") {
      const data = await api.downvote(formdata);
      setpost(data.data.post);
    }
    else {
      const data = await api.upvote(formdata);
      setpost(data.data.post);
    }
  }

  if (post != null) {
    return (
      <div className='post-card'>
      <Card sx={{ width: 800, margin: "auto" ,backgroundColor:"#eee"}} >
        <CardHeader
          style={{ textAlign: 'left' }}
          titleTypographyProps={{ variant: 'h7' }}
          subheaderTypographyProps={{ variant: 'h9', fontSize: '0.8rem' }}
          title="Anonymous"
          subheader={(<Moment fromNow>{post?.createdAt}</Moment>)}
        />

        <CardContent>
          <Typography style={{ textAlign: 'left', fontSize: '35px' }} variant="body2" color="text.secondary">
            {post?.title}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          src={`data:image/jpeg;base64, ${post?.image}`}
          style={{ height: "350px" }}
          alt="Paella dish"
        />

        <CardActions disableSpacing style={{ display: "flex", flexDirection: "row" }} >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <IconButton id='upvote' onClick={() => { postvote("up") }} aria-label="Upvote" style={{ zIndex: "2", marginBottom: "-10px" }}   >

              {post?.upvotes?.includes(id) && !post?.downvotes?.includes(id) ? <KeyboardArrowUpIcon
                style={{ color: "dodgerblue" }}
              /> :
                <KeyboardArrowUpIcon
                />}


            </IconButton>
            <Typography style={{ fontSize: "0.9rem", marginLeft: "0.2rem", marginTop: "0.1rem", zIndex: "1" }} >

              {post?.upvotes?.length - post?.downvotes?.length}
            </Typography>
            <IconButton id='downvote' onClick={() => { postvote("down") }} aria-label="Upvote" style={{ zIndex: "2", marginTop: "-10px" }}   >
              {post?.downvotes?.includes(id) && !post?.upvotes?.includes(id) ? <KeyboardArrowDownIcon
                style={{ color: "red" }}
              />
                :
                <KeyboardArrowDownIcon
                />}

            </IconButton>

          </div>
          <div>
            <IconButton>
              <ModeCommentIcon />
              <Typography style={{ fontSize: "0.9rem", marginLeft: "0.2rem", marginTop: "0.1rem", zIndex: "1" }} >
                <Link to={`/${post?._id}`} style={{ textDecoration: "none", color: "grey" }}>
                  Comment
                </Link>
              </Typography>
            </IconButton>

            <IconButton onClick={ () => { reportPost() }}>
              <ReportIcon />
              <Typography style={{ fontSize: "0.9rem", marginLeft: "0.2rem", marginTop: "0.1rem", zIndex: "1" }} >
                Report
              </Typography>
            </IconButton>
            <IconButton onClick={ () => { savepost() }}>
              {savedpostsid?.includes(props.data._id) ? <BookmarkIcon style={{color: "red"}} /> :  <BookmarkIcon />}
             
              <Typography style={{ fontSize: "0.9rem", marginLeft: "0.2rem", marginTop: "0.1rem", zIndex: "1" }} >
                Save
              </Typography>
            </IconButton>

          </div>
        </CardActions>

      </Card>
      </div>
    )
  }
  else {
    return (

      <Loading />

    )
  }
}
