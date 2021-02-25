const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const cartRouter = require('./routes/cartRoute');
const mainRouter = require('./routes/mainRoute');
const productsRouter = require('./routes/productsRoute');
const usersRouter = require('./routes/usersRoute');

const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views/'));
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor exitosamente inciado en el pruerto 3000.');
});

app.use('/', mainRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use((req, res, next) => {
    res.status(404).send('No se ha encontrado la página requerida.');
    next();
});
