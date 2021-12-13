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
    this._addHandlerHideWindow();
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

  _addHandlerHideWindow() {
    this._btnClose.addEventListener(
      "click",
      //this keyword bound to the element the handler is attached to
      this.toggleWindow.bind(this)
    );
    this._overlay.addEventListener("click", this.toggleWindow.bind(this)); //use toggle window again
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      //listen for event on parent element using event delegation
      e.preventDefault(); //form data pass in element that is form in this case it's this keyworf
      const dataArr = [...new FormData(this)]; //spread operator give array with all the fields with data in there
      const data = Object.fromEntries(dataArr); //convert an array of entried convert it into an object
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
