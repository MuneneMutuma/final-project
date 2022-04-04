import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import Typical from 'react-typical';
import SuperwingLogo from '../../images/Superwing1.JPG';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import './styles.css'
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    // dispatch({ type: 'LOGOUT' });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="fixed" color="inherit" style={{ marginBottom: "10px" }}>

        <img component={Link} to="/posts" src={SuperwingLogo} alt="SuperWing" height="60px" />

      { user &&
      <h3 className='fontFamily'>
        <span style={{color:"rgb(25,25,112)" }}> Superwing : </span>making change Everywhere...🖥️
        </h3>}

        {!user &&
        <Typography variant='body1'>
          
          < Typical
       loop={Infinity}
       cursor={false}

       steps={[
         'Welcome To Superwing 🎬',3000,
         'A company Making Change EveryWhere...🏘️',3000,
         'Sign In To Make Your Own Posts',4000,
         'Like And Review Other People\'s Posts',3000,
       ]}
       />
        </Typography>
       }      
      <Toolbar className={classes.toolbar}>

        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            {/* <Typography className={classes.userName} variant="body2">{user?.result.name}</Typography> */}
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          
          <Button component={Link} to="/auth" variant="contained" color="primary" marginLeft="1px">Sign In</Button>
        )}
        {(!user) && <Typography variant="h5">📲 +254-0900-08080-30</Typography>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;