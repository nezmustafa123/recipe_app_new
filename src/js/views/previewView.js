import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PreviewView extends View {
  //extends view
  _parentElement = "";

  _generateMarkup() {
    //if result id is same as current id in url give class
    const id = window.location.hash.slice(1); //get id from first element
    return `
    <li class="preview">
            <a class="preview__link ${
              this._data.id === id ? "preview__link--active" : ""
            }"  href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new PreviewView();
//only generate one preview element
