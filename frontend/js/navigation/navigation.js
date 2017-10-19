window.pd.navigation = (()=>{
	const exp = {
		updatePage(){
			const hash = location.hash.substring(1);
			this.navigate(hash)
				.then(exp.populateBodyContent);
		},
		navigate(hash) {
			return pd.utils.request('pages/' + hash + '.html');
		},
		populateBodyContent(content) {
			const contentWindow = document.getElementById('content');
			const newContentBody = document.createElement('div');
			newContentBody.innerHTML = content;
			while (contentWindow.firstChild) {
    		contentWindow.removeChild(contentWindow.firstChild);
			}
			contentWindow.appendChild(newContentBody);
		}
	};
	return exp;
})();