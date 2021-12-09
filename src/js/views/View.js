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
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup(); //generate new markup and compare new html to old and change tags and attributes

    //create new dom object
    const newDOM = document.createRange().createContextualFragment(newMarkup); // creates virtual dom with real dom node objects
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*")); //convert from nodelist to array
    // console.log(curElements);
    // console.log(newElements); //compare new dom to current dom
    newElements.forEach((newEl, i) => {
      //loop over two arrays at the same time give cur element same index
      const curEl = curElements[i];
      //console.log(curEl, newEl.isEqualNode(curEl)); //compare nodes current one with old one

      //update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        //check if the element has only text (text node)
        //first childnode is text node
        //if new element NOT equal to current element
        // console.log(`x`, newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent; //just doing this replaces container text content entireley
      } //get text out of element if no text the replacemend doesn't happen

      //update changed attributes

      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes)); //log attributes propery of all elements that have changed convert this object to array
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
