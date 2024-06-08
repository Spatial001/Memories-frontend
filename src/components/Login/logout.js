import React from 'react';

import Button from "@mui/material/Button";

export default function Logout() {
  return <div>
      <Button variant="contained" style={{
          backgroundColor: "skyblue",
          color: "white"
        }}
        onClick={()=>{ localStorage.removeItem('token');
       
    }}
        >Logout
        
        </Button>
  </div>;
}
