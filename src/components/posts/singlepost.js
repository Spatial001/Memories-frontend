import React from 'react';
import { TextField, Button } from '@mui/material';
import Post from '../Homepage/post';
import { createComment, fetchComments } from "../../actions/post"

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Commentthread from './commentthread';
import * as api from "../../api"
import Comment from '../comments/comment';





export default function Singlepost() {
  const [comment, setcomment] = useState("");
  const [postcomments, setpostcomments] = useState([]);
  const [post, setpost] = useState(null);
  let { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);

  // checks if posts is in redux
  let curPost
  if (posts.length > 0) curPost = posts.filter((p) => p._id === id)
  if (curPost) curPost = curPost[0]
  const dispatch = useDispatch();
  //-----//

  function handlechange(evt) {
    setcomment(evt.target.value);
  }
  async function postcomment() {
    const formdata = {
      msg: comment,
      postID: id
    }
    const { data } = await api.createcomment(formdata);
    setcomment("")
    setpostcomments([...postcomments, data.comment]);
  }
  useEffect(async () => {
    let formdata = {
      postIDS: [id]
    }

    var formdata1
    if (curPost) {
      await setpost(curPost);
      formdata1 = {
        comments: curPost.comments
      }
    }
    else {
      var data = await api.getPosts(formdata);
      await setpost(data.data.posts[0]);
      formdata1 = {
        comments: data.data.posts[0].comments
      }
    }

    if (data) {
      if (data.data.posts[0].comments.length > 0) {
        const data1 = await api.fetchcomments(formdata1);

        setpostcomments(data1.data.comments);
      }
    }
    else {
      if (curPost.comments.length > 0) {
        const data1 = await api.fetchcomments(formdata1);

        setpostcomments(data1.data.comments);
      }
    }

  }, []);



  return <div className='postContainer' >
    {post != null ? <Post data={post} /> : null}
    <div>
      <div style={{ display: "flex", margin: "auto", justifyContent: "center" }}>
        <div className='commentbox' >
          <TextField
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows={4}
            style={{ width: "100%", margin: "5px 0px 10px 0px", borderColor: "black" }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#c4c4c4",
                }
              },
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "#c4c4c4"
                }
              },
              "& label.Mui-focused": {
                color: "gray",
              }
            }}
            value={comment}
            onChange={(e) => { handlechange(e) }}
          />
          <div className='replyBTNS'>
            {/* <Button variant="text" onClick={() => { setReplyOpen(!replyOpen) }}>Cancel</Button> */}
            <Button variant="text" onClick={() => { postcomment() }}>Post</Button>

          </div>
        </div>
        {/* <TextField id="standard-basic" label="Add a comment..." value={comment} variant="standard" style={{ width: "530px" }} onChange={(e) => { handlechange(e) }} />

        <Button color="primary" onClick={() => { postcomment() }}>Post</Button> */}

      </div>
      <div >
        {postcomments?.map((comment) => {
          return (
            <Comment cmt={comment} classname="comment1" replyDepth={1} replies={comment.comments.length > 0} key={comment._id} />
          )
        })}
      </div>

    </div>

  </div>;
}
