import Post from "./Post"
import React, {useEffect, useState} from 'react';

function RecipeList(){
    const [posts, setPosts] = useState([
        {
          username: "Mark D",
          caption: "Turkey Burger with lettuce",
          image: "https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/1:1/w_1920,c_limit/basically-burger-1.jpg"
        },
        {
          username: "Zongbo Z",
          caption: "Pan baked pizza",
          image: "https://www.pizzahut.com/assets/w/images/homepage_deal/Sidekick_999L1T_SmallDesktop_v2_352x282.jpg"
        }
      ])
      useEffect(() => {
        // set the posts from db to posts state
      }, [])
    
      return (
        <div className="app">
    
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

export default RecipeList