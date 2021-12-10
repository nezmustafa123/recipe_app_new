import View from "./View.js";
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  //extends view
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "No recipes found for your query, enter another search string!";
  _searchMessage = "";

  _generateMarkup() {
    //needs this method to user in render method
    console.log(this._data); //loop through create string with preview blocks for each data result
    return this._data.map(this._generateMarkupPreview).join(""); //instead of writing the code into the map method just call the other method inside it
  }

  _generateMarkupPreview(result) {
    //if result id is same as current id in url give class
    const id = window.location.hash.slice(1); //get id from first element
    return `
    <li class="preview">
            <a class="preview__link ${
              result.id === id ? "preview__link--active" : ""
            }"  href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new BookmarksView();
