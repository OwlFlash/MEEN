const router = require('express').Router();
const passport = require('passport');


// Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
    res.render('login');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}


// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.render('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', (req, res) => {
    res.redirect('/logged');
});

module.exports = router;