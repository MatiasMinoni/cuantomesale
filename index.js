import { next } from 'cheerio/lib/api/traversing';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local'
LocalStrategy.Strategy;
const app = express();
const PORT = process.env.PORT || 3000;
const engine = handlebars.create({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials',
    extname: 'hbs'
});


app.engine('hbs', engine.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000 }
}));
passport.use(new LocalStrategy.Strategy(
    function (username, password, done) {
        if (username === 'admin' && password === 'admin') {
            return done(null, { username: 'admin', password: 'admin' });
        } else {
            return done(null, false, { message: 'Incorrect username.' });
        }
    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {




});




app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    }
);
