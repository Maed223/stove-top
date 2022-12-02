import React, {useEffect, useState} from 'react';
import './App.css';
import { Login } from './components/login/Login'
import { Header } from './components/header/Header';
import { Content } from './components/content/Content'
import { getPosts, getUserSavedPosts, getUserPosts } from "./firebase"
import { Modal, ButtonGroup, Avatar, Box} from '@mui/material';
import { Button } from '@mui/material';
import { CreatePost } from './components/post/create-post/CreatePost';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function App() {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({})
  const [picture, setPicture] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  //Used to change whats being displayed in content section
  const [homeFlag, setHomeFlag] = useState(true);
  const [savedFlag, setSavedFlag] = useState(false);
  const [cookbookFlag, setCookbookFlag] = useState(false);
  const [profileFlag, setProfileFlag] = useState(false);


  //runs upon page being reloaded
  useEffect(() => {
    // set the posts from db to posts state
    const fetchPosts = async () => {
      const posts = await getPosts()
      setPosts(posts) 
    }
    fetchPosts().catch(console.error)
  }, [])

  const handleGetUserPosts = () => {
    const fetchUserPosts = async() => {
      const posts = await getUserPosts(user.username)
      console.log("USER POSTS IN APP")
      console.log(posts)
      setUserPosts(posts)
    }
    fetchUserPosts().catch(console.error)
  }

  const handleGetSavedPosts = () => {
    const fetchSavedPosts = async () => {
      const userSavedPosts = await getUserSavedPosts(user.email)
      setSavedPosts(userSavedPosts)
    }
    fetchSavedPosts().catch(console.error)
  }

  const handleLogin = (user) => {
    setUser(user)
    setUsername(user.username)
    setPicture(user.picture)
    setOpen(false)
  }

  const handlePublish = () => {
    setCreatePost(false)
    const fetchPosts = async () => {
      const posts = await getPosts()
      setPosts(posts) 
    }
    fetchPosts().catch(console.error)
  }

  const signOut = (event) => {
    setUsername(null)
  }

  const signIn = (event) => {
    setNewUser(false)
    setOpen(true)
  }

  const signUp = (event) => {
    setNewUser(true)
    setOpen(true)
  }

  const creating = (event) => {
    setCreatePost(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCreatePost(false)
  }

  const handleHomeFlag = () => {
    setHomeFlag(true)
    setCookbookFlag(false)
    setSavedFlag(false)
    setProfileFlag(false)
  }

  const handleProfileFlag = () => {
    handleGetUserPosts()
    setHomeFlag(false)
    setCookbookFlag(false)
    setSavedFlag(false)
    setProfileFlag(true)
  }

  const handleCookbookFlag = () => {
    setHomeFlag(false)
    setCookbookFlag(true)
    setSavedFlag(false)
    setProfileFlag(false)
  }

  const handleSavedFlag = () => {
    handleGetSavedPosts()
    setHomeFlag(false)
    setCookbookFlag(false)
    setSavedFlag(true)
    setProfileFlag(false)
  }

  return (
    <div className="app">
      <Modal open={open} onClose = {() => setOpen(false)}>
        <Login handleLogin={handleLogin} handleClose = {handleClose} newUser = {newUser}/>
      </Modal>
      <Modal open={createPost} onClose = {() => setOpen(false)}>
        <CreatePost handlePublish = {handlePublish} handleClose = {handleClose} username = {username} picture = {picture}/>
      </Modal>
      <Header/>
      {username ? (
        <div className='user-info'>
          <div>
            <Avatar
              className="post-profile-pic"
              src={picture}
            />
            <h2>Current User: {username}</h2>
            <ButtonGroup>
              <Button onClick={creating}>Create Post</Button>
              <Button onClick={signOut}>Sign Out</Button>
            </ButtonGroup>
          </div>
        </div>
      ):(
        <div className='user-info'>
          <ButtonGroup>
            <Button onClick={signIn}>Sign In</Button>
            <Button onClick={signUp}>Sign Up</Button>
          </ButtonGroup>
        </div>
      )}
      <br></br>
      <Box>
      <Box sx={{ display: 'flex' }}>
            <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                width: 220,
                boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="right"
            >
            <Toolbar />
                <Divider />
                {user.username ? (
                  <List>
                  <ListItem key={"Home"} disablePadding>
                      <ListItemButton
                        onClick={handleHomeFlag}>
                      <ListItemIcon>
                          <Avatar />
                      </ListItemIcon>
                      <ListItemText primary={"Home"} />
                      </ListItemButton>
                  </ListItem>
                  <ListItem key={"Profile"} disablePadding>
                      <ListItemButton
                        onClick={handleProfileFlag}>
                      <ListItemIcon>
                        <Avatar />
                      </ListItemIcon>
                      <ListItemText primary={"Profile"} />
                      </ListItemButton>
                  </ListItem>
                  <ListItem key={"Cookbook"} disablePadding>
                      <ListItemButton
                        onClick={handleCookbookFlag}
                      >
                      <ListItemIcon>
                        <Avatar />
                      </ListItemIcon>
                      <ListItemText primary={"Cookbook"} />
                      </ListItemButton>
                  </ListItem>
                  <ListItem key={"Saved Posts"} disablePadding>
                      <ListItemButton
                        onClick={handleSavedFlag}
                      >
                        <ListItemIcon>
                          <Avatar />
                        </ListItemIcon>
                      <ListItemText primary={"Saved Posts"} />
                      </ListItemButton>
                  </ListItem>
              </List>
                  ) :(
                    <div></div>
                  )}
                    
                <Divider />
            </Drawer>
        </Box>
        <Box>
          <Content posts={posts} savedPosts={savedPosts} userPosts={userPosts} currUser={user} homeFlag={homeFlag} savedFlag={savedFlag} cookbookFlag={cookbookFlag} profileFlag={profileFlag}></Content>
          <br></br>
        </Box>
      </Box>
    </div>
    
  );
}

export default App;
