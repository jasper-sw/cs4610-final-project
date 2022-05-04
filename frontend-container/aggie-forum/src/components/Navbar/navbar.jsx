import React from 'react';
import { AppBar,Toolbar,Typography,IconButton,Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  var baseURL = process.env.REACT_APP_BASE_URL
	if (baseURL == undefined) {
		baseURL = 'localhost:8000'
	}

  const [userStatus, setUserStatus] = useState(true);
  const navigate = useNavigate();

  const whoami = async () => {
    const res = await axios.get(`http://${baseURL}/whoami/`, {withCredentials: true})
    .then(res => {
      console.log(res.data);
      setUserStatus(res.data)
    })
  }

  const logout = async () => {
    const res = await axios.get(`http://${baseURL}/logout/`, {withCredentials: true})
    .then(res => {
      console.log(res.data);
    })
  }

  useEffect(() => {
    whoami()
  }, []);

  let isLoggedIn = (
    <div style={{display: "flex", flexDirection: "row", marginLeft: "auto", marginRight: "20px"}}>
        <Link to="/login" style={{textDecoration: "none", marginRight: "5px"}}>
            <Button variant='contained' style={{display: "flex", 
                            flexDirection: "row",
                            marginLeft: "auto", 
                            color: "white", backgroundColor: "#3769a5"}} onClick={logout}>
            Log Out
            </Button>
        </Link>
            <Link to='/example-page' style={{textDecoration: "none", marginRight: "5px"}}>
              <Button variant='outlined' style={{display: "flex", 
                              flexDirection: "row",
                              marginLeft: "auto", 
                              color: "white"}}>
              My Account
              </Button>
            </Link>
      </div>
  )

  if (userStatus.isAuthenticated === false) {
    isLoggedIn = (
      <div style={{display: "flex", flexDirection: "row", marginLeft: "auto", marginRight: "20px"}}>
        <Link to="/login" style={{textDecoration: "none", marginRight: "5px"}}>
            <Button variant='contained' style={{display: "flex", 
                            flexDirection: "row",
                            marginLeft: "auto", 
                            color: "white", backgroundColor: "#3769a5"}}>
            Log In
            </Button>
        </Link>
          <Link to="/create-account" style={{textDecoration: "none", marginRight: "5px"}}>
            <Button variant='outlined' style={{display: "flex", 
                                flexDirection: "row",
                                marginLeft: "auto", 
                                marginRight: "auto",
                                color: "white"}}
                >Sign Up</Button>
          </Link>
      </div>
    )
  }

  return (
      <AppBar position="static" style={{backgroundColor: "#002438"}}>
        <Toolbar>
            <IconButton component={Link} to="/" aria-label="home" style={{color: "white", textDecoration: "none"}}>
                <HomeIcon />
            </IconButton>
          <Typography variant="h6" style={{textDecoration: "none"}}>AggieForum</Typography>
          <div style={{display: "flex", flexDirection: "row", marginLeft: "50px", width: "60%"}}>
            <TextField
            id="outlined-basic"
            variant="outlined"
            label="Search"
            size="small"
            fullWidth
            style={{display: "flex", flexDirection: "row", color: "white", backgroundColor: "white", borderRadius: "15px"}}
          />
          <IconButton aria-label="search" style={{color: "white", display: "flex", flexDirection: "row"}}>
              <SearchIcon />
          </IconButton>
          </div>
          {isLoggedIn}
        </Toolbar>
      </AppBar>
    );
  };

  export default Navbar;