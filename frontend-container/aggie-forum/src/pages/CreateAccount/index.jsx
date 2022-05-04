import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from "../../components/Navbar/navbar";
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function CreateAccount() {
  var baseURL = process.env.REACT_APP_BASE_URL
	if (baseURL == undefined) {
		baseURL = 'localhost:8000'
	}
  const [csrfToken, setCsrfToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
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
    const res = await axios.get(`http://${baseURL}/csrf/`)
    .then(res => {
      console.log(res.data);
    })
  }


  const createAccount = async () => {
    const res = await axios.post(`http://${baseURL}/create-account/`, {
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

    navigate('/');
  }



  return (
    <div style={{backgroundColor: "#dddddb", minHeight: "100vh"}}>
		<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Navbar />
			<div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white", borderRadius: "10px", minWidth: "50%", margin: "30px"}}>
                <Typography variant="h5" style={{display: "flex", padding: "10px"}}>Create Account</Typography>
                <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column"}}>
                  <TextField onChange={(e) => setUsername(e.target.value)} type="text" id="filled-basic" label="Username" variant="filled" style={{ display: "flex", marginBottom: "20px", }}/>
                  <TextField onChange={(e) => setPassword(e.target.value)} type="password" id="filled-basic" label="Password" variant="filled" style={{ display: "flex", marginBottom: "20px" }}/>
                  <TextField onChange={(e) => setEmail(e.target.value)} type="email" id="filled-basic" label="Email" variant="filled" style={{ display: "flex", marginBottom: "20px" }}/>
                  <TextField onChange={(e) => setFirstName(e.target.value)} type="text" id="filled-basic" label="First Name" variant="filled" style={{ display: "flex", marginBottom: "20px" }}/>
                  <TextField onChange={(e) => setLastName(e.target.value)} id="filled-basic" label="Last Name" variant="filled" style={{ display: "flex", marginBottom: "20px" }}/>
                  <div style={{justifyContent: "center"}}>
                    <Fab value="Submit" type="submit"  variant="extended" size="medium" color="primary" aria-label="add" style={{ width: "100%", backgroundColor: "blue", marginBottom: "20px"}}>Submit</Fab>
                  </div>
                </form>
			</div>
		</div>
	</div>
  )

}

export default CreateAccount;
