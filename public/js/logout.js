//this code handles the click event on an element with the ID 'logout'. When clicked, it sends a POST request to the server API to perform the logout process. After a successful logout, the user is redirected to the homepage. If an error occurs during the logout process, an alert message is displayed.
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
