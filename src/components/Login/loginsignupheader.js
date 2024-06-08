import React from 'react';
import './login.css'; 
import PersonIcon from '@mui/icons-material/Person';
import background from "../../icons/wave.jpg"

export default function Loginsignupheader() {
  return (
    <div className="loginheader" style={{backgroundImage:`url(${background})`,backgroundSize: "cover"}} >

    <h1>Welcome To<br></br>Memories</h1>
    <PersonIcon
    className="personicon"
    
     />
    
    
    </div>
  );
}
