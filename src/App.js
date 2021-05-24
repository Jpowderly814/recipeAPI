import './App.css';
import Axios from "axios";
import { useState } from "react";
import RecipeTile from "./RecipeTile";


function App() {
  const [query, setquery] = useState("");  
  const [recipes, setrecipes] =useState([]);
  const [healthLabel, setHealthLabel] = useState("");


  const YOUR_APP_ID = "5d4ca9b8";
  const YOUR_APP_KEY = "3aa8a0b147eb04cceb58d8f3bbb29ba1";
  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;

  async function getRecipes(){
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);
  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();

  }

  return (
    <div className = "app">
      <h1 onClick ={getRecipes}>Food Recipe Plaza </h1>
      <form className="app_searchForm" onSubmit={onSubmit}>
        <input 
          type="text" 
          className="app__input"
          placeholder="enter ingredient" 
          value={query} 
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />

        <select className="app__healthLabels" >
          <option onClick={() => setHealthLabel("Vegan")}>vegan</option>
          <option onClick={() => setHealthLabel("Vegetarian")}>vegetarian</option>
          <option onClick={() => setHealthLabel("Paleo")}>paleo</option>
          <option onClick={() => setHealthLabel("Dairy-free")}>dairy-free</option>
          <option onClick={() => setHealthLabel("Gluten-free")}>gluten-free</option>
          <option onClick={() => setHealthLabel("Low-sugar")}>low-sugar</option>
          <option onClick={() => setHealthLabel("Egg-free")}>egg-free</option>
          <option onClick={() => setHealthLabel("Peanut-free")}>peanut-free</option>
          <option onClick={() => setHealthLabel("Low-fat")}>low-fat</option>

        </select>
      </form>

      <div className="app__recipes">
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe}></RecipeTile>;
        })}
      </div>
    </div>
  );
}

export default App;
