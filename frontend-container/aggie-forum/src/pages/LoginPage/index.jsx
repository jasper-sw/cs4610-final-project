import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function LoginPage() {
  const [csrfToken, setCsrfToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
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
    <div style={{backgroundColor: "#002438", minHeight: "100vh"}}>
		<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
			<div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ABAAA5", borderRadius: "10px"}}>
				<h1 style={{display: "flex", padding: "10px"}}>Login</h1>
        <form onSubmit={onSubmit}>
          <label>
            Username:
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
          </label>
          <label>
            Password:
            <input type="text" name="password" onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div style={{display: "flex", padding: "10px"}}>
          <Button onClick={whoami} style={{backgroundColor: "blue", color: "white"}}>
            Whoami
          </Button>
        </div>
        <div style={{display: "flex", padding: "10px"}}>
          <Button onClick={logout} style={{backgroundColor: "blue", color: "white"}}>
            Logout
          </Button>
        </div>
        <Link to="/" style={{display: "flex", padding: "10px"}}>
            <Button style={{display: "flex", backgroundColor: "blue", color: "white"}}>
            Home Page
            </Button>
        </Link>
        <Link to="/create-account" style={{display: "flex", padding: "10px"}}>
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
