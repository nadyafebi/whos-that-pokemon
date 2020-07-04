const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

const dist = '/dist/who-is-that-pokemon';

app.use(express.static(__dirname + dist));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + dist + '/index.html'));
});

app.get('/api/pokemon/:id', async (req, res) => {
    const id = req.params.id;
    let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    result = await result.json();
    res.send(result);
});

app.get('/api/pokemon-species/:id', async (req, res) => {
    const id = req.params.id;
    let result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    result = await result.json();
    res.send(result);
});

// Start the app.
app.listen(process.env.PORT || 8080);
