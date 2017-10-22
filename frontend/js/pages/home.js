(()=>{
	const favoriteDucks = [
		'bishop',
		'jack',
		'bavarian'
	];

	pd.utils.requestDucks()
		.then(ducks => {
			console.log(ducks);
		})
})();