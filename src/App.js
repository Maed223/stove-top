import React, {useEffect, useState} from 'react';
import './App.css';
import Post from "./components/post/Post"
import { Login } from './components/login/Login'
import { Header } from './components/header/Header';
import { getPosts} from "./firebase"
import { Modal, ButtonGroup, Avatar} from '@mui/material';
import { Button } from '@mui/material';
import { CreatePost } from './components/post/create-post/CreatePost';

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [picture, setPicture] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  
  //runs upon page being reloaded
  useEffect(() => {
    // set the posts from db to posts state
    const fetchPosts = async () => {
      const posts = await getPosts()
      setPosts(posts) 
    }
    fetchPosts().catch(console.error)
  }, [])

  const handleLogin = (user) => {
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

      <div className='posts-section'>
        <div className='posts'>
          {
            posts.map(({ id, post}) => (
              <Post key={id} picture = {post.picture} username ={post.username} caption={post.caption} image = {post.image}/>
            ))
          }
        </div>
      </div>
      <br></br>
    </div>
    
  );
}

export default App;
