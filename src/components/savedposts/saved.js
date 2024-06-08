import React from 'react'
import { useState, useEffect } from 'react';
import * as api from "../../api";
import Postcard from './postcard';
import { fetchpost } from "../../actions/post";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import Post from '../Homepage/post';



export default function Saved() {
  const [savedPosts,setsavedPosts] = useState([]);
  const savedposts = JSON.parse(localStorage.getItem('savedposts'));
  console.log(savedposts);
 
 
  useEffect(async () => {
    const formdata ={
      "postIDS" : savedposts
    }
    const result = await api.getPosts(formdata);
    console.log(result);
    setsavedPosts(result.data.posts);
  }, [])

  return (
    <div >
      {savedPosts?.map((posts) => {
        return (
          <Post data={posts} />
        )
      })}

    </div>
  )


}
