import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from "../../components/Navbar/navbar";
import { Typography } from '@mui/material';


function CreateAccount() {
  const [csrfToken, setCsrfToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'

  useEffect(() => {
    getCsrf();
  }, []);

  const onSubmit = (e, data) => {
    e.preventDefault();
    createAccount();
    console.log(username, password);
  }

  const getCsrf = async () => {
    const res = await axios.get(`http://localhost:8000/csrf/`)
    .then(res => {
      console.log(res.data);
    })
  }


  const createAccount = async () => {
    const res = await axios.post(`http://localhost:8000/create-account/`, {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      email: email,
    }, {
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
			<div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ABAAA5", borderRadius: "10px"}}>
                <Typography variant="h5" style={{display: "flex", padding: "10px"}}>Create Account</Typography>
                <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column"}}>
                <label>
                    Username:
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type="text" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    First Name:
                    <input type="text" name="first-name" onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last-name" onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <input type="submit" value="Submit" />
                </form>
                <Link to="/" style={{display: "flex", padding: "10px", textDecoration: "none"}}>
                    <Button style={{display: "flex", backgroundColor: "blue", color: "white"}}>
                    Home Page
                    </Button>
                </Link>
			</div>
		</div>
	</div>
  )

}

export default CreateAccount;
