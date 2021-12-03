import View from "./View.js";

class ResultsView extends View {
  //extends view
  _parentElement = document.querySelector(".results");

  _generateMarkup() {
    //needs this method to user in render method
    console.log(this._data); //loop through create string with preview blocks for each data result
    return this._data.map(this._generateMarkupPreview).join(""); //instead of writing the code into the map method just call the other method inside it
  }

  _generateMarkupPreview() {
    return `
    <li class="preview">
            <a class="preview__link preview__link--active" href="#23456">
              <figure class="preview__fig">
                <img src="src/img/test-1.jpg" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
                <p class="preview__publisher">The Pioneer Woman</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultsView();
