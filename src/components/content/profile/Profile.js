import React, { useState } from 'react';
import './Profile.css';
import {
    Grid,
    Box,
    Paper,
} from "@mui/material";
import { Post } from '../../post/Post'

const paperStyle = {
    textAlign: 'center',
    justifyContent: 'center',
    height: '70',
    lineHeight: '70px',
}


export function Profile({currUser, userPosts}){
    return (
        <div>
            <div>
                <Box>
                    <Grid container spacing={1}>
                        <Grid xs={0.7}>
                            
                        </Grid>
                        <Grid xs={3}>
                            <Paper sx={paperStyle}>
                                <strong>Posts</strong>: {15} 
                            </Paper>
                            
                        </Grid>
                        <Grid xs={3}>
                            <Paper sx={paperStyle}>
                            <strong>Followers</strong>: {15} 
                            </Paper>
                        </Grid>
                        <Grid xs={3}>
                            <Paper sx={paperStyle}>
                                <strong>Following</strong>: {15} 
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
                            userPosts.map(({ id, post}) => (
                                <Grid xs={4}>   
                                    <Post key={id} savedSectionFlag={true} unique={post.unique} postId = {id} rating = {post.rating} picture = {post.picture} username ={post.username} caption={post.caption} image = {post.image} recipe = {post.recipe} comments = {post.comments} currUser = {currUser}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div>    
            
        </div>
    );
        
    

}