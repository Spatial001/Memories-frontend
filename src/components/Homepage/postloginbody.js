import React from 'react';
import { useState } from 'react';
import Post from './post';
import { useSelector } from 'react-redux';
import Loading from "../loading"
import InfiniteScroll from 'react-infinite-scroll-component';
import {useDispatch} from 'react-redux'
import {fetchpost} from "../../actions/post"
import CircularProgress from '@mui/material/CircularProgress';


export default function Postloginbody({coords}) {
  const dispatch = useDispatch()
  var postsnear = [];
  postsnear = useSelector(state => state.posts);
  const hasmore = useSelector(state=>state.posts.hasMore);
  const fetchMoreData =  () =>{
    const formdata={"coords":coords,"skipTo":postsnear.posts.length}
    if(coords.length>0)
     dispatch(fetchpost(formdata))
  }
  if (postsnear !== null) {
    return (
      
      <InfiniteScroll
      dataLength={postsnear.posts.length}
      next={fetchMoreData}
      // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
      inverse={false} //
      hasMore={hasmore}
      loader={<Loading/>}
      scrollableTarget="scrollableDiv"
    >
      <div style={{ marginTop: "4rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
        {postsnear.posts.map((post) => {
          return (<Post data={post} key={post._id} />);
        })}
      </div> </InfiniteScroll>)
     
  }else {
    return (
      <Loading />
    )
  }


}
