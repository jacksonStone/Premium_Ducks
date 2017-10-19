(()=>{
	const hash = location.hash.substring(1);
	pd.navigation.updatePage(hash);
})();