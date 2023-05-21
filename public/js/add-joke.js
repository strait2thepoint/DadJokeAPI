//Overall, this code handles form submission, sends a POST request to create a new joke using the form input values, and handles the response accordingly.
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
        document.location.replace('/allJokes');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#new-joke-form').addEventListener('submit', newFormHandler);