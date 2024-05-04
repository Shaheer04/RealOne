const myButton = document.getElementById('myButton');

// Add event listener to the button
myButton.addEventListener('click', function() {
        // Get the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            // Extract the URL from the tab object
            const url = tabs[0].url;
            sendUrlToGeminiApi(url);
        });
});

function sendUrlToGeminiApi(url) {
    // Construct the URL to your local server
    const apiUrl = 'http://localhost:3000?url=';

    // Make a GET request to the local server
    fetch(apiUrl)
        .then(response => {
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Handle the response data from the local server
            console.log('Response from Gemini API:', data);
            // You can perform further operations with the response data here
        })
        .catch(error => {
            // Handle any errors that occur during the fetch operation
            console.error('Error fetching data:', error);
        });
}

// Example usage:
sendUrlToGeminiApi('https://www.daraz.pk'); // Replace 'https://example.com' with the actual URL






// function highlightCircle(percentage) {
//     const circle = document.getElementById('circle');
//     // Calculate the angle of the highlight
//     const angle = (percentage / 100) * 360;
//     // Apply the highlight using CSS
//     circle.style.backgroundImage = `conic-gradient(gold ${angle}deg, #ccc ${angle}deg)`;
// }

// // Example usage:
// highlightCircle(66); // Highlight the circle to 75%
