import './style.css'; 

// Get references to the HTML elements we will interact with
const keywordInput = document.querySelector('#keyword-input');
const searchButton = document.querySelector('#search-button');
const resultsContainer = document.querySelector('#results-container');
const statusDiv = document.querySelector('#status');

// Add a click event listener to the search button
searchButton.addEventListener('click', async () => {
    const keyword = keywordInput.value.trim();

    // Validate if the user entered a keyword
    if (!keyword) {
        statusDiv.textContent = 'Por favor, digite um produto para buscar.';
        return;
    }

    // --- Prepare UI for loading state ---
    statusDiv.textContent = 'Buscando... Por favor, aguarde.';
    resultsContainer.innerHTML = ''; // Clear previous results
    searchButton.disabled = true; // Disable button to prevent multiple clicks

    try {
        // Make the API call to our backend
        const response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`);

        // Check if the network request itself was successful
        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }

        const products = await response.json();

        // Check if the API returned an error message
        if (products.error) {
            throw new Error(`Erro da API: ${products.error}`);
        }

        // --- Clear status and render results ---
        statusDiv.textContent = '';

        if (products.length === 0) {
            statusDiv.textContent = 'Nenhum produto encontrado.';
        } else {
            renderProducts(products);
        }

    } catch (error) {
        // Handle any errors that occurred during the fetch process
        console.error('Falha ao buscar produtos:', error);
        statusDiv.textContent = `Erro: ${error.message}. Verifique se o servidor backend está rodando.`;
    } finally {
        // --- Re-enable the button after the process is complete ---
        searchButton.disabled = false;
    }
});

// Function to render the products on the page
function renderProducts(products) {
    products.forEach(product => {
        // Create the main card container
        const card = document.createElement('div');
        card.className = 'product-card';

        // Create and configure the image element
        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.title;

        // Create and configure the title element
        const title = document.createElement('p');
        title.className = 'title';
        title.textContent = product.title;

        // Create and configure the rating element
        const rating = document.createElement('p');
        rating.className = 'rating';
        rating.textContent = product.rating;

        // Create and configure the reviews element
        const reviews = document.createElement('p');
        reviews.className = 'reviews';
        reviews.textContent = `${product.reviews} avaliações`;

        // Append all elements to the card, and the card to the container
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(rating);
        card.appendChild(reviews);
        resultsContainer.appendChild(card);
    });
}

