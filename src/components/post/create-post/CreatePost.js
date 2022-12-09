import React, { useState } from 'react';
import { Input, Box} from '@mui/material';
import { addPost } from "../../../firebase"
import { Button, Table, TableHead, TableRow, TableCell, Typography, TextField, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

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
}

const recipeStyle = {
    boxShadow: 4,
    display: "flex",
}
  

export function CreatePost({handlePublish, handleClose, currUser, picture}){
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredient, setIngredient] = useState('')
    const [amount, setAmount] = useState('')
    const [unit, setUnit] = useState('')
    const [items, setItems] = useState([]);



    const updateIngredient = (value) => {
        setIngredient(value)
    }

    const updateAmount = (value) => {
        setAmount(value)
    }

    const updateUnit = (value) => {
        setUnit(value)
    }
    
    const handleAdd = () => {
        let currItems = items;

        const newIngred = ingredient.toLowerCase()
        const newAmt = amount.toLowerCase()

        for(const item of items){
            if(item.ingredient == newIngred){
                alert("You cannot add the same ingrediant twice")
                setIngredient("")
                setAmount("")
                setUnit("")
                return
            }
        }

        currItems.push({
            ingredient: newIngred,
            amount: newAmt,
            unit: unit
        });

        setItems(items)
        setIngredient("")
        setAmount("")
        setUnit("")
    }

    const deleteFromTable = (ingred, amt) => {
        const newItems = []
        for(const item of items){
            if(item.ingredient != ingred){
                newItems.push(item)
            }
        }
        newItems.reverse()
        setItems(newItems);
    }

    const handlePost = async (event) => {
        handleClose()
        await addPost(currUser.username, currUser.email, caption, image, picture, items, instructions)
        handlePublish()
    }

    return (
        <Box sx={style}>
            <Button sx={exitStyle} onClick={handleClose}>
                <IconContext.Provider
                value={{ color: 'red', size: '30px' }}
                >
                    <div>
                        <AiFillCloseCircle></AiFillCloseCircle>
                    </div>
                </IconContext.Provider>
            </Button>
            <form className="create-post">
                <TextField
                type = 'text'
                placeholder = 'Caption'
                value = {caption}
                required = {true}
                onChange={(e) => setCaption(e.target.value)}
                />
                <br></br>
                <br></br>
                <TextField
                type = 'text'
                placeholder = 'Image'
                value = {image}
                required = {true}
                onChange={(e) => setImage(e.target.value)}
                />
                <br></br>
                <br></br>
                <TextField
                type = 'text'
                placeholder = 'Instructions'
                multiline
                fullWidth={true}
                maxRows={15}
                value = {instructions}
                required = {true}
                onChange={(e) => setInstructions(e.target.value)}
                />
                <br></br>
                <br></br>
                <Table sx={recipeStyle} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Recipe</strong></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography><em>Ingredient</em></Typography></TableCell>
                            <TableCell><Typography><em>Amount</em></Typography></TableCell>
                            <TableCell><Typography><em>Unit</em></Typography></TableCell>
                        </TableRow>
                        {
                            items.map((item) => (
                                <TableRow>
                                    <TableCell><Typography>{item.ingredient}</Typography></TableCell>
                                    <TableCell><Typography>{item.amount}</Typography></TableCell>
                                    <TableCell><Typography>{item.unit}</Typography></TableCell>
                                    <TableCell><Button onClick={(e) => deleteFromTable(item.ingredient, item.amount)}><BsFillTrashFill></BsFillTrashFill></Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableHead>
                </Table>
                <br></br>
                <br></br>
                <TextField
                    type="text"
                    value={ingredient}
                    placeholder="Ingredient"
                    onChange= {(e) => {
                        updateIngredient(e.target.value);
                    }}
                />
                <TextField
                    type="text"
                    value={amount}
                    placeholder="Amount"
                    onChange= {(e) => {
                        updateAmount(e.target.value);
                    }}
                />
                <br></br>
                <br></br>
                <FormControl sx={{width: 100}}>
                    <InputLabel>Unit</InputLabel>
                    <Select
                        required
                        defaultValue='Unit'
                        value={unit}
                        label="Unit"
                        onChange={(e) => {updateUnit(e.target.value)}}
                    >
                        <MenuItem value={"Ounces"}>Ounces</MenuItem>
                        <MenuItem value={"Pounds"}>Pounds</MenuItem>
                        <MenuItem value={"Teaspoons"}>Teaspoons</MenuItem>
                        <MenuItem value={"Tablespoons"}>Tablespoons</MenuItem>
                        <MenuItem value={"ml"}>ml</MenuItem>
                        <MenuItem value={"Liter"}>Liter</MenuItem>
                        <MenuItem value={"Cup"}>Cup</MenuItem>
                        <MenuItem value={"Gram"}>Gram</MenuItem>
                    </Select>
                </FormControl>
                <br></br>
                <br></br>
                <Button variant='outlined' onClick= {(e) => {
                        handleAdd()
                    }}>
                    Add Ingredient
                </Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Button variant='outlined' onClick={handlePost}>Post</Button>
            </form>
        </Box>
    )
}