import React, {useEffect, useState} from 'react';
import './Post.css'
import { Avatar, Button, Table, TableHead, TableRow, TableCell} from "@mui/material";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { BsFillBookmarkFill } from "react-icons/bs";
import { Comments } from './comments/Comments'

const saveStyle = {
    marginLeft: "auto",
    width: 2,
    p: 1,
    boxShadow: 2,
}

const avatarStyle = {
    boxShadow: 4,
}

const recipeStyle = {
    boxShadow: 4,
    display: "flex",
    
}

function Post({ username, picture, recipe, caption, image}){
    const [rating, setRating] = useState(0);


    return (
        <div className="post">
            <div className="post-header">
                <Avatar
                    className="post-profile-pic"
                    src={picture}
                    sx={avatarStyle}
                />
                <h3>{username}</h3>
                <Button sx={saveStyle}>
                    <BsFillBookmarkFill size={25}></BsFillBookmarkFill>
                </Button>
            </div>
            <img className = "post-image" src = {image}/>

            <h4 className="post-text"><strong>{username}:</strong> {caption}</h4>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
            <Table sx={recipeStyle} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Recipe</strong></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Ingredient</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Comments></Comments>
        </div>
    )
}

export default Post;