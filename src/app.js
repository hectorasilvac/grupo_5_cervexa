const express = require('express');
const path = require('path');

const cartRouter = require('./routes/cart');
const mainRouter = require('./routes/main');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');

const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views/'));
app.use(express.static(publicPath));

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor exitosamente inciado en el pruerto 3000.');
});

app.use(mainRouter);
app.use('/cart', cartRouter);
app.use('/items', itemsRouter);
app.use('/users', usersRouter);
