describe("Ducks",() => {

	var checkHTML = function(html) {
	  var doc = document.createElement('div');
	  doc.innerHTML = html;
	  return ( doc.innerHTML === html );
	}

	beforeEach(function() {
		return pd.navigation.updatePage('ducks');
	});

	it("Duck page scripts", () => {
		assert(!!pd.pages.ducks, 'pages object exists');
		assert(checkHTML(pd.pages.ducks.getDuckHTML({
	    "name": "sigmond",
	    "image": "sigmond.jpg",
	    "joke": "Bugs so bad you need to see a shrink? Or maybe an <i>ego</i> boost? This duck can help.",
	    "by": "Duckshop",
	    "link": "http://amzn.to/2yG0xzK",
	    "buy": "Start blaming your mother",
	    "title":"Sigmond"
	  })), 'Produces valid html');
	});

	it("Duck Data validation", () => {
		const expectedDuckProps = [
			 "name", "image", "joke", "by", "link", "buy", "title"
		];
		return pd.utils.cachedRequest('ducks')
			.then((duckData)=>{
				assert(!!pd.duckData, 'Have fetched duckdata on load');
				for(let i in pd.duckData) {
					let duck = pd.duckData[i];
					for(let j in expectedDuckProps) {
						let prop = expectedDuckProps[j]
						assert(!!duck[prop], 'Duck: ' + duck.name + ' has property: ' + prop);
					}
				}
			});
	});
});

