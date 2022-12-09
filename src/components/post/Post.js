import React, { useState } from 'react';
import './Post.css'
import { Avatar, Button, Table, TableHead, TableRow, TableCell, TextField} from "@mui/material";
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BsFillBookmarkFill, BsFillTrashFill } from "react-icons/bs";
import { Comments } from './comments/Comments'
import { addRating, addSavedPost, removeSavedPost, getUserPosts, getUser, removePost, addSavedRecipe} from '../../firebase'
import '../content/profile/Profile.css'


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

export function Post({ postId, recipeId, instructions, handleSetProfileView, updateAllPostsCallback, updateSavedPostsCallback, postUserCallBack, postUserPostsCallBack, unique, rating, username, email, picture, recipe, caption, image, currUser, comments, savedSectionFlag, ownProfileFlag}){
    const [userRating, setUserRating] = useState(0);

    const onProfileButtonPress = (event) => {
        let user = {}
        let posts = []
        const fetch = async () =>{
            user = await getUser(email)
            posts = await getUserPosts(username)
            postUserCallBack(user)
            postUserPostsCallBack(posts)
            handleSetProfileView(true)
        }
        fetch().catch(console.error)
    }

    const onProfilePostDelete = (event) => {
        let user = {}
        let posts = []
        const fetch = async () =>{
            user = await getUser(email)
            posts = await getUserPosts(username)
            postUserCallBack(user)
            postUserPostsCallBack(posts)
            updateAllPostsCallback(unique)
            handleSetProfileView(true)
        }
        fetch().catch(console.error)
    }

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
            alert("Please sign in to rate")
        }
    }

    const handleSavePost = () => {
        if(currUser.username){
            const savePost = async () => {
                await addSavedPost(unique, currUser.email)
                updateSavedPostsCallback()
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
            updateSavedPostsCallback()
            alert("Post has been removed from Saved Section")
        }
        deleteSavedPost().catch(console.error)
    }

    const handleDeleteUserPost = () => {
        const deletePost = async() => {
            await removePost(unique, currUser.email)
            onProfilePostDelete()
            alert("Post has been deleted")
        }
        deletePost().catch(console.error)
    }

    return (
        <div>
            <div className="post">
                <div className="post-header">
                    <Avatar
                        className="post-profile-pic"
                        src={picture}
                        sx={avatarStyle}
                    />
                    <Button onClick = {(event) => onProfileButtonPress(event)}>
                        <h3>{username}</h3>
                    </Button>
                    {savedSectionFlag ? (
                        <Button 
                            sx={saveStyle}
                            onClick={handleDeleteSavedPost}
                        >
                            <BsFillTrashFill size={25}></BsFillTrashFill>
                        </Button>
                    ) : (
                        <></>
                    )}
                    {currUser.email && email == currUser.email ? (
                        <Button 
                            sx={saveStyle}
                            onClick={handleDeleteUserPost}
                        >
                            <BsFillTrashFill size={25}></BsFillTrashFill>
                        </Button>
                    ) : (
                        <></>
                    )}
                    {!savedSectionFlag && !(currUser.email && email == currUser.email ) ? (
                        <Button 
                            sx={saveStyle}
                            onClick={handleSavePost}
                        >
                            <BsFillBookmarkFill size={25}></BsFillBookmarkFill>
                        </Button>
                    ) : (
                        <></>
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
                                    <TableCell><Typography></Typography></TableCell>
                                    <TableCell><Typography><em>Ingredient</em></Typography></TableCell>
                                    <TableCell><Typography></Typography></TableCell>
                                    <TableCell><Typography><em>Amount</em></Typography></TableCell>
                                    <TableCell><Typography></Typography></TableCell>
                                    <TableCell><Typography><em>Unit</em></Typography></TableCell>
                                </TableRow>
                                {
                                    recipe.map((x) => (
                                        <TableRow>
                                            <TableCell><Typography></Typography></TableCell>
                                            <TableCell><Typography>{x.ingredient}</Typography></TableCell>
                                            <TableCell><Typography></Typography></TableCell>
                                            <TableCell><Typography>{x.amount}</Typography></TableCell>
                                            <TableCell><Typography></Typography></TableCell>
                                            <TableCell><Typography>{x.unit}</Typography></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableHead>
                        </Table>
                    <br></br>
                    <br></br>
                    <Typography><strong><em>Instructions</em></strong></Typography>
                    <br></br>
                    <TextField 
                        fullWidth 
                        InputProps={{
                            readOnly: true,
                        }}
                        value={instructions}
                    >
                    </TextField>
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
        </div>
    )
}

export default Post;