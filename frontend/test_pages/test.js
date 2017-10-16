(()=>{

	function dynamicallyLoadJS(path, callback) {
		var script = document.createElement('script');
			script.onload = function () {
				callback();
			};
		document.body.appendChild(script);
		script.src = path;
	}

	const urlParameters = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
	})(window.location.search.substr(1).split('&'));

	mocha.setup('bdd');

	const path = urlParameters['path'];
	if(path) {
		dynamicallyLoadJS(path, function(){
			mocha.run();
		});
	} else {
		mocha.run();
	}
	

})();