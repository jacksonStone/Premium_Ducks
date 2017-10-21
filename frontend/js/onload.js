(()=>{
	function renderHash() {
		const hash = location.hash.substring(1);
		pd.navigation.updatePage(hash);
	}
	window.onhashchange = function() {
 		renderHash();
	};
	renderHash();
})();