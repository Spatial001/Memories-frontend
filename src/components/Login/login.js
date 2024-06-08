import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'; 
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';

import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";

import { Link } from 'react-router-dom';
import Loginsignupheader from './loginsignupheader';


import { color } from '@mui/system';
import Alert from '@mui/material/Alert';
// import {ReactComponent as ReactLogo} from "../../icons/wave.svg";
import {login} from "../../actions/user"

import {useDispatch} from "react-redux";
import { useSelector } from 'react-redux';

export default function Login() {
  const [type,settype] = useState("password");
  const [password,setpassword] = useState("");
  const [email,setemail] = useState("");
  const [apierror,setapierror] = useState("");
  const [visiblity,setvisiblity] = useState("hidden");
  const dispatch= useDispatch();
  const error = useSelector(state => state.error);
  async  function  loginfn(){
    if(email === "" || password === "" ){
      setvisiblity("visible");
      return ;
 
 
    }
    else{
      const formdata = {
        email,password
      }
      await dispatch(login(formdata));
      
      
      
  
    

    }
 
    
   

  
  }
  function showpassword(){
    type=="password" ? settype("text") : settype("password");

  }
  
  return (
<div className="Login">

  



  
   {/* <ReactLogo/> */}
   <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        />
      
       <TextField id="outlined-basic-2" value={email} onChange={(e)=>{setemail(e.target.value)}}  label="Email" variant="outlined"  InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}  />
       
       <TextField id="outlined-basic-1" label="Password" type={type} value={password} variant="outlined" onChange={(e)=>{setpassword(e.target.value)}}  InputProps={{
        
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          
          endAdornment: (
            
            <InputAdornment position="end">
              {password!="" ? <IconButton onClick={()=>{showpassword()}}>
              <VisibilityIcon />

              </IconButton>:null}
              
             
            </InputAdornment>
          ),
        }} />
       <Button variant="contained" className="Loginbutton"   style={{
       backgroundColor: "skyblue",
       color: "white"
    }
    
    }
    onClick={()=>{loginfn()}} >Login</Button>
       <Link to="/signup" underline="none" style={{
       
       color: "skyblue"
    }}>
        {"New User Register Here"}
      </Link>
      <Alert style={{visibility: visiblity}} severity="error">Fill All the fields</Alert>
      <Alert severity="error" style={{visibility: "hidden"}} id="apierror" >{error.message}</Alert>
  </div>
  )
  
}
