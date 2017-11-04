((pd) => {
  pd.utils = {

    request (url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = () => resolve(xhr.responseText)
        xhr.onerror = () => reject(xhr.statusText)
        xhr.send()
      })
    },

    requestDucks () {
      return pd.utils.cachedRequest('ducks')
        .then(result => {
          const duckData = JSON.parse(result)
          pd.duckData = duckData
          return duckData
        })
    },

    cachedRequest (url) {
      if (!pd._cachedRequests) {
        pd._cachedRequests = {}
      }
      console.log(url);
      const cachedValue = pd._cachedRequests[url]
      if (cachedValue !== undefined) {
        return Promise.resolve(cachedValue)
      }

      return pd.utils.request(url)
        .then(content => {
          pd._cachedRequests[url] = content
          return content
        })
    }
  }
})(window.pd)
