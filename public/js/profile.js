const newFormHandler = async (event) => {
  event.preventDefault();

  const jokeSetUp = document.querySelector('#jokeSetUp').value.trim();
  const jokePunchLine = document.querySelector('#jokePunchLine').value.trim();


  if (jokeSetUp && jokePunchLine) {
    const response = await fetch(`/api/jokes`, {
      method: 'POST',
      body: JSON.stringify({ jokeSetUp, jokePunchLine }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
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
      document.location.replace('/profile');
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
