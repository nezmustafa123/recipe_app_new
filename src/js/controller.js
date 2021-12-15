import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

// import icons from "../img/icons.svg"; //Parcel 1

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
//console.log(icons); //path to the file

if (module.hot) {
  module.hot.accept(); //hot module reload from parcel
}
// https:forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log("Test");

const controlRecipes = async function () {
  //control recipes
  //await promise inside async function
  try {
    const id = window.location.hash.slice(1); //get id from the url bar (hash) from first character
    // console.log(typeof id);

    if (!id) return;
    //render spinner
    recipeView.renderSpinner();

    //update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //update bookmarks view to mark selected bookmark in bookmarks panel
    bookmarksView.update(model.state.bookmarks);

    //1 loading recipe
    //stores
    await model.loadRecipe(id); //have to await it returns a promise so have to await it

    // 2.Rendering recipe
    recipeView.render(model.state.recipe); //add render method that takes indata and stores in object
    // console.log(model.state.recipe);
    // controlServings(); //TEST
  } catch (err) {
    //error being caught here
    // alert(err);
    recipeView.renderError(); //render it to user interface has access to error object
  }
};
//funciton that's like new controller

const controlSearchResults = async function () {
  //will call load search results

  try {
    resultsView.renderSpinner(); //render spinner first in results section
    // console.log(resultsView);
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //load search results
    await model.loadSearchResults(query);
    //render results
    // console.log(model.state.search.results);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage()); //start one page one will render 10 items from array depending on page passed into get searchresultspage function

    //render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  console.log("gotToPage");
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage)); //page gets updated in this function runder overrideds marlui that was there precviously
  //render new pagination buttons
  paginationView.render(model.state.search);
};
// controlSearchResults();

const controlServings = function (newServing) {
  //another event handler run when some event happens
  //update the recipe servings (in state)
  model.updateServings(newServing);
  //update the recipe view

  // recipeView.render(model.state.recipe); //re-render recipe with new state from update servings
  //update tags and attributes in the dom withouth rerendering (update method)
  recipeView.update(model.state.recipe); //re-render recipe with new state from update servings
};

const controlAddBookmark = function () {
  //controller for adding new bookmark
  //add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  //if not bookmarked add bookmark
  else model.deleteBookMark(model.state.recipe.id); //if book marked delete bookmark
  // console.log(model.state.recipe);
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  //take bookmarks view and render it
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  //await the promise inside the async function handle it as a function that returns promise so it gets caught
  //upload the new recipe data
  try {
    await model.uploadRecipe(newRecipe); //if error go to catch block
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);
    //close form window using set timeout ti implement sucess message
    setTimeout(function () {});
  } catch (err) {
    //catch error from throw error
    console.error("X_X", err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  //publisher subscriber patterrn
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
//init function runds and runs addHAndler render handlr render listes for events
