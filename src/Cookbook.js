import React, {useEffect, useState} from 'react';
import './Cookbook.css';
import IngredientList from './IngredientList'
import { Button} from 'react-bootstrap';

function Cookbook() {

  //runs upon page being reloaded
  useEffect(() => {
    // set the posts from db to posts state
  }, [])

  return (
    <div className="Title">
      <button>Cookbook</button> <button onClick={showRecipes}>Show Saved Recipes</button>
      <div>
        <IngredientList/>
      </div>
      <div>
        <Button>Make Me A Meal!</Button>
      </div>
    </div>
  );
}

function showRecipes(){
  
}

export default App;
