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