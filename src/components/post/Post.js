import React, {useEffect, useState} from 'react';
import './Post.css'
import { Avatar, Button, Table, TableHead, TableRow, TableCell} from "@mui/material";
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

function Post({ postId, username, picture, recipe, caption, image, comments, currUser}){
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

            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography><strong>Rating</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography><strong>Recipe</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table sx={recipeStyle} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Recipe</strong></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Ingredient</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                        {
                            recipe.map((x) => (
                                <TableRow>
                                    <TableCell>{x.ingredient}</TableCell>
                                    <TableCell>{x.amount}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableHead>
                </Table>
                </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography><strong>Comments</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Comments comments = {comments} currUser = {currUser} postId = {postId}></Comments>
                </AccordionDetails>
            </Accordion>

            
        </div>
    )
}

export default Post;