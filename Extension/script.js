// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (tab.url.match(/daraz\.pk./)) {
//         document.getElementsByClassName('.text')[0].style.display = 'none';
//     } else {
//         document.getElementsByClassName('.complete-analysis')[0].style.display = 'none';
//     }
// })

const myButton = document.getElementById('myButton');

myButton.addEventListener('click', async function () {

    const [currentTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    myButton.style.cssText = 'display:none;'
    document.querySelector('.spinner').style.cssText = 'display:block;'
    await sendUrlToGeminiApi(encodeURIComponent(currentTab.url));

});

async function sendUrlToGeminiApi(url) {
    const apiUrl = `http://localhost:3000?url=${url}`;

    fetch(apiUrl)
        .then((response) => response.text())
        .then((result) => {

            var response = JSON.parse(result.toString());
            if (response.error) {
                console.error(response.error);
                alert('Error: ' + response.error)
                return;
            }

            document.getElementById('positivePoints').innerText = response.PositivePoints;
            document.getElementById('negativePoints').innerText = response.NegativePoints;
            document.getElementById('insights').innerText = response.Insights;
            document.getElementById('score').innerText = response.MatchScore;

            document.getElementsByClassName('gauge')[0].style.cssText = `width: 300px; --rotation:${response.MatchScore * 18}deg; --color:#5cb85c; --background:#e9ecef;`;
            myButton.style.cssText = 'display:block;'
            document.querySelector('.spinner').style.cssText = 'display:none;'
        })
        .catch((error) => console.error(error));
}