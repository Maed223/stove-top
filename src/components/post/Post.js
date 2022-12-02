import React, {useEffect, useState} from 'react';
import './Post.css'
import { Avatar, Button, Table, TableHead, TableRow, TableCell} from "@mui/material";
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BsFillBookmarkFill, BsFillTrashFill } from "react-icons/bs";
import { Comments } from './comments/Comments'
import { addRating, addSavedPost, removeSavedPost } from '../../firebase'

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



export function Post({ postId, unique, rating, username, picture, recipe, caption, image, comments, currUser, savedSectionFlag}){
    const [userRating, setUserRating] = useState(0);

    const handleRating = (newUserRating) => {
        const addNewRating = async () => {
            await addRating(postId, newUserRating) 
        }
        addNewRating().catch(console.error)
    }

    const handleRatingChange = (e) => {
        if(currUser.username){
            const value = e.target.value
            setUserRating(value)
            handleRating(value)
        } else {
            alert("Please sign in to comment")
        }
        
    }

    const handleSavePost = () => {
        if(currUser.username){
            const savePost = async () => {
                await addSavedPost(unique, currUser.email)
                alert("Post is saved")
            }
            savePost().catch(console.error)
        } else {
            alert("Need to sign in to save a post")
        }
    }

    const handleDeleteSavedPost = () => {
        const deleteSavedPost = async () => {
            await removeSavedPost(unique, currUser.email)
            alert("Post has been removed from Saved Section")
        }
        deleteSavedPost().catch(console.error)
    }


    return (
        <div className="post">
            <div className="post-header">
                <Avatar
                    className="post-profile-pic"
                    src={picture}
                    sx={avatarStyle}
                />
                <h3>{username}</h3>
                {savedSectionFlag ? (
                    <Button 
                        sx={saveStyle}
                        onClick={handleDeleteSavedPost}
                    >
                        <BsFillTrashFill size={25}></BsFillTrashFill>
                    </Button>
                ) : (
                    <Button 
                        sx={saveStyle}
                        onClick={handleSavePost}
                    >
                        <BsFillBookmarkFill size={25}></BsFillBookmarkFill>
                    </Button>
                )}
                
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
                    Global Rating: {rating}
                    <br></br>
                    <br></br>
                    Your Rating:
                    <br></br>
                <Rating
                    name="simple-controlled"
                    value={userRating}
                    onChange={(event) => {
                        handleRatingChange(event)
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