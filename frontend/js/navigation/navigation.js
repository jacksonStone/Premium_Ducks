window.pd.navigation = (()=>{
	const ACTIVE = 'active-navigation';
	const exp = {
		updatePageAndHash(page) {
			location.hash = "#"+page;
			return exp.updatePage(page);
		},
		updatePage(page){
			page = page || 'home';
			exp.hightlightNavigationItem(page);
			exp.navigate(page)
				.then(exp.handleNewPage);
		},
		hightlightNavigationItem(page) {
			const currentTab = document.getElementById(page);
			const oldActiveTab = document.getElementsByClassName(ACTIVE)[0];
			oldActiveTab && oldActiveTab.classList.remove(ACTIVE);
			currentTab && currentTab.classList.add(ACTIVE);
		},
		navigate(page) {
			return Promise.all([
				pd.utils.request('pages/' + page + '.html'),
				pd.utils.request('js/pages/' + page + '.js'),			
			]);
		},
		handleNewPage(payload) {
			const content = payload[0];
			const js = payload[1];
			const contentWindow = document.getElementById('content');
			const newContentBody = document.createElement('div');
			newContentBody.innerHTML = content;
			while (contentWindow.firstChild) {
    		contentWindow.removeChild(contentWindow.firstChild);
			}
			contentWindow.appendChild(newContentBody);
			eval(js);
		},
	};
	return exp;
})();