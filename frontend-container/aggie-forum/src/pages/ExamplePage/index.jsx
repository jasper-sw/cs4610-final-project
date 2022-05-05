import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, ListItem } from '@mui/material';
import axios from 'axios';
import Navbar from "../../components/Navbar/navbar";
import ForumCard from "../../components/ForumCard/ForumCard";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Fab } from "@mui/material";
import { TextField } from "@mui/material";


function ExamplePage() {
	var baseURL = process.env.REACT_APP_BASE_URL
	if (baseURL == undefined) {
		baseURL = 'localhost:8000'
	}
	const [sample,setSample] = useState([]);
	const [csrfToken, setCsrfToken] = useState(null);
	const [userStatus, setUserStatus] = useState(true);
	const [forumTitle, setForumTitle] = useState("");
	const [forumDescription, setForumDescription] = useState("");
	const [userSubscriptions, setUserSubscriptions] = useState(null);
  	const navigate = useNavigate();
	axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

	useEffect(() => {
		whoami()
		getCsrf();
	}, []);

	const whoami = async () => {
		const res = await axios.get(`http://${baseURL}/whoami/`, {withCredentials: true})
		.then(res => {
			console.log(res.data);
			setUserStatus(res.data)
		})
	};

	const getCsrf = async () => {
		const res = await axios.get(`http://${baseURL}/csrf/`)
		.then(res => {
		  console.log(res.data);
		})
	  }

	const createSubreddit = async () => {
		document.getElementById("forumTitle").textContent = "";
		document.getElementById("forumDescription").textContent = "";
		let test = 0

		const res = await axios.post(`http://${baseURL}/create-subreddit/`, {
			name: forumTitle,
			description: forumDescription,
			mod_user_id: userStatus.user_id}, {
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
			test = res.data["created_subreddit: "].id
		})

		const secondRes = await axios.post(`http://${baseURL}/create-subscription/`, {
			user_id: userStatus.user_id,
			subreddit_id: test}, {
			withCredentials: true,
			headers: {
				'content-type': 'application/json',
				//'X-CSRFToken': `${csrfToken}`,
				//'Cookie': `csrftoken=${csrfToken}`
			}
			})
		.then(res => {
			console.log("subscription returned: ")
			console.log(res.data);
			setUserSubscriptions(null)
		});
	}

	const getSubscriptions = async () => {
		if (userSubscriptions === null) {
			const res = await axios.post(`http://${baseURL}/get-user-subscriptions/`, {
			user_id: userStatus.user_id }, {
			withCredentials: true,
			headers: {
				'content-type': 'application/json',
				//'X-CSRFToken': `${csrfToken}`,
				//'Cookie': `csrftoken=${csrfToken}`
			}
			})
		.then(res => {
			console.log("Subscriptions returned for " + userStatus.user_id)
			console.log(res.data);
			setUserSubscriptions(res.data.subscriptions);
		});
		}
	}
	
	let subscriptions = (
		<Card style={{ padding: "20px", width: "%" }}>You don't have any subscriptions</Card>
	);

	if (userSubscriptions !== null) {
		if (userSubscriptions.length !== 0 ) {
			subscriptions = (
				<Grid container spacing={1}>
					{userSubscriptions.map((subscription, index) => (
					<Grid item xs={12} key={index}>
						<Card style={{padding: "10px", width: "100%"}}>
							<h3>{subscription.name}</h3>
							<p>{subscription.description}</p>
						</Card>
					</Grid>
					))}
				</Grid>
			);
		}
	}
	
	getSubscriptions();
	if (userStatus.isAuthenticated === false) {
		navigate('/login')
	} else {
		return (
			<div>
				<Navbar />
				<div style={{backgroundColor: "#dddddb", height: "100%", padding: "10px"}}>
					<div style={{ marginLeft: "10%", marginRight: "10%" }}>
						<div>
							<Grid container spacing={3}>
								<Grid item xs={8}>
									<h4>My Subscriptions</h4>
								</Grid>
							</Grid>
							<Grid container spacing={4}>
								<Grid item xs={8}>
									{subscriptions}
								</Grid>
			
								<Grid item xs={4}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Card style={{padding: "10px", margin: "10px"}}>
												<Grid container spacing={1}>
													<Grid item xs={12}>
														<h3>Create New Forum</h3>
														<TextField id="forumTitle" onChange={(e) => setForumTitle(e.target.value)} variant="filled" label="Forum Name" style={{  width: "100%", marginBottom:"10px"}}></TextField>
														<TextField id="forumDescription" onChange={(e) => setForumDescription(e.target.value)} variant="filled" label="Description" style={{  width: "100%"}} multiline></TextField>
													</Grid>
													<Grid item xs={12} style={{ textAlign: "right" }}>
														<Button onClick={createSubreddit} variant="contained" style={{ backgroundColor: "green"}}>Create</Button>
													</Grid>
												</Grid>
											</Card>
										</Grid>

										<Grid item xs={12}>
											<h4>My Posts</h4>
											<Card style={{padding: "10px"}}>
												<Card style={{padding: "10px", margin: "10px"}}>
													<Grid container spacing={1}>
														<Grid item xs={8}>
															<h3>Post Title</h3>
															<h5>Forum Title</h5>
															<p>Post Description</p>
														</Grid>
														<Grid item xs={4} style={{ alignSelf: "center" }}>
															<Fab style={{ backgroundColor: "red", color: "white" }}>X</Fab>
														</Grid>
													</Grid>
												</Card>
												<Card style={{padding: "10px", margin: "10px"}}>
													<Grid container spacing={1}>
														<Grid item xs={8}>
															<h3>Post Title</h3>
															<h5>Forum Title</h5>
															<p>Post Description</p>
														</Grid>
														<Grid item xs={4} style={{ alignSelf: "center" }}>
															<Fab style={{ backgroundColor: "red", color: "white" }}>X</Fab>
														</Grid>
													</Grid>
												</Card>
											</Card>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ExamplePage;