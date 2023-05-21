//Overall, this code handles form submission to create jokes and button clicks to delete jokes. It communicates with the server-side API endpoints to perform these actions and updates the UI accordingly.
const newFormHandler = async (event) => {
  event.preventDefault();

  const jokeSetUp = document.querySelector('#joke-name').value.trim();
  const jokePunchLine = document.querySelector('#joke-desc').value.trim();


  if (jokeSetUp && jokePunchLine) {
    const response = await fetch(`/api/jokes`, {
      method: 'POST',
      body: JSON.stringify({ jokeSetUp, jokePunchLine }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create joke');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/jokes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete joke');
    }
  }
};

document
  .querySelector('.new-joke-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.joke-list')
  .addEventListener('click', delButtonHandler);

