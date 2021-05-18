const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const cookies = require('cookie-parser');

const userLoggedMiddleware = require('./middlewares/users/userLoggedMiddleware');

const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views/'));
app.use(express.static(publicPath));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookies());
app.use(session({
    secret: 'There is a secret in this app.',
    resave: false,
    saveUninitialized: false
}));
app.use(userLoggedMiddleware);


app.listen(process.env.PORT || 4000, () => {
    console.log('Servidor exitosamente inciado en el pruerto 4000.');
});

// Routes

const cartRouter = require('./routes/cartRoute');
const mainRouter = require('./routes/mainRoute');
const productsRouter = require('./routes/productsRoute');
const usersRouter = require('./routes/usersRoute');
const categoriesRouter = require('./routes/categoriesRoute');

app.use('/', mainRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

app.use((req, res, next) => {
    res.status(404).send('No se ha encontrado la página requerida.');
    next();
});