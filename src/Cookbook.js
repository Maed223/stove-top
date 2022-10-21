import React, {useEffect, useState} from 'react';
import './App.css';
import IngredientList from './IngredientList'
import RecipeList from './RecipeList'
import { Button} from 'react-bootstrap';
import { Divider } from '@mui/material';


function App() {


  
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };
  
  //runs upon page being reloaded
  useEffect(() => {
    // set the posts from db to posts state
  }, [])

  return (
    <div style={{ 
      backgroundImage: `url("https://i.pinimg.com/564x/40/69/b8/4069b87105209c972290df999f8ab895.jpg")`,
      backgroundRepeat: 'no-repeat',
       }}>
      <div className="Title">
        <button>Cookbook</button> <button onClick={handleClick}>Show Saved Recipes</button>
        {isShown && <RecipeList/>}
        <div>
          <IngredientList/>
        </div>
        <div>
          <Button>Make Me A Meal!</Button>
        </div>
      </div>
    
    </div>
  );
}


export default App;
