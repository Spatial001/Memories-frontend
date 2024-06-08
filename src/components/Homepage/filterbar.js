import React from 'react';

import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Typography } from '@mui/material';
import Create from '../postcreation/create';
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { enablecreatepost } from "../../actions/user"





export default function Filterbar(props) {
  function createposthandle(val) {
    setcreatepost(val);
  }

  const [createpost, setcreatepost] = useState(true);
  const dispatch = useDispatch();
  const general = useSelector(state => state.general);
  return (
    <>
      {createpost ? <Create location={props.position} handler={createposthandle} /> : null}

    </>
  );
}
