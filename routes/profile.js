const express = require('express');
const router = express.Router();
const https = require('https');
const axios = require('axios');
const trendingURL = 'http://api.yummly.com/v1/api/recipes?_app_id=dbc75cfa&_app_key=26ab8720b15d24946a036eac04af1622&q=fried+chicken&requirePictures=true'
var trend;

axios
  .get(trendingURL)
  .then(response => {
    trend = response
    console.log(trend);
  })
  .catch(error => {
    console.log(error);
  });




var authCheck = (req,res,next) => {
  if(!req.user) {
    //if user is not logged in
    res.redirect('/auth/login')
  } else {
    //if logged in
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  res.render('profile', {user: req.user, foodTrend: trend})
});

router.get('/edit-profile', (req, res) => {
  res.render('edit-profile', {user: req.user})
})

router.get('/recipe', (req, res) => {
  res.render('recipe', {user: req.user, foodTrend: trend})
})

module.exports = router;
