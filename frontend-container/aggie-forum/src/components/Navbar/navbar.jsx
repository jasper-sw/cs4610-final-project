import React from 'react';
import { AppBar,Toolbar,Typography,IconButton,Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
      <AppBar position="static" style={{backgroundColor: "#002438"}}>
        <Toolbar>
            <IconButton component={Link} to="/" aria-label="home" style={{color: "white", textDecoration: "none"}}>
                <HomeIcon />
            </IconButton>
          <Typography variant="h6" style={{textDecoration: "none"}}>aggieForum</Typography>
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
          <div style={{display: "flex", flexDirection: "row", marginLeft: "auto", marginRight: "20px"}}>
          <Link to="/create-account" style={{textDecoration: "none"}}>
            <Button style={{display: "flex", 
                                flexDirection: "row",
                                marginLeft: "auto", 
                                color: "white"}}
                >Signup</Button>
          </Link>
          <Link to="/login" style={{textDecoration: "none"}}>
              <Button style={{display: "flex", 
                              flexDirection: "row",
                              marginLeft: "auto", 
                              color: "white"}}
              >Sign in</Button>
          </Link>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  export default Navbar;