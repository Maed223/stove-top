import React, { useState, useEffect } from 'react';
import './Profile.css';
import {
    Grid,
    Box,
    Paper,
    Button,
    Avatar
} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Post } from '../../post/Post'
import { addUserToFollowing, removeUserFollow, getUser, getUserPosts } from '../../../firebase'

const paperStyle = {
    textAlign: 'center',
    justifyContent: 'center',
    height: '50',
    lineHeight: '49px',
}

const headerStyle = {
    p: 2, 
    padding: '50px'
}

const accordStyle = {
    height: "200px"
}


export function Profile({currUser, postUser, postUserPosts}){

    console.log(postUser)
    console.log(postUserPosts)

    const currUserFollows = () => {
        const currUserFollowing = currUser.following;
        if(currUserFollowing && currUserFollowing.includes(postUser.email)){
            return true;
        } else {
            return false;
        }
    }

    const addFollow = () => {
        console.log("asdnnn")
        const followAdd = async () => {
            if(currUser.email){
                await addUserToFollowing(currUser.email, postUser.email)
            } else {
                alert("Must sign in to follow user")
            }
            
        }
        followAdd().catch(console.error)
    }

    const removeFollow = (currUserEmail, postUserEmail) => {
        console.log("ajnkjbbbc")
        const followRemove = async () => {
            await removeUserFollow(currUserEmail, postUserEmail)
        }
        followRemove().catch(console.error)
    }

    const removeYourFollow = (currUserEmail, userToRemove) => {
        console.log("kmknjubjbss")
        const followRemove = async () => {
            await removeUserFollow(currUserEmail, userToRemove)
        }
        followRemove().catch(console.error)
    }

    return (
        <div>
            <div>
                {currUser !== {} && currUser.username === postUser.username ? (
                <Box>
                    <Button variant="outlined">
                        Edit account
                    </Button>
                </Box>
                ) : (
                    <>
                        {currUser !== {} && currUserFollows() ? (
                            <Box>
                                <Button variant="outlined" onClick={() => removeFollow(currUser.email, postUser.email)}>
                                    Un-Follow
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                <Button variant="outlined" onClick={addFollow}>
                                    Follow
                                </Button>
                            </Box>
                        )}
                    </>
                )}
                <Box sx={headerStyle}>
                    <Grid container spacing={2}>
                        <Grid>
                            <Avatar
                            sx={{ width: 70, height: 70 }}
                            className="post-profile-pic"
                            src={postUser.picture}
                            
                            />
                        </Grid>
                        <Grid xs={2}>
                            <Typography><h1>{postUser.username}</h1></Typography>
                        </Grid>
                    </Grid>
                        <br></br>
                        <br></br>
                        <h3>{postUser.description}</h3>
                </Box>
                
                <Box>
                    <Grid container spacing={1}>
                        <Grid xs={3}>
                            <Paper sx={paperStyle}>
                                <strong>Posts</strong>: {postUser.numPosts} 
                            </Paper>
                            
                        </Grid>
                        <Grid xs={4.5}>
                            <Paper sx={paperStyle}>
                                <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography><strong>Followers</strong>: {postUser.followers.length}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            postUser.followers.map( follow => (<h4>{follow}</h4>))
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
                        </Grid>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Grid xs={4.5}>
                            <Paper sx={paperStyle}>
                                <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography><strong>Following</strong>: {postUser.following.length}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={accordStyle}>
                                        {
                                            postUser.following.map( follow => (
                                                <>
                                                {currUser !== {} && currUser.username === postUser.username ? (
                                                    <Grid container spacing={1}>
                                                        <h4>{follow}</h4>
                                                        <Button size = 'small' onClick={() => removeYourFollow(currUser.email, follow)}>UnFollow</Button>
                                                    </Grid>
                                                ) : (
                                                    <h4>{follow}</h4>
                                                )}
                                                </>
                                            ))
                                        }
                                    </AccordionDetails>
                                </Accordion> 
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
                <br></br>
            </div>
            <div className='posts-gallery-section'>
                <div className='posts'>
                    <Grid container spacing={1}>
                        {
                            postUserPosts.map(({ id, post}) => (
                                <Grid xs={4}>   
                                    <Post key={id} savedSectionFlag={false} unique={post.unique} postId = {id} rating = {post.rating} picture = {post.picture} username ={post.username} caption={post.caption} image = {post.image} recipe = {post.recipe} comments = {post.comments} currUser = {currUser}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div>    
            
        </div>
    );
        
    

}