((pd) => {
  function placeDucks (ducks) {
    const ducksContainer = document.getElementById('ducks-container')
    for (let i = 0; i < ducks.length; i++) {
      const duckContainer = document.createElement('div')
      duckContainer.className = 'duck-container'
      let duck = ducks[i]
      duckContainer.innerHTML = `
            <div class="row">
              <div class="col col-3 duck-picture-and-credit">
                <button onclick="pd.utils.makeMoney('${duck.link}')" class="favorite-canvas shadow">
                  <img src="images/${duck.image}">
                </button>
                <div class="duck-credit">Source: ${duck.by}</div>
              </div>
              <div class="col col-9 duck-info">
                <div class="duck-title-bar">
                  <h6>${duck.title}<span>★★★★★</span></h6>
                  
                </div>
              </div>
              
            </div>
        `
      ducksContainer.appendChild(duckContainer)
    }
  }

  pd.utils.requestDucks()
    .then(placeDucks)
})(window.pd)
