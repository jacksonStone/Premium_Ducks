(()=>{
	function renderHash() {
		const hash = location.hash.substring(1);
		pd.navigation.updatePage(hash).then(console.log)
	}
	window.onhashchange = function() {
 		renderHash();
	};
	console.log("CALLED ONLOAD");
	renderHash();
})();