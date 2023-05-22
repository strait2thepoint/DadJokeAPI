//
//We would like to loop through each delete button that has the joke.id attached to it, so that we are deleting each joke. 
//We need to target each delete button with a for loop?
//
var danger = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < elements.length; i++){
    elements[i].addEventListener("click", removeItem);
};

const removeItem = async(event) => {
const jokeId = event.target.getAttribute("danger");
await fetch (danger, {method: "DELETE"});
 
    //   ..get the attribute data-id
//api/jokes/:id

};



// //from AI, we need to work with adapting it to fit our issue
// const removeItem = async (event) => {
//   const jokeId = event.target.getAttribute("data-id");
//   // Make a request to delete the joke using the jokeId
//   await fetch(`/api/jokes/${jokeId}`, { method: "DELETE" });
//   // Handle the response or perform any other necessary actions
// };
