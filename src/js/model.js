import { runtime } from "../../node_modules/regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

//refactor into architecture
export const state = {
  //contains all data to build application
  //will get update by load recipe function
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    //specific recipe with spcefic id
    const data = await getJSON(`${API_URL}${id}`); //resolved value will be data and stored into data

    //create new object get rid of underscores
    const { recipe } = data.data; //recipe object destructure it
    state.recipe = {
      //update state object and manipulate directly
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
  } catch (err) {
    //Temp error handling error comes from getjson consequence of first error
    console.error(`${err} xxxx`);
    throw err; //have to rethrow the error maually to enter catchblock in control recipes have access to same error objecy
  }
};

//controller will tell this function what to search for

export const loadSearchResults = async function (query) {
  //search based off a search query
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`); //object is called data with data property that is array with info
    console.log(data); //recipes returned from query

    state.search.results = data.data.recipes.map((rec) => {
      //loop throuhg the array and add results to results array
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    console.error(`${err} xxxx`);
    throw err;
  }
};
// loadSearchResults("pizza");

export const getSearchResultsPage = function (page) {
  //calculate start and end dymanically
  const start = (page - 1) * 10; //0;
  const end = page * 10; //9;
  return state.search.results.slice(start, end); //slice method does not include last number passed in
};
