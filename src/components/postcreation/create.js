import React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CardMedia from '@mui/material/CardMedia';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { styled } from '@mui/material/styles';
import { addpost } from '../../actions/post';

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { LegendToggleRounded } from '@mui/icons-material';
import { fetchpost } from "../../actions/post";
import { Typography } from '@mui/material';




export default function Create(props) {
  const [imageupload, setimageupload] = useState(false);
  const [image, setimage] = useState("");
  const [caption, setcaption] = useState("");

  const [base64, setbase64] = useState("");

  const Input = styled('input')({
    display: 'none',
  });
  const dispatch = useDispatch();

  const authdata = useSelector(state => state.user);

  function handleChange(event) {
    console.log(event.target.files[0]);
    setimage(URL.createObjectURL(event.target.files[0]));
    setimageupload(true);
    var reader = new FileReader();
    console.log("next");

    reader.onload = function () {
      var base64String = reader.result.replace("data:", "")
        .replace(/^.+,/, "");
      setbase64(base64String);
    }
    reader.readAsDataURL(event.target.files[0]);
  }


  async function sharepost() {
    console.log(caption, image);
    let formdata = {
      title: caption, coords: props.location, image: base64
    }
    await dispatch(addpost(formdata));
    window.location.reload();
  }
  return <div >
    <Card sx={{ width: "800px" }} style={{ margin: "auto", marginTop: "3rem",padding:"10px 0px" }} variant="outlined">
      <div style={{ margin: "auto" }}>
        <Typography variant='h4' > Create Post</Typography>

      </div>
      <TextareaAutosize
        aria-label="minimum height"
        maxLength={1000}
        value={caption}
        id="post-content"
        placeholder="Write a caption..."
        maxRows={6}
        style={{ maxHeight: "164px", marginTop: "0.5rem", width: "80%", border: "none", outline: "none", resize: "none", lineHeight: "24px", overflow: "default" }}
        onChange={(e) => { setcaption(e.target.value) }}
      />

      <CardContent >
        {!imageupload ?

          <label htmlFor="icon-button-file" style={{ float: "left" }}>
            <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => { handleChange(e) }} />
            
            <Button variant="contained" style={{ float: "left", color: "gray",backgroundColor: "lightgray" }} onClick={() => { props.handler(false) }}>cancel</Button>

            <IconButton color="primary" aria-label="upload picture" component="span">
              <InsertPhotoIcon style={{ color: "#1c4670" }} />
            </IconButton>
          </label>

          :
          <>

            <CardMedia
              component="img"

              image={image}
              alt="Paella dish"
              style={{ marginTop: "1rem" }}
            />
            <Button variant="contained" style={{ float: "left", color: "gray",backgroundColor: "lightgray"  }} onClick={() => { props.handler(false) }}>cancel</Button>

          </>

        }


        <Button variant="contained" style={{ float: "right", color: "white", fontWeight: "600",backgroundColor:"#1c4670" }} onClick={() => { sharepost() }}>Post</Button>



      </CardContent>


    </Card>



  </div>;
}
