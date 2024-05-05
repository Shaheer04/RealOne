# Introduction
An AI chromium-based extension, created to optimize online buying experience. 
Product reviews can be a lot to read and getting a sense of the product quality and authenticity can be challenging. 
This extension summarizes image reviews and text reviews and gives them a score of how much the delivered product matches the product shown by the seller.
Gemini is used in this extension as the base model for the analysis of text and images.


# Install Node Packages:
1.	Install Node.js: Download and install Node.js from the official website. Node.js comes with npm (Node Package Manager) bundled with it. 
https://nodejs.org/en/download
2.	Install Required Packages: Use npm to install the required packages for your project. For a web scraping extension using Puppeteer. Install Puppeteer by typing this command at the terminal:
    npm install puppeteer
3.	Create a .env file in the API directory which will contain Gemini's API Key:
       - API_Key=[Your-API-Key]
4. Start NPM: After installing packages, you can start using NPM commands.


# Importing the extension into Chrome/Edge
1.	Download the extension files: Clone this repository by typing in “git clone https://github.com/Shaheer04/RealOne.git” in a command prompt at the destination you want to download the files
2.	Open Chrome Extensions page: Open Google Chrome and go to the "Extensions" page. You can access it by clicking the three dots in the top-right corner, then selecting "More tools" > "Extensions," or by typing chrome://extensions/ in the address bar and hitting Enter.
3.	Enable Developer Mode: Toggle on the "Developer mode" option located in the top-right corner of the Extensions page.
4.	Load the extension: Click on the "Load unpacked" button that appears after enabling Developer mode. Navigate to the directory where you have the extension files saved, and select the folder containing the extension files.
5.	Confirm installation: Once selected, the extension should be loaded into Chrome. You'll see its icon appear in the Chrome toolbar, indicating that it's now active.
6.	Test the extension: You can now test the functionality of the extension by interacting with it in Chrome as you would with any other extension. 
