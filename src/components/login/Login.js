import React, { useState } from 'react';
import { Modal, Input, Box} from '@mui/material';
import { Button } from '@mui/material';
import { createUser, userSignIn, getUser } from "../../firebase"
import './Login.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const exitStyle = {
    transform: 'translate(-45%, -55%)',
    width: 2,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 2,
    p: 1,
  }

export function Login({handleLogin, handleClose,  newUser}){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');

    const handleEvent = async (event) => {
      if(newUser){
        await createUser(email, username, password, picture).catch((error) => alert(error.message))
      } else {
        await userSignIn(email, password).catch((error) => alert(error.message))
      }
      const currUser = await getUser(email).catch((error) => alert(error.message))
      handleLogin(currUser)
    }

    const signUp = (
      <Box sx={style}>

        <Button sx={exitStyle} onClick={handleClose}>
          X
        </Button>
        <form className="app-sign-in">
          <Input
            type = 'text'
            placeholder = 'username'
            value = {username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type = 'text'
            placeholder = 'email'
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type = 'text'
            placeholder = 'password'
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type = 'text'
            placeholder = 'profile picture'
            value = {picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          <Button onClick={handleEvent}>Sign Up</Button>
        </form>
      </Box>
    )

    const signIn = (
      <Box sx={style}>
        <Button sx={exitStyle} onClick={handleClose}>
          X
        </Button>
        <form className="app-sign-in">
          <Input
            type = 'text'
            placeholder = 'email'
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type = 'text'
            placeholder = 'password'
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleEvent}>Sign In</Button>
        </form>
      </Box>
    )
    
    if(newUser){
      return (
        signUp
      )
    } else {
      return (
        signIn
      )
    }
}
