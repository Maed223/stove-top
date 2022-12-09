import React, { useState } from 'react';
import { Modal, Input, Box} from '@mui/material';
import { Button, TextField } from '@mui/material';
import { createUser, userSignIn, getUser } from "../../firebase"
import './Login.css'
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

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
}

export function Login({handleLogin, handleClose,  newUser}){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');

    const handleEvent = async (event) => {
      let successFlag = true;
      console.log(successFlag)
      if(newUser){
        try {
          await createUser(email, username, password, description, picture)
        } catch(e) {
          alert(e.message)
          successFlag = false
        }
        
      } else {
        try {
          await userSignIn(email, password)
        } catch(e) {
          alert(e.message)
          successFlag = false
        }
      }
      console.log(successFlag)
      if(successFlag){
        const currUser = await getUser(email)
        handleLogin(currUser)
      }
      console.log("LOGdN")
    }

    const signUp = (
      <Box sx={style}>

        <Button sx={exitStyle} onClick={handleClose}>
          <IconContext.Provider
                value={{ color: 'red', size: '30px' }}
                >
                    <div>
                        <AiFillCloseCircle></AiFillCloseCircle>
                    </div>
            </IconContext.Provider>
        </Button>
        <form className="app-sign-in">
          <TextField
            type = 'text'
            placeholder = 'username'
            value = {username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br></br>
          <TextField
            type = 'text'
            placeholder = 'email'
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <TextField
            type = 'text'
            placeholder = 'password'
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <TextField
            type = 'text'
            placeholder = 'description'
            value = {description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br></br>
          <TextField
            type = 'text'
            placeholder = 'profile picture'
            value = {picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          <br></br>
          <Button variant='outlined' onClick={handleEvent}>Sign Up</Button>
        </form>
      </Box>
    )

    const signIn = (
      <Box sx={style}>
        <Button sx={exitStyle} onClick={handleClose}>
          <IconContext.Provider
                value={{ color: 'red', size: '30px' }}
                >
                    <div>
                        <AiFillCloseCircle></AiFillCloseCircle>
                    </div>
          </IconContext.Provider>
        </Button>
        <form className="app-sign-in">
          <TextField
            type = 'text'
            placeholder = 'email'
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <TextField
            type = 'text'
            placeholder = 'password'
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <Button variant='outlined' onClick={handleEvent}>Sign In</Button>
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
