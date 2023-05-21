async function newFormHandler(event) {
    event.preventDefault();

    const jokeSetUp = document.querySelector('input[name="jokeSetUp"]').value;
    const jokePunchLine = document.querySelector('input[name="jokePunchLine"]').value;

    const response = await fetch(`/api/jokes`, {
        method: 'POST',
        body: JSON.stringify({
            jokeSetUp,
            jokePunchLine
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
};

document.querySelector('#new-joke-form').addEventListener('submit', newFormHandler);