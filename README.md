Amazon Classification Scrapper README
Run Node API and Static HTML Page
Prerequisites
Node.js installed on your machine. Download it from nodejs.org.
Steps
Clone the Repository:

bash
Copy code
git clone <https://github.com/Gabriel-ADM/Amazon-Scraper-2>
cd <Amazon-scraper-2>
Setup Node API:

bash
Copy code
cd api
npm install
node server.js
The API server will start at http://localhost:3333.

Setup Static HTML Page:

Open the html file with a browser of yor choice or open a new terminal window.

bash
Copy code
cd web-page
Run a Simple Server:

If you have Python installed:

bash
Copy code
# For Python 3
python -m http.server

Open Your Browser:

Navigate to http://localhost:8000 (or the port specified by the server).

Interact:

Open the static HTML page, click the "Submit Search" button, and observe the result.