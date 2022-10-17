import React, {useEffect, useState} from 'react';
import './App.css';
import Post from "./Post"
import { Modal } from '@mui/material';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "mark d",
      caption: "hello",
      image: "https://na2.electroluxmedia.com/XL/Electrolux/Electrolux%20Assets/Images/Product%20Photography/FGEC3068UB-34VR_831.jpg?impolicy=dimensions&imwidth=1400"
    },
    {
      username: "mark d",
      caption: "hello",
      image: "https://na2.electroluxmedia.com/XL/Electrolux/Electrolux%20Assets/Images/Product%20Photography/FGEC3068UB-34VR_831.jpg?impolicy=dimensions&imwidth=1400"
    }
  ])

  //runs upon page being reloaded
  useEffect(() => {
    // set the posts from db to posts state
  }, [])

  return (
    <div className="app">
      <div className="header">
        <img 
          className='header-icon'
          src="https://t3.ftcdn.net/jpg/01/82/26/30/360_F_182263003_qetLxvmZtCA4SJ3mBragsnPLWeh1sC8Z.jpg"
        />
      </div>

      <div className='posts-section'>
        <div className='posts'>
          {
            posts.map(post => (
              <Post username ={post.username} caption={post.caption} image = {post.image}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
