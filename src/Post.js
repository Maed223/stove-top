import React from "react";
import './Post.css'
import { Avatar } from "@mui/material";

function Post({ username, caption, image}){
    return (
        <div className="post">
            <div className="post-header">
                <Avatar
                    className="post-profile-pic"
                    src="https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg"
                />
                <h3>{username}</h3>
            </div>
            <img className = "post-image" src = {image}/>

            <h4 className="post-text"><strong>{username}:</strong> {caption}</h4>
        </div>
    )
}

export default Post