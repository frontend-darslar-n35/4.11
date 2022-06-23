async function httpGetUsers() {
    const res = await fetch("http://localhost:8081/api/users")
    const response = await res.json()
    return response
}

async function httpPostUser(data) {
    const res = await fetch("http://localhost:8081/api/users", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const response = await res.json()
    return response
}

async function httpDeleteUser(id) {
    const res = await fetch(`http://localhost:8081/api/users/${id}`, {
        method: "DELETE"
    })
    const response = await res.json()
    return response
}


async function httpDeleteUser(id, data) {
    const res = await fetch(`http://localhost:8081/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const response = await res.json()
    return response
}

