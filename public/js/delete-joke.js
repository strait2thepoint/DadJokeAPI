// this code handles the click event on an element with the class 'delete-joke-btn'. It retrieves the joke ID from the URL, sends a DELETE request to the server API to delete the joke with that ID, and performs appropriate actions based on the response received from the server.
async function deleteFormHandler(event) {
    event.preventDefault();

    const jokeId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/jokes/${jokeId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            jokeId: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/homepage');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.delete-joke-btn').addEventListener('click', deleteFormHandler);