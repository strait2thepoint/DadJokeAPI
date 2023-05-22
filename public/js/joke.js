
// Step 1: Retrieve the div element
const myDiv = document.getElementById('rickroll');

// Step 2: Attach an event listener
myDiv.addEventListener('click', function() {
  // Create a video element
  const iframe = document.createElement('iframe');
  
  // Set attributes and source for the iframe
  iframe.width = '560';
  iframe.height = '315';
  iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  iframe.title = 'YouTube video player';
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  
  // Append the iframe element to the div
  myDiv.appendChild(iframe);
});
