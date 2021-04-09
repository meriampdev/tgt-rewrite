const fetcher = (url, token) => fetch(url, {
      method: 'GET',
      headers: new Headers({ 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + token 
      }),
      credentials: 'same-origin',
    }).then((res) => res.json())  

export default fetcher