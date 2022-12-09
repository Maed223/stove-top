import React, { useState } from 'react';
import { Button, Card ,Box, Typography, Table, TableHead, TableRow, TableCell } from "@mui/material";
import { AiOutlineBook } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { addSavedRecipe, removeSavedRecipe } from '../../firebase'

const recipeStyle = {
    boxShadow: 4,
    display: "flex",  
}

const cardStyle = {
    boxShadow: 4,
    padding: 4
}

const saveStyle = {
    marginLeft: "auto",
    width: 2,
    p: 1,
    boxShadow: 2,
}

export function Recipe({title, ingredients, instructions, items, currUser, cookbookPageFlag, updateUserCallback}){

    const findMissing = () => {
        let missing = [];
        for(const ingredient of ingredients){
            if(!items.some(ele => ingredient.includes(ele))){
                missing.push(ingredient)
            }
        }
        return missing;
    }

    const handleSaveRecipe = () =>{
        console.log(currUser.email)
        const addRecipe = async(email) => {
            console.log(email)
            await addSavedRecipe({
                title: title,
                ingredients: ingredients,
                instructions: instructions
            }, email)
            alert("Recipe has been saved!")
        }
        addRecipe(currUser.email).catch(console.error)
    }

    const handleRemoveRecipe = () =>{
        const removeRecipe = async() => {
            await removeSavedRecipe({
                title: title,
                ingredients: ingredients,
                instructions: instructions
            }, currUser.email)
            alert("Recipe has been saved!")
            updateUserCallback()
        }
        removeRecipe().catch(console.error)
    }

    return (
        <Card sx={cardStyle}>
            <div className="post-header">
                <Typography fontSize={30}><strong>{title}</strong></Typography>
                {cookbookPageFlag ? (
                    <Button 
                        sx={saveStyle}
                        onClick={handleSaveRecipe}
                    >
                        <AiOutlineBook size={25}></AiOutlineBook>
                    </Button>
                ) : (
                    <Button 
                        sx={saveStyle}
                        onClick={handleRemoveRecipe}
                    >
                        <BsFillTrashFill size={25}></BsFillTrashFill>
                    </Button>
                )}
            </div>
            <br></br>
            <Box>
                <Table sx={recipeStyle} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography></Typography></TableCell>
                            <TableCell><Typography fontSize={20}><strong><em>Ingredients</em></strong></Typography></TableCell>
                        </TableRow>
                        {
                            ingredients.map((x) => (
                                <TableRow>
                                    <TableCell><Typography></Typography></TableCell>
                                    <TableCell><Typography>{x}</Typography></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableHead>
                </Table>
                {cookbookPageFlag ? (
                    <>
                    <br></br>
                    <Table sx={recipeStyle} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography></Typography></TableCell>
                                <TableCell><Typography fontSize={20}><strong><em> Missing Ingredients</em></strong></Typography></TableCell>
                            </TableRow>
                            {
                                findMissing().map((x) => (
                                    <TableRow>
                                        <TableCell><Typography></Typography></TableCell>
                                        <TableCell><Typography>{x}</Typography></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableHead>
                    </Table>
                    </>
                ) : (
                    <></>
                )}
            </Box>
            <br></br>
            <Box>
                <Typography fontSize={20}><strong><em>Instructions</em></strong></Typography>
                    <br></br>
                    <Card
                        fullWidth
                        variant='outlined'
                        sx={cardStyle}
                    >
                        <Typography>{instructions}</Typography>
                    </Card>
            </Box>
        </Card>
    )
}