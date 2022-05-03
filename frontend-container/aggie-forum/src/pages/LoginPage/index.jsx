import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from "../../components/Navbar/navbar";
import { TextField } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormControl } from '@mui/material';


function LoginPage() {
  const [csrfToken, setCsrfToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
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
    const res = await axios.get(`http://localhost:8000/csrf/`)
    .then(res => {
      console.log(res.data);
    })
  }

  const whoami = async () => {
    const res = await axios.get(`http://localhost:8000/whoami/`, {withCredentials: true})
    .then(res => {
      console.log(res.data);
    })
  }

  const logout = async () => {
    const res = await axios.get(`http://localhost:8000/logout/`, {withCredentials: true})
    .then(res => {
      console.log(res.data);
    })
  }

  const sendCreds = async () => {
    const res = await axios.post(`http://localhost:8000/login/`, {
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
  }



  return (
    <div style={{backgroundColor: "#dddddb", minHeight: "100vh"}}>
		<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Navbar />
			<div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ABAAA5", borderRadius: "10px", minWidth: "50%", margin: "30px"}}>
				<h1 style={{display: "flex", padding: "10px"}}>Login</h1>
        <form onSubmit={onSubmit}>
          <TextField onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="username" variant="outlined" style={{display: "flex", backgroundColor: "white", borderRadius: "10px", margin: "10px"}} />
          <TextField onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="password" variant="outlined" style={{display: "flex", backgroundColor: "white", borderRadius: "10px", margin: "10px"}} />
          <div style={{display: "flex", alignItems: "stretch", justifyContent: "center"}}>
            <Button value="Submit" type="submit" style={{backgroundColor: "blue", color: "white", width: "70%"}}>Submit</Button>
          </div>
        </form>

        <div style={{display: "flex", alignItems: "center", padding: "10px"}}>
          <Button onClick={whoami} style={{backgroundColor: "blue", color: "white", padding: "5px"}}>
            Whoami
          </Button>
        </div>

        <div style={{display: "flex", padding: "10px"}}>
          <Button onClick={logout} style={{backgroundColor: "blue", color: "white", textDecoration: "none"}}>
            Logout
          </Button>
        </div>

        <Link to="/" style={{display: "flex", padding: "10px", textDecoration: "none"}}>
            <Button style={{display: "flex", backgroundColor: "blue", color: "white"}}>
            Home Page
            </Button>
        </Link>

        <Link to="/create-account" style={{display: "flex", padding: "10px", textDecoration: "none"}}>
            <Button style={{display: "flex", backgroundColor: "blue", color: "white"}}>
            Create Account
            </Button>
        </Link>

			</div>
		</div>
	</div>
  )

}

export default LoginPage;
