import React, { useState, useEffect} from 'react';
import { Button} from "@mui/material";
import { Divider, Avatar, Grid, Paper, TextField } from "@mui/material";
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
              <Paper style={{ padding: "40px 20px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar src={picture} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4>{username}</h4>
                    <p>
                      {comment}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      posted 1 minute ago
                    </p>
                  </Grid>
                </Grid>
              </Paper>
            ))
          }
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
        <Button onClick={handleAddComment}>Reply</Button>
      </div>
    )
}

