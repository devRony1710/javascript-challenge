const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();


const fetchData = url_api => {
  xhttp.open('GET', url_api, false)
  xhttp.responseType = 'json';
  return new Promise((response, reject) => {
    xhttp.onreadystatechange = () => {
      if(xhttp.readyState === 4) {
        if(xhttp.status === 200) {
          const res = JSON.parse(xhttp.responseText)
          return response(res)
        }else {
          return reject(new Error(`Error has ocurred!`))
        }
      }
    }
    xhttp.send()
  })
}

const getData = async url => {
try {
  const first = await fetchData(url)
  console.log('Primer llamado')
  const second = await fetchData(`${API} ${first.results[0].id}`)
  console.log('Segundo llamado')
  const third = await fetchData(second.origin.url)
  console.log('Tercer llamado')

  console.log(`Personajes: ${first.info.count}`);
  console.log(`Primer Personaje: ${second.name}`);
  console.log(`Dimension: ${third.dimension}`);

} catch (error) {
  console.log(error)
}
}

getData(API)