
// 200 OK
// 201 Created
// 301 Redirect
// 400 Bad Request
// 401 Unauthorized
// 403 Forbidden Access
// 404 not found
// 405 Methon not allowed
// 500 Internal Server Error
// 503 Bad Gateway


// function httpFunction(url, {
//     method,
//     headers
// }) {

//     return new Promise((resolve, reject) => {
//         var xhr = new XMLHttpRequest()
//         xhr.open(method, url)
//         xhr.onprogress = function (data) {
//             // console.log(Math.round(data.loaded * 100 / (data.total)))
//         }
//         xhr.abort = function (reason) {
//             reject(reason)
//         }
//         xhr.onload = function (res) {
//             resolve(JSON.parse(res.target.response))
//         }
//         xhr.onloadstart = function () {
//             console.log("Processing started")
//         }
//         xhr.onloadend = function () {
//             console.log("Processing finished")
//         }
//         xhr.send()
//     })

// }

// httpFunction("https://jsonplaceholder.typicode.com/users", {
//     method: "GET"
// }).then(result => {
//     console.log(result)
// }).catch(err => {
//     console.error(err)
// })
// window.location.href = "http://www.google.com"

// var clockEl = document.querySelector(".clock")
// var i = 0


// const clock = setInterval(() => {
//     const date = new Date()
//     const hours = date.getHours()
//     const minutes = date.getMinutes()
//     const seconds = date.getSeconds()
//     clock.textContent = `${hours}:${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
// }, 1000)

// const wakeup = new Date("2022-06-20 19:34:56");

// function setAlarm(date) {
//     console.log()
//     setTimeout(() => {
//         console.log(`Soat:${new Date()} bo'ldi uyg'oning`)
//     }, date - new Date())
// }

// setAlarm(wakeup)


// const timeout1 = setTimeout(() => {
//     console.log("3sekund o'tdi")
//     // clearInterval(timer1)
// }, 3000)
// const timer1 = setInterval(() => {
//     console.log(i)
//     if (i == 1) clearTimeout(timeout1)
//     if (i == 2) clearInterval(timer1)
//     i++
// }, 1000)

document.body.addEventListener("click", async (event) => {
    if (event.target.dataset.task == 'delete-user') {
        const result = await httpDeleteUser(event.target.dataset.userId)
        if (result) {
            renderUsers()
        }
    }
})




var userContainer = document.querySelector('.user-container')
var userElTemplate = document.querySelector("#user")

var myForm = document.querySelector('.myform')
var email = document.querySelector('.email')
var password = document.querySelector('.password')
var phone = document.querySelector('.phone')
var firstname = document.querySelector('.firstname')
var lastname = document.querySelector('.lastname')

myForm.addEventListener('submit', async event => {
    event.preventDefault()
    const data = {
        email: email.value,
        phone: phone.value,
        firstname: firstname.value,
        lastname: lastname.value,
        password: password.value,
    }
    const result = await httpPostUser(data)
    if (result) {
        renderUsers()
        myForm.reset()
    }
    console.log(data)
    console.log(result)
})
renderUsers()

async function renderUsers() {
    const users = await httpGetUsers()
    userContainer.innerHTML = null
    if (!users || users <= 0) {
        userContainer.innerHTML = "Userlar yo'q "
        return
    }
    let fragment = new DocumentFragment()
    users.forEach(user => {
        fragment.appendChild(createUserEl(user))
    });

    userContainer.appendChild(fragment)
    console.log(users)
}


function createUserEl(user) {
    let userEl = userElTemplate.content.cloneNode(true)
    userEl.querySelector(".info").textContent = `ID:${user.id} ${user.firstname} ${user.lastname}`
    userEl.querySelector(".delete-btn").dataset.userId = user.id
    userEl.querySelector(".delete-btn").dataset.task = "delete-user"
    return userEl
}