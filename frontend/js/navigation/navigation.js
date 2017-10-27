window.pd.navigation = (()=>{
	const ACTIVE = 'active-navigation';
	const pagesAlreadyVisited = {};
	const exp = {
		updateHash(hash) {
			location.hash = "#"+hash;
		},
		updatePage(page){
			page = page || 'home';
			exp.hightlightNavigationItem(page);
			exp.navigate(page)
				.then((payload) => {
					return exp.handleNewPage(payload, page)
				});
		},
		hightlightNavigationItem(page) {
			const currentTab = document.getElementById(page),
				oldActiveTab = document.getElementsByClassName(ACTIVE)[0];
			oldActiveTab && oldActiveTab.classList.remove(ACTIVE);
			currentTab && currentTab.classList.add(ACTIVE);
		},
		navigate(page) {
			return Promise.all([
				pd.utils.cachedRequest('pages/' + page + '.html'),
				pd.utils.cachedRequest('js/pages/' + page + '.js'),
			]);
		},
		handleNewPage(payload, page) {
			window.scrollTo(0, 0);

			const content = payload[0],
				js = payload[1],
				contentWindow = document.getElementById('content'),
				newContentBody = document.createElement('div');
			
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