import { runtime } from "../../node_modules/regenerator-runtime";
import { API_URL, RES_PER_PAGE, API_KEY } from "./config.js";
import { getJSON, sendJSON } from "./helpers.js";

//refactor into architecture
export const state = {
  //contains all data to build application
  //will get update by load recipe function
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
  //add a book mark push recipe into array
};

const createRecipeObject = function (data) {
  //create new object get rid of underscores
  const { recipe } = data.data; //recipe object destructure it
  console.log(recipe);
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
};
export const loadRecipe = async function (id) {
  try {
    //specific recipe with spcefic id
    const data = await getJSON(`${API_URL}${id}`); //resolved value will be data and stored into data

    //check to see if same recipe in bookmarks array
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      //equal to the id recieved in the function
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    console.log(state);
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
    state.search.page = 1; //reset the page in the state to one after loading the search results
    console.log(state.search.results);
  } catch (err) {
    console.error(`${err} xxxx`);
    throw err;
  }
};
// loadSearchResults("pizza");

export const getSearchResultsPage = function (page = state.search.page) {
  //page will be one by default
  state.search.page = page; //changes the page in state
  //doesnt' need to be async function reach into state and get data for page being
  //calculate start and end dymanically page-1 * 10 is 0, 1 * 10 is 10
  const start = (page - 1) * state.search.resultsPerPage; // extract to 0;
  const end = page * state.search.resultsPerPage; // extract to 9;
  return state.search.results.slice(start, end); //slice method does not include last number passed in
};

export const updateServings = function (newServings) {
  //take in servings reach into the state, recipe ingredients change quantity in each ingredient
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings); //multipy by ratio

    // newQt = oldQt * newServings/ oldServings // 2 * 8 / 4 = 4
  });
  state.recipe.servings = newServings; //updaete the servings in the state at the end with new value
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookMark = function (recipe) {
  //set recipe as a bookmark push to array
  state.bookmarks.push(recipe); //push to state
  //if current recipe has same recipe as one passed in mark current recipe as bookmark

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true; //set new property on recipe object
  }
  persistBookmarks();
};

export const deleteBookMark = function (id) {
  //delete recipe with this id from bookmarks array
  //when add something get data when delete get entire id
  const index = state.bookmarks.findIndex((el) => el.id === id); //get index of recipe with same id as id passed in in the bookmark array
  state.bookmarks.splice(index, 1); //index and items to be deleted which is one

  //mark current recipe as not
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage); //if there is storage store bookmarks
};
init();
console.log(state.bookmarks);

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  //send recipe data to forkify api will make request to api so async
  //take raw input data and transform it into same format data get out of api
  // console.log(newRecipe);
  //oppodste of objectfromentries
  //first element of the array
  //create array of ingredients by filtering the elements with the first entry being ingredient second part should not be empty
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        //turn object into array with key value first one starts with ingredient second one exists
        (entry) => entry[0].startsWith("ingredient") && entry[1] !== ""
      )
      .map((ing) => {
        const ingArr = ing[1].replaceAll(" ", "").split(",");
        console.log(ingArr);
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient format, please correct it to the proper format."
          );
        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description }; //if there is quantity convert to number
        // return ings; //putting into variable so have to return it
      });

    const recipe = {
      //create recipe object to be uploaded opposite of the state one
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients, //ingredients array
    };
    // console.log(recipe);
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe); //sends recipe back as a promise to have to store it
    console.log(data);
  } catch (err) {
    throw err;
  }
};
