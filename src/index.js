const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')
const request = require('superagent')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');




//Inicio
const app = express();
//Configuraciones

app.set('port', process.env.PORT || 4040);


app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),

}));

app.use(session({
    secret: 'faztmysqlnodesession',
    resave: false,
    saveUninitialized: false,

}));
//peticiones
app.set('view engine', '.hbs');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
});
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




//rutas
app.use(require('./routes'));
app.use(require('./routes/index'));
app.use('/auth/', require('./routes/authentication'));
app.use('/admin/', require('./routes/admin'));
app.use('/user/', require('./routes/user'));
app.use('/noticias/', require('./routes/noticias'));





//public

app.use(express.static(path.join(__dirname, '/public/')));



//inicia el serve
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});