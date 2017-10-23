((pd) => {
  function placeDucks (ducks) {
  	const numOfFavorites = 6;
    const favoritesContainer = document.getElementById('favorites-container');
		let res = '<div class="single-favorite-container">';
		let duckContainer = document.createElement('div');
    for(let i = 0; i < numOfFavorites/3; i++) {
    	res += '<div class="row">';
    	for(let j = i*3; j < (i*3)+3; j++) {
    		let duck = ducks[j];
    		res += `
    			<div class="col col-4" >
    					<div class="favorite-canvas shadow">
    						<img src="images/${duck.image}">
    					</div>
    					<h6>${duck.title}</h6>
	    		</div>
    		`;
    	}
    	res += '</div>';
    }
    res+='</div>';

    	duckContainer.innerHTML = res;
    	favoritesContainer.appendChild(duckContainer);
    
  }

  pd.utils.requestDucks()
    .then(placeDucks)
})(window.pd)
