window.pd.navigation = (()=>{
	const ACTIVE = 'active-navigation';
	const exp = {
		updatePage(page){
			page = page || 'home';
			exp.hightlightNavigationItem(page);
			exp.navigate(page)
				.then(exp.populateBodyContent);
		},
		hightlightNavigationItem(page) {
			const currentTab = document.getElementById(page);
			const oldActiveTab = document.getElementsByClassName(ACTIVE)[0];
			oldActiveTab && oldActiveTab.classList.remove(ACTIVE);
			currentTab && currentTab.classList.add(ACTIVE);
		},
		navigate(page) {
			return pd.utils.request('pages/' + page + '.html');
		},
		populateBodyContent(content) {
			const contentWindow = document.getElementById('content');
			const newContentBody = document.createElement('div');
			newContentBody.innerHTML = content;
			while (contentWindow.firstChild) {
    		contentWindow.removeChild(contentWindow.firstChild);
			}
			contentWindow.appendChild(newContentBody);
		},
	};
	return exp;
})();