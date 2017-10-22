pd.utils.request = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};

pd.utils.requestDucks = name => {
	if(pd.duckData) {
		//In memory cache
		return new Promise(resolve=>{
			resolve(pd.duckData);
		});
	}
  return pd.utils.request('ducks')
  	.then(result => {
  		const duckData = JSON.parse(result);
  		pd.duckData = duckData;
  		return duckData;
  	});
};