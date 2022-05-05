import { AppBar,Toolbar,Typography,IconButton,Button,Card } from '@mui/material';
import { useState } from 'react';

function ForumCard (props) {

  return (
      <Card style={{padding: "10px"}}>
        <h3>{props.title == null ? "default title" : props.title}</h3>
        <p>{props.description == null ? "default description" : props.description}</p>
      </Card>
    );
  };

  export default ForumCard;