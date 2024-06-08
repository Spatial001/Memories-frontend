
import Loginsignupheader from '../Login/loginsignupheader';
import Create from '../postcreation/create';
import Login from '../Login/login';

import Post from './post';
import Navbar from '../Navbar/navbar';
import Postlogin from './postlogin';
import { useDispatch } from "react-redux";
import { fetchpost } from "../../actions/post";
import { useEffect } from 'react';


export default function Homepage(props) {
  const dispatch = useDispatch();
  useEffect(async () => {

    const coords = props.coord;
    const formdata = {
      "coords": coords,
    }

    if (props.coord.length > 0) {
      await dispatch(fetchpost(formdata));
    }
   
  }, [props]);

  return (<div>
    {props.usertoken !== 'null' ? <Postlogin location={props.coord} /> : <Login />}

  </div>);
}
