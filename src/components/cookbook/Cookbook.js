import React, { useState } from 'react';
import { Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Button, Table, TableHead, TableRow, TableCell} from "@mui/material";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getRecommendations } from '../../Recommender';
import { Recipe } from '../recipe/Recipe'

const recipeStyle = {
    boxShadow: 4,
    display: "flex",
}

export function Cookbook({currUser}){
    const [ingredient, setIngredient] = useState('')
    const [numRecipes, setNumRecipes] = useState(1)
    const [items, setItems] = useState([]);
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)

    const updateIngredient = (value) => {
        setIngredient(value)
    }

    const updateNumRecipes = (value) => {
        setNumRecipes(value)
    }

    const handleAdd = () => {
        let currItems = items;

        const newIngred = ingredient.toLowerCase()

        for(const item of items){
            if(item == newIngred){
                alert("You cannot add the same ingrediant twice")
                setIngredient("")
                return
            }
        }

        currItems.push(newIngred);

        setItems(items)
        setIngredient("")
    }

    const handleGetRecipes = () => {
        const fetch = async() => {
            setLoading(true)
            const recipes = await getRecommendations(items, numRecipes)
            setRecipes(recipes)
            setLoading(false)
        
        }
        fetch().catch(console.error)
    }

    const deleteFromTable = (ingred) => {
        const newItems = []
        for(const item of items){
            if(item != ingred){
                newItems.push(item)
            }
        }
        newItems.reverse()
        setItems(newItems);
    }


    return (
        <Box>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '55ch' },
                    '& .MuiFormControl-root': { m: 1},
                    '& .MuiButton-root': { m: 1},
                    marginRight: 10,
                    marginLeft: -5
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <Table sx={recipeStyle} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography><strong>Cookbook</strong></Typography></TableCell>
                            </TableRow>
                            {
                                items.map((item) => (
                                    <TableRow>
                                        <TableCell><AiOutlineArrowRight></AiOutlineArrowRight></TableCell>
                                        <TableCell><Typography></Typography></TableCell>
                                        <TableCell><Typography>{item}</Typography></TableCell>
                                        <TableCell><Typography></Typography></TableCell>
                                        <TableCell><Typography></Typography></TableCell>
                                        <TableCell><Button onClick={(e) => deleteFromTable(item)}><BsFillTrashFill color='red' size={20}></BsFillTrashFill></Button></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableHead>
                    </Table>
                </div>
                <br></br>
                <br></br>
                <div>
                    <TextField
                    required
                    label="Ingredient"
                    value={ingredient}
                    onChange= {(e) => {
                        updateIngredient(e.target.value);
                    }}
                    />
                    
                </div>
                <br></br>
                <Button variant="outlined" onClick= {(e) => { handleAdd()}}>
                    <Typography>Add Ingredient</Typography>
                </Button>
                <br></br>
                <br></br>
                <FormControl sx={{width: 200}}>
                    <InputLabel>Number of Recipes</InputLabel>
                    <Select
                        required
                        value={numRecipes}
                        label="Number of Recipes"
                        onChange={(e) => {updateNumRecipes(e.target.value)}}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>
                <br></br>
                <br></br>
                <Box sx={{ display: 'inline' }}>
                    <Button variant="outlined" color="error" onClick= {handleGetRecipes}>
                        <Typography>{ loading ?  ("Retriving your recipes...") : ("Get Recipes") }</Typography>
                    </Button>
                </Box>
            </Box>
            <br></br>
            <br></br>
            <br></br>
            <Box
                sx={{
                    marginRight: 10,
                    marginLeft: -5
                }}
            >
                <Box>
                {
                    recipes.map(({ title, ingredients, instructions }) => (
                        <>
                        <Recipe title={title} ingredients={ingredients} instructions={instructions} items={items} currUser={currUser} cookbookPageFlag={true}></Recipe>
                        <br></br>
                        <br></br>
                        <br></br>
                        </>
                    ))
                }
                </Box>
            </Box>
        </Box>
    )

}