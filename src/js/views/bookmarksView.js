import View from "./View.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  //extends view
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage =
    "No bookmarks added, bookmark a recipe to add to bookmarks list.";
  _searchMessage = "";

  _generateMarkup() {
    //needs this method to user in render method
    console.log(this._data); //loop through create string with preview blocks for each data result
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}
//return markup as a string
//loop through render preview bookmarks as string inject into the dom
export default new BookmarksView();
