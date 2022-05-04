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


function ExamplePage() {
	var baseURL = process.env.REACT_APP_BASE_URL
	if (baseURL == undefined) {
		baseURL = 'localhost:8000'
		console.log("baseURL env var not set, defaulting to localhost")
	}
	else {
		console.log(`baseURL env var set: [${baseURL}]`)
	}
	const [sample,setSample] = useState([]);
	const [csrfToken, setCsrfToken] = useState(null);
	const [userStatus, setUserStatus] = useState(true);
  	const navigate = useNavigate();

	const whoami = async () => {
		const res = await axios.get(`http://${baseURL}/whoami/`, {withCredentials: true})
		.then(res => {
			console.log(res.data);
			setUserStatus(res.data)
		})
	};

	useEffect(() => {
		whoami()
		getCsrf()
	}, []);

	const getCsrf = async () => {
		const res = await axios.get(`http://${baseURL}/csrf/`)
		.then(res => {
		  console.log(res.data);
		})
	  }
	
	
	if (userStatus.isAuthenticated === false) {
		navigate('/login')
	} else {
		console.log("LOGGED IN")
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
								<Grid item xs={4}>
									<h4>My Forums</h4>
								</Grid>

							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={8}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<ForumCard />
										</Grid>
										<Grid item xs={12}>
											<ForumCard />
										</Grid>
										<Grid item xs={12}>
											<ForumCard />
										</Grid>
										<Grid item xs={12}>
											<ForumCard />
										</Grid>
										<Grid item xs={12}>
											<ForumCard />
										</Grid>
										<Grid item xs={12}>
											<ForumCard />
										</Grid>
										<Grid item xs={12}>
											<ForumCard />
										</Grid>
										<Grid item xs={12}>
											<ForumCard />
										</Grid>
									</Grid>
								</Grid>
			
								<Grid item xs={4}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Card style={{padding: "10px"}}>
												<ForumCard />
												<Divider />
												<ForumCard />
												<Divider />
												<ForumCard />
												<Divider />
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