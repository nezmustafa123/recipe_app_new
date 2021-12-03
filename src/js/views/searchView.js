class SearchView {
  //select a parent element
  _parentEl = document.querySelector(".search");

  getQuery() {
    //get query listen to click event on button
    //get child element using queryselector
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput();
    return query; //get query clear input return query
  }

  _clearInput() {
    return (this._parentEl.querySelector(".search__field").value = "");
  }
  addHandlerSearch(handler) {
    //publisher
    //if user clicks button or hits enter
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler(); //call the handler function control search results
    });
  }
}

export default new SearchView();
//export instance of object
