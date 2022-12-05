import React, {useState, useEffect} from 'react';
import Post from '../post/Post'

export function Content({posts, savedPosts, currUser, homeFlag, savedFlag, cookbookFlag, profileFlag}) {

    if(homeFlag){
        return (
            <div className='posts-section'>
                <div className='posts'>
                    {
                        posts.map(({ id, post}) => (
                            <Post key={id} savedSectionFlag={false} unique={post.unique} postId = {id} rating = {post.rating} picture = {post.picture} username ={post.username} caption={post.caption} image = {post.image} recipe = {post.recipe} comments = {post.comments} currUser = {currUser} postUserEmail = {post.email}/>
                        ))
                    }
                </div>
            </div>
        )
    }
    if(savedFlag){
        return (
            <div className='posts-section'>
                <div className='posts'>
                    {
                        savedPosts.map(({ id, post}) => (
                            <Post key={id} savedSectionFlag={true} unique={post.unique} postId = {id} rating = {post.rating} picture = {post.picture} username ={post.username} caption={post.caption} image = {post.image} recipe = {post.recipe} comments = {post.comments} currUser = {currUser} postUserEmail = {post.email}/>
                        ))
                    }
                </div>
            </div>
        )
    }
    if(cookbookFlag){
        return (
            <div></div>
        )
    }
}