// this code handles the form submission event for an edit form. It retrieves the updated joke setup and punch line from the input fields, sends a PUT request to the server API to update the joke with the provided data, and performs appropriate actions based on the response received from the server.
async function editFormHandler(event) {
    event.preventDefault();

    const jokeSetUp = document.querySelector('input[name="jokeSetUp"]').value.trim();
    const jokePunchLine = document.querySelector('input[name="jokePunchLine"]').value.trim();
    console.log(jokeSetUp);
    console.log(jokePunchLine);

    const jokeId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/jokes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            jokeId: id,
            jokeSetUp,
            jokePunchLine
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.edit-joke-form').addEventListener('submit', editFormHandler);