import React from 'react';
import Create from '../postcreation/create';

import Navbar from '../Navbar/navbar';
import Postloginbody from './postloginbody';
import Filterbar from './filterbar';
import Singlepost from '../posts/singlepost';


export default function Postlogin(props) {
  return <div>
    <Navbar />
    <Filterbar position={props.location} />
    <Postloginbody coords={props.location}/>
  </div>;
}
