import React, { useState } from 'react';
import { Modal, Input, Box} from '@mui/material';
import { Button } from '@mui/material';
import { addPost } from "../../../firebase"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

export function CreatePost({handlePublish, username, picture}){
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');

    const handlePost = async (event) => {
        await addPost(username, caption, image, picture)
        handlePublish()
    }

    return (
        <Box sx={style}>
            <form className="create-post">
                <Input
                type = 'text'
                placeholder = 'caption'
                value = {caption}
                onChange={(e) => setCaption(e.target.value)}
                />
                <Input
                type = 'text'
                placeholder = 'image'
                value = {image}
                onChange={(e) => setImage(e.target.value)}
                />
                <Button onClick={handlePost}>Post</Button>
            </form>
        </Box>
    )
}