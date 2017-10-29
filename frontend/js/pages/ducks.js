((pd) => {
  function placeDucks (ducks) {
    const ducksContainer = document.getElementById('ducks-container')
    for (let i = 0; i < ducks.length; i++) {
      const duckContainer = document.createElement('div')
      duckContainer.className = 'duck-container'
      let duck = ducks[i]
      duckContainer.innerHTML = getDuckHTML(duck)
      ducksContainer.appendChild(duckContainer)
    }
  }

  function getDuckHTML (duck) {
    return `
       <div class="row">
        <div class="col-4">
          <div class="duck-picture-and-credit">
            <button onclick="pd.utils.makeMoney('${duck.link}')" class="favorite-canvas shadow" style="background-image:url('images/${duck.image}')">
            </button>
            <div class="duck-credit">Source: ${duck.by}</div>
          </div>
        </div>
        <div class="col-8">
          <div class="duck-info">
            <div class="duck-title-bar">
              <h6>${duck.title}<span>★★★★★</span></h6>
            </div>
            <p class="duck-joke">${duck.joke}</p>
            <button onclick="pd.utils.makeMoney('${duck.link}')">${duck.buy}</button>
          </div>
        </div>
      </div>
    `
  }

  pd.pages = pd.page || {}
  // Export so we can test
  pd.pages.ducks = {
    getDuckHTML: getDuckHTML
  }

  pd.utils.requestDucks()
    .then(placeDucks)
})(window.pd)
