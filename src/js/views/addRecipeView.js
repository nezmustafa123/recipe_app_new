import View from "./View.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  //extends view
  _parentElement = document.querySelector(".upload"); //parent element of add recipe view

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    //run funciton as soon as object created
    super(); //use super because its a child class
    this._addHandlerShowWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(
      "click",
      //this keyword bound to the element the handler is attached to
      this.toggleWindow.bind(this)
    );
    //bind correct 'this' keyword this keyword points to correct object
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
