import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


function App() {
  return (
	<div style={{backgroundColor: "#002438", minHeight: "100vh"}}>
		<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
			<div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ABAAA5", borderRadius: "10px"}}>
				<h1 style={{display: "flex", padding: "10px"}}>HOME PAGE</h1>
				<Link to="/example-page" style={{display: "flex", padding: "10px"}}>
				  <Button style={{display: "flex", backgroundColor: "blue", color: "white"}}>
					example page
				  </Button>
				</Link>
			</div>
			<div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ABAAA5", borderRadius: "10px"}}>
				<h1 style={{display: "flex", padding: "10px"}}>Login page</h1>
				<Link to="/login" style={{display: "flex", padding: "10px"}}>
				  <Button style={{display: "flex", backgroundColor: "blue", color: "white"}}>
					Login page
				  </Button>
				</Link>
			</div>
		</div>
	</div>
  );
}

export default App;
