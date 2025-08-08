import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { JSDOM } from 'jsdom';

// Define a "shape" for our product object for strong typing
interface Product {
  title: string;
  rating: string;
  reviews: number;
  imageUrl: string;
}

// Create an instance of the Express application and define the port on which the server will run
const app = express();
const port = 3000;

// Enable CORS middleware
app.use(cors());

// Define a GET endpoint on the '/api/scrape' route and get the 'keyword' from the request's query string
app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword as string;

  // Validate that a keyword was provided by the client
  if (!keyword) {
    return res.status(400).json({ error: 'The search "keyword" is mandatory.' });
  }

  // Construct the Amazon search URL
  try {
    const searchUrl = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;

    // Make the HTTP GET request to the Amazon search page using axios
    const { data } = await axios.get(searchUrl, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'pt-BR,pt;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
    });
    
    // Use JSDOM to parse the raw HTML string into a traversable DOM object
    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Select all main product container elements from the page
    const productElements = document.querySelectorAll("[data-component-type='s-search-result']");

    // If no product containers are found, return a 404 error
    if (productElements.length === 0) {
      return res.status(404).json({ error: 'No products found for the provided keyword.' });
    }

    // Initialize an array to store the scraped product data
    const products: Product[] = [];

    // Iterate over each product element to extract its details
    productElements.forEach((productEl: Element) => {
        // Find the title by looking for an h2 tag with the 'a-text-normal' class.
        const title = productEl.querySelector('h2.a-text-normal')?.textContent?.trim();

        // Find the rating text, which is inside a span with the '.a-icon-alt' class.
        const rating = productEl.querySelector('.a-icon-alt')?.textContent?.trim() || 'N/A';
        
        // Find the reviews count text.
        const reviewsText = productEl.querySelector('.a-size-base.s-underline-text')?.textContent?.trim();
        // Clean the text (remove commas/periods) and parse it into an integer.
        const reviews = reviewsText ? parseInt(reviewsText.replace(/[.,]/g, ''), 10) : 0;
        
        // Find the image element and get its 'src' attribute.
        const imageUrl = productEl.querySelector('.s-image')?.getAttribute('src');

        // Only add the product to our list if we successfully found a title and an image URL.
        if (title && imageUrl) {
          products.push({ title, rating, reviews, imageUrl });
        }
    });

    // Send the final array of products back to the client as a JSON response
    res.json(products);

  // Global error handler for the scraping process this will catch network errors or blocks from Amazon
  } catch (error) {
    console.error('Error while scraping:', error);
    res.status(500).json({ error: 'Failed to scrape the site.' });
  }
});

// Start the Express server and make it listen for connections on the specified port
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});

