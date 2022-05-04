import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from './components/Navbar/navbar';
import ForumCard from './components/ForumCard/ForumCard'
import { Divider } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Grid } from '@mui/material';


function App() {
	// these two lines need to be in every function based react component where we use axios
	axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
	
	var baseURL = process.env.REACT_APP_BASE_URL
	if (baseURL === undefined) {
		baseURL = 'localhost:8000'
		console.log("baseURL env var not set, defaulting to localhost")
	}
	else {
		console.log(`baseURL env var set: [${baseURL}]`)
	}

	useEffect(() => {
		getCsrf();
		createSubreddit();
	}, []);

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

	const createSubreddit = async () => {
		const res = await axios.post(`http://${baseURL}/create-subreddit/`, {
		  name: "test subreddit",
		  description: "test description",
		  mod_user_id: 1}, {
			withCredentials: true,
			headers: {
			  'content-type': 'application/json',
			  //'X-CSRFToken': `${csrfToken}`,
			  //'Cookie': `csrftoken=${csrfToken}`
			}
		  })
		.then(res => {
		  console.log("createSubreddit returned: ")
		  console.log(res.data);
		})
	  }

  return (
	<div>
		<Navbar/>
		<div style={{backgroundColor: "#dddddb", minHeight: "100vh", padding: "10px"}}>
			<div style={{display: "flex", flexDirection: "column", marginLeft: "10%", marginRight: "10%", marginTop: "3%"}}>
				<Grid container spacing={0} style={{alignContent: "center", textAlign: "center"}}>
					<Grid item xs={12}>
						<h1 style={{fontSize: "60px" }}>Welcome to AggieForums</h1>
					</Grid>
				</Grid>
				<h4>Recent Forums</h4>
				<div style={{display: "flex", flexDirection: "column", backgroundColor: "white", borderRadius: "10px", minWidth: "70%"}}>
					<ForumCard />
					<Divider />
					<ForumCard />
					<Divider />
					<ForumCard />
					<Divider />
					<ForumCard />
					<Divider />
					<ForumCard />
					<Divider />
					<ForumCard />
					<Divider />
					<ForumCard />
					<Divider />
				</div>
			</div>
		</div>
	</div>
  );
}

export default App;
