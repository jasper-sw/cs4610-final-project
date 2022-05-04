import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from './components/Navbar/navbar';
import ForumCard from './components/ForumCard/ForumCard'
import { Divider } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';


function App() {
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

	const createPost = async () => {
		const args = {"name": "test1asdf", "description": "test1asd", "mod_user_id": 2}
		const res = await axios.post(`http://localhost:8000/create-subreddit/`, args)
			.then(res => {
				console.log(res);
				console.log(res.data);
			})
	}

  return (
	<div>
		<Navbar/>
		<div style={{backgroundColor: "#dddddb", minHeight: "100vh", padding: "10px"}}>
		<div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ABAAA5", borderRadius: "10px", margin: "10px"}}>
				<h1 style={{display: "flex", padding: "10px"}}>Welcome to Aggie Forums</h1>
				<Link to="/example-page" style={{display: "flex", padding: "10px", textDecoration: "none"}}>
				  <Button style={{display: "flex", backgroundColor: "blue", color: "white"}}>
					example page
				  </Button>
				  <Button onClick={createPost} variant="contained">CREATE POST TEST</Button>
				</Link>
			</div>
		<div style={{display: "flex", flexDirection: "column", marginLeft: "10%", marginRight: "10%", marginTop: "3%"}}>
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
