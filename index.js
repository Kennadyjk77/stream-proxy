const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const PLAYER_URL = 'https://player4.spirituallifewell.com/videos/abbd4fae-f28d-41c6-8ff0-1942faf3aec2';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/player', async (req, res) => {
    try {
        const response = await axios.get(PLAYER_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://player4.spirituallifewell.com/',
                'Origin': 'https://player4.spirituallifewell.com'
            }
        });

        let html = response.data;
        // Fix relative static resource links (JS, CSS)
        html = html.replace(/href="\//g, 'href="https://player4.spirituallifewell.com/');
        html.replace(/src="\//g, 'src="https://player4.spirituallifewell.com/');

        res.send(html);
    } catch (error) {
        res.status(500).send('Proxy Player Load Error');
    }
});

app.listen(PORT, () => console.log(`Server active on ${PORT}`));
