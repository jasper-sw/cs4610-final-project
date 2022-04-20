import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function ExamplePage() {
	const [sample,setSample] = useState([]);
	
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
			</div>
		</div>
	</div>
	);
}
export default ExamplePage;