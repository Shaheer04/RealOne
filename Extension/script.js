const myButton = document.getElementById('myButton');

myButton.addEventListener('click', async function () {
    const [currentTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    sendUrlToGeminiApi(currentTab.url);

});

function sendUrlToGeminiApi(url) {
    const apiUrl = `http://localhost:3000?url=${url}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from Gemini API:', data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}