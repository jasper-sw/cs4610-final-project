import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from "../../components/Navbar/navbar";
import { TextField } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { Fab } from '@mui/material';
import { Typography } from '@mui/material';


function LoginPage() {
  var baseURL = process.env.REACT_APP_BASE_URL
	if (baseURL == undefined) {
		baseURL = 'localhost:8000'
	}
  const [csrfToken, setCsrfToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'

  useEffect(() => {
    getCsrf();
  }, []);

  const onSubmit = (e, data) => {
    e.preventDefault();
    sendCreds();
    console.log(username, password);
  }

  const getCsrf = async () => {
    const res = await axios.get(`http://${baseURL}/csrf/`)
    .then(res => {
      console.log(res.data);
    })
  }

  const whoami = async () => {
    const res = await axios.get(`http://${baseURL}/whoami/`, {withCredentials: true})
    .then(res => {
      console.log(res.data);
    })
  }

  const logout = async () => {
    const res = await axios.get(`http://${baseURL}/logout/`, {withCredentials: true})
    .then(res => {
      console.log(res.data);
    })
  }

  const sendCreds = async () => {
    const res = await axios.post(`http://${baseURL}/login/`, {
      username: username,
      password: password}, {
        withCredentials: true,
        headers: {
          'content-type': 'application/json',
          //'X-CSRFToken': `${csrfToken}`,
          //'Cookie': `csrftoken=${csrfToken}`
        }
      })
    .then(res => {
      console.log(res.data);
    })
    navigate('/')
  }



  return (
    <div style={{backgroundColor: "#dddddb", minHeight: "100vh"}}>
		<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Navbar />
			<div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white", borderRadius: "10px", minWidth: "50%", margin: "30px"}}>
        <Typography variant="h4" style={{textDecoration: "none", marginTop: "10px", marginBottom: "20px"}}>Log In</Typography>
        <form onSubmit={onSubmit}>
          <TextField onChange={(e) => setUsername(e.target.value)} id="filled-basic" label="Username" variant="filled" style={{ display: "flex", marginBottom: "20px", }}/>
          <TextField onChange={(e) => setPassword(e.target.value)} id="filled-basic" label="Password" variant="filled" style={{ display: "flex", marginBottom: "20px" }}/>
          <div style={{justifyContent: "center"}}>
            <Fab value="Submit" type="submit"  variant="extended" size="medium" color="primary" aria-label="add" style={{ width: "100%", backgroundColor: "blue"}}>Log in</Fab>
          </div>
        </form>

        <div style={{ display: "flex" }}>
          <p>New to AggieForum?</p>
          <Link to="/create-account" style={{display: "flex", textDecoration: "none"}}>
              <Button style={{display: "flex", color: "blue"}} variant="text">Sign Up</Button>
          </Link>
        </div>

			</div>
		</div>
	</div>
  )

}

export default LoginPage;
