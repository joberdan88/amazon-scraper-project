# Amazon Product Search Scraper
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

This project is a simple web scraper for Amazon's search results, developed as a test project for a Junior Full Stack Developer Trainee position. The application allows a user to enter a keyword, and the backend scrapes the first page of search results from Amazon, returning a list of products to be displayed on the frontend.

## Features
- Scrapes product data from the first page of Amazon search results for a given keyword.
- Extracts product title, rating, number of reviews, and image URL for each item.
- Backend API built with Bun and Express, providing data in JSON format.
- Simple, clean, and responsive frontend built with Vite and Vanilla JavaScript to display the results.
- Graceful error handling for both backend and frontend operations.

## Technologies Used
#### Backend
- **Bun:** JavaScript runtime and toolkit.
- **Express:** Web server framework for Node.js.
- **Axios:** Promise-based HTTP client for making requests to Amazon.
- **JSDOM:** A pure-JavaScript implementation of web standards for parsing the HTML structure.
- **TypeScript:** For static typing and improved code quality.

#### Frontend
- **Vite:** Next-generation frontend tooling for a fast development experience.
- **Vanilla JavaScript:** For DOM manipulation and API communication.
- **HTML5 & CSS3:** For structure and styling.


## Project Setup
To set up and run this project locally, you will need to have [Bun](https://bun.sh/) installed.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)
    ```
    *(Don't forget to replace the URL with your own repository's URL)*

2.  **Navigate to the project directory:**
    ```bash
    cd amazon-scraper-project
    ```

3.  **Install backend dependencies:**
    ```bash
    cd backend
    bun install
    ```

4.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    bun install
    ```

## How to Run the Application
To run the application, you will need two separate terminal windows open, one for the backend and one for the frontend.

#### **Terminal 1: Start the Backend API**
Navigate to the backend directory and start the server. The `--hot` flag enables hot-reloading.
```bash
# From the project's root directory:
cd backend
bun --hot src/index.ts

The API server will be running at http://localhost:3000.

Terminal 2: Start the Frontend Application
Navigate to the frontend directory and start the Vite development server.

# From the project's root directory:
cd frontend
bun dev

The application will be accessible at the URL provided by Vite, typically http://localhost:5173.

Development Challenge & Solution
A significant challenge during development was handling Amazon's robust anti-scraping measures, which would often return a 503 Service Unavailable error, blocking the request. This was overcome by implementing a comprehensive set of realistic HTTP headers in the axios request to more closely mimic a real browser, thus increasing the success rate of the scraping process.

