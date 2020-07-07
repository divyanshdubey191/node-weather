console.log('Client side javascript is loaded.........')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading....'
    messagetwo.textContent = ''

    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messagetwo.textContent = ''
        }
        else{
            messageOne.textContent = data.location
            messagetwo.textContent = data.forecast
        }
    })
})
})