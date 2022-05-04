import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, ListItem } from '@mui/material';
import axios from 'axios';
import Navbar from "../../components/Navbar/navbar";
import ForumCard from "../../components/ForumCard/ForumCard";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";


function ExamplePage() {
	const [sample,setSample] = useState([]);
	const [csrfToken, setCsrfToken] = useState(null);
	
	
	return (
	<div style={{backgroundColor: "#dddddb", height: "100%"}}>
		<Navbar />
		<div style={{ marginLeft: "150px", marginRight: "150px" }}>
			<div>
				<h4>Trending</h4>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<ForumCard />
					</Grid>
					<Grid item xs={3}>
						<ForumCard />
					</Grid>
					<Grid item xs={3}>
						<ForumCard />
					</Grid>
					<Grid item xs={3}>
						<ForumCard />
					</Grid>
				</Grid>
			</div>

			<div>
				<h4>Recent Forums</h4>
				<Grid container spacing={3}>
					<Grid item xs={8}>
						<Grid container spacing={2}>
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
				</Grid>
			</div>
		</div>
	</div>
	);
}
export default ExamplePage;