
export const setuthToken = user => {
  const currentUser = {
    email: user.email
  }

  // Save user in db & get token

  fetch(`${process.env.REACT_APP_API_URL}/user/${user?.email}`,{
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(currentUser)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    localStorage.setItem('aircnc-token', data.token)
  })
  .catch(err => console.error(err))
  }