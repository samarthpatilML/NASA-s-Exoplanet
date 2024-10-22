const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());  // Enable CORS
app.use(express.static('public'));  // Serve static files

// Route to fetch star data
app.get('/api/stars', async (req, res) => {
    const starName = req.query.star;  // Get the star name from the query
    try {
        // Example using a different astronomy API (you need an API key from the chosen service)
        const response = await axios.get('https://api.le-systeme-solaire.net/rest/bodies/', {
            params: {
                filter: `englishName eq ${starName}`
            }
        });

        const stars = response.data.bodies;

        if (!Array.isArray(stars) || stars.length === 0) {
            return res.status(404).json({ error: 'Star not found' });
        }

        // Return the first star found
        const star = stars[0];
        res.json(star);  // Send star data back to the frontend
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching star data' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
