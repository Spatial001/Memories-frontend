import React, { useState } from "react";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";

import Email from "@mui/icons-material/Email";
import { Password, Person, Visibility } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import background from "../../icons/wave.jpg"
import PersonIcon from '@mui/icons-material/Person';
import Loginsignupheader from "./loginsignupheader";
import Alert from '@mui/material/Alert';
import { signup } from "../../actions/user";
import {useDispatch} from "react-redux";
import { useSelector } from 'react-redux';

const Signup = () => {
  const [type, settype] = useState("password");
  const [typeconfirm, settypeconfirm] = useState("password");

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmPass] = useState("");
  const [confirmpasscolor, setconfirmpasscolor] = useState("red");
  const [visiblity,setvisiblity] = useState("hidden");
  const [apierror,setapierror] = useState("");
  const dispatch= useDispatch();
  const error = useSelector(state => state.error);
  const authd = useSelector(state=> state.Auth);
  
  async function signupfn() {
    if(email === "" || password === "" || confirmpass === ""){
      setvisiblity("visible");
      return ;
    }
    else{
      setvisiblity("hidden");
      
      const formdata = {
        email,password
      }
      await dispatch(signup(formdata));
      
    }
    
  }

  function showpassword(str) {
    if (str == "pass") {
      type == "password" ? settype("text") : settype("password");
    }
    else {
      typeconfirm == "password" ? settypeconfirm("text") : settypeconfirm("password");
    }
  }
  function handlechange(evt, str) {
    if (str === "pass") {
     
      setpassword(evt.target.value);
    
      if (confirmpass === evt.target.value) {
        setconfirmpasscolor("green");
      }
      else{
        setconfirmpasscolor("red");
        console.log("not same")
      }
    }
    else {
      setconfirmPass(evt.target.value);
      console.log(password);
      if (evt.target.value === password) {
        setconfirmpasscolor("green");

      }
      else{
        setconfirmpasscolor("red");
        
      }
     
    }



  }


  return (
    <>
      <div className="Login">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          defaultValue=""
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField id="outlined-basic-2" label="Password" type={type} value={password} variant="outlined" onChange={(e) => { handlechange(e, "pass") }} InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {password != "" ? <IconButton onClick={() => { showpassword("pass") }}>
                <VisibilityIcon />
              </IconButton> : null}
            </InputAdornment>
          ),
        }} />
        <TextField sx={{ input: { color: confirmpasscolor } }} id="outlined-basic-1" label="Confirm Password" type={typeconfirm} value={confirmpass} variant="outlined" onChange={(e) => { handlechange(e, "confirmpass") }} InputProps={{

          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),

          endAdornment: (

            <InputAdornment position="end">
              {password != "" ? <IconButton onClick={() => { showpassword("confirmpass") }}>
                <VisibilityIcon />

              </IconButton> : null}


            </InputAdornment>
          ),
        }} />


        <Button variant="contained" style={{
          backgroundColor: "skyblue",
          color: "white"
        }}
          onClick={() => { signupfn() }}
        >Signup

        </Button>
        <Link to="/" underline="none" style={{

          color: "skyblue"
        }}>
          {"Already have an account"}
        </Link>
        <Alert style={{visibility: visiblity}} severity="error">Fill All the fields</Alert>
        <Alert severity="error" style={{visibility: "hidden"}} id="apierror" >{error.message}</Alert>
      </div>
    </>
  );
};

export default Signup;
