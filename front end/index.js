const form = document.getElementById('form')

const login = (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
  e.target.reset()
  
  const url = 'http://localhost:3000/auth/login'
  const options = {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  }
  fetch(url, options)
  .then(fetchUsers)
  .then(console.log)
  .then(removeLogin)
  .catch(console.error)
  //fetch some users 
  //log users
  //remove login form
}
const removeLogin = () => {
  form.style.display = "none"

}

const fetchUsers = () => {
  const url = 'http://localhost:3000/api/users'
  const options = {
    credentials: 'include'
  }
  return fetch(url, options)
  .then(response => response.json())
}
form.addEventListener('submit', login)
