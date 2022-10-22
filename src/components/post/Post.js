import React from "react";
import './Post.css'
import { Avatar } from "@mui/material";

function Post({ username, picture, recipe, caption, image}){
    return (
        <div className="post">
            <div className="post-header">
                <Avatar
                    className="post-profile-pic"
                    src={picture}
                />
                <h3>{username}</h3>
            </div>
            <img className = "post-image" src = {image}/>

            <h4 className="post-text"><strong>{username}:</strong> {caption}</h4>
        </div>
    )
}

export default Post;