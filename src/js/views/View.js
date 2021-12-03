import icons from "url:../../img/icons.svg";

export default class View {
  //create view class as parent will not create an instance
  //create other views as instances of it
  //export class itself will not create instance of it
  _data;
  render(data) {
    //all views will have this
    //when render method called and recieves data check that it exists
    if (!data || (Array.isArray(data) && data.length === 0))
      //if no dadta or if there is data but is empty array
      return this.renderError(); //data still comes back as empty array
    this._data = data;
    const markup = this._generateMarkup();
    this._clear(); //run clear method here
    this._parentElement.insertAdjacentHTML("afterbegin", markup); //inject markup into html afterbegin
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    //attach to any parent element passed in here
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    //defailt error message
    //replace with icons variable
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this_searchMessage) {
    //defailt error message
    //replace with icons variable
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
      `;
    this_clear();
    this_parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
