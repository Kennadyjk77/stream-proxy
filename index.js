const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const TARGET_STREAM = 'https://player4.spirituallifewell.com/videos/abbd4fae-f28d-41c6-8ff0-1942faf3aec2';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.get('/live-proxy', async (req, res) => {
    try {
        const streamUrl = req.query.url || TARGET_STREAM;
        const response = await axios({
            method: 'get',
            url: streamUrl,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://player4.spirituallifewell.com/',
                'Origin': 'https://player4.spirituallifewell.com'
            },
            responseType: 'stream'
        });

        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Proxy Stream Error');
    }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
