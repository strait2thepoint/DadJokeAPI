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

document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);