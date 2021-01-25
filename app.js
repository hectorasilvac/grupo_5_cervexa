const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');

app.use( express.static(publicPath) );

app.listen(3000, () => {
    console.log('Servidor exitosamente inciado en el pruerto 3000.');
});

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});
app.get('/registro', function(req, res) {
    res.sendFile(path.resolve(__dirname, './views/registro.html'));
});