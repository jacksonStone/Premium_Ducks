window.pd.navigation = (()=>{
	const navigationMapping = {

	};
	return {
		updatePage(){
			debugger;
			const hash = location.hash.substring(1);
			const bodyContent = this.navigate(hash);
			populateBodyContent(bodyContent);
		},
		navigate(hash) {

		},
		populateBodyContent(content) {

		}

	}
})();