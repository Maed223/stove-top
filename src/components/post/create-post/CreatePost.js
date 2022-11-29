import React, { useState } from 'react';
import { Input, Box} from '@mui/material';
import { addPost } from "../../../firebase"
import { Button, Table, TableHead, TableRow, TableCell} from "@mui/material";

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

const exitStyle = {
    transform: 'translate(-45%, -55%)',
    width: 2,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 2,
    p: 1,
}

const recipeStyle = {
    boxShadow: 4,
    display: "flex",
}
  

export function CreatePost({handlePublish, handleClose, username, picture}){
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const [ingredient, setIngredient] = useState('')
    const [amount, setAmount] = useState('')
    const [items, setItems] = useState([]);



    const updateIngredient = (value) => {
        setIngredient(value)
    }

    const updateAmount = (value) => {
        setAmount(value)
    }
    
    const handleAdd = () => {
        console.log(items)
        console.log({ingredient})
        let currItems = items;

        currItems.push({
            ingredient: ingredient,
            amount: amount
        });

        setItems(items)
        setIngredient("")
        setAmount("")
    }

    const handlePost = async (event) => {
        await addPost(username, caption, image, picture, items)
        handlePublish()
    }

    return (
        <Box sx={style}>
            <Button sx={exitStyle} onClick={handleClose}>
                X
            </Button>
            <form className="create-post">
                <Input
                type = 'text'
                placeholder = 'caption'
                value = {caption}
                required = {true}
                onChange={(e) => setCaption(e.target.value)}
                />
                <br></br>
                <br></br>
                <Input
                type = 'text'
                placeholder = 'image'
                value = {image}
                required = {true}
                onChange={(e) => setImage(e.target.value)}
                />
                <br></br>
                <br></br>
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
                            items.map((item) => (
                                <TableRow>
                                    <TableCell>{item.ingredient}</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableHead>
                </Table>
                <br></br>
                <br></br>
                <Input
                    type="text"
                    value={ingredient}
                    placeholder="Ingredient"
                    onChange= {(e) => {
                        updateIngredient(e.target.value);
                    }}
                />
                <Input
                    type="text"
                    value={amount}
                    placeholder="Amount"
                    onChange= {(e) => {
                        updateAmount(e.target.value);
                    }}
                />
                <br></br>
                <br></br>
                <Button onClick= {(e) => {
                        handleAdd()
                    }}>
                    Add Ingredient
                </Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Button onClick={handlePost}>Post</Button>
            </form>
        </Box>
    )
}