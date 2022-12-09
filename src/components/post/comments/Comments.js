import React, { useState, useEffect} from 'react';
import { Button} from "@mui/material";
import { Avatar, Grid, Paper, TextField, Box, Divider } from "@mui/material";
import { addComment, getComments } from "../../../firebase"

export function Comments({currUser, postId}){
    
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    
    useEffect(() => {
      // set the comments from db to comments state
      const fetchComments = async () => {
        const comments = await getComments(postId)
        setComments(comments) 
      }
      fetchComments().catch(console.error)
    }, []) 

    const handleAddComment = () => {
      if(currUser.username){
        const handleCommentPublish = async () => {
          await addComment(currUser, postId, comment)
          const comments = await getComments(postId)
          setComments(comments)
          setComment("")
          
        }
        handleCommentPublish().catch(console.error)
      } else {
        alert("Please sign in to comment")
      }
    }

    return (
      <div>
        <div>
          {
            comments.map(({ comment, username, picture }) => (
              <>
              <Box sx={{boxShadow: 2}}>
                <Paper style={{ padding: "20px 20px"}}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar src={picture} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4>{username}</h4>
                      <p>
                        {comment}
                      </p>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
              <br></br>
              </>
            ))
          }
          <Divider/>
          <br></br>
        </div>
        <TextField
          placeholder="Your comment...."
          multiline
          fullWidth={true}
          value={comment}
          maxRows={15}
          onChange= {(e) => {
            setComment(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <Button variant='outlined' onClick={handleAddComment}>Reply</Button>
      </div>
    )
}

