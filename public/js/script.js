const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')




weatherForm.addEventListener("submit", (e) => { 
    //prevent reloading of the page when a search is made
    e.preventDefault()
    const location = search.value;
    const url = `/weather?address=${location}`
    messageOne.textContent  = "Loading..."
    messageTwo.textContent = ""
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
        .catch(error => console.log(error.message ))
    })

 