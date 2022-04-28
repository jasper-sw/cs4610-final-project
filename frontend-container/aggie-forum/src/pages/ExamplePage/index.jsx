import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';


function ExamplePage() {
	const [sample,setSample] = useState([]);

	const whoami = async () => {
		const res = await axios.get(`http://localhost:8000/whoami/`, {withCredentials: true})
		.then(res => {
		  console.log(res.data);
		})
	}
	
	
	return (
	<div style={{backgroundColor: "#002438", minHeight: "100vh"}}>
		<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
			<div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ABAAA5", borderRadius: "10px"}}>
				<h1 style={{display: "flex", padding: "10px"}}>HELLO WORLD PAGE</h1>
				<Link to="/" style={{display: "flex", padding: "10px"}}>
				  <Button style={{display: "flex", backgroundColor: "blue", color: "white"}}>
					Home Page
				  </Button>
				</Link>
				<div style={{display: "flex", padding: "10px"}}>
				<Button onClick={whoami} style={{backgroundColor: "blue", color: "white"}}>
					Whoami
				</Button>
				</div>
			</div>
		</div>
	</div>
	);
}
export default ExamplePage;