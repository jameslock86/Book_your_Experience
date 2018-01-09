const express = require('express');
const router = express.Router();
const https = require('https');
const axios = require('axios');
const trendingURL = 'http://api.yummly.com/v1/api/recipes?_app_id=dbc75cfa&_app_key=26ab8720b15d24946a036eac04af1622&q=dinner&allowedIngredient[]=rosemary&allowedIngredient[]=butter&allowedIngredient[]=onion&allowedIngredient[]=bacon&allowedIngredient[]=spinach&requirePictures=true'
let trend;
let single;
let fridgeData;

//gets trending foods list
axios
  .get(trendingURL)
  .then(response => {
    trend = response
    console.log(Object.values(trend.data.matches[0].imageUrlsBySize));
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

router.get('/fridge-recipes', (req, res) => {
  const main = req.query.main.toLowerCase();
  const primary = req.query.primary.toLowerCase();
  const secondary = req.query.secondary.toLowerCase();
  const secondary2 = req.query.secondary2.toLowerCase();
  const fridgeURL = `http://api.yummly.com/v1/api/recipes?_app_id=dbc75cfa&_app_key=26ab8720b15d24946a036eac04af1622&q=${main}&allowedIngredient[]=${primary}&allowedIngredient[]=${secondary}&allowedIngredient[]=${secondary2}&requirePictures=true`;

  axios
    .get(fridgeURL)
    .then(response => {
      fridgeData = response
      console.log(fridgeData.data.matches[0].id);
      res.render('fridge-recipes', {user: req.user, fridgeData: fridgeData});
    })
    .catch(error => {
      console.log(error);
      res.send('no recipes match your search');
    });
});

router.get('/edit-profile', (req, res) => {
  res.render('edit-profile', {user: req.user})
})

// router.get('/fridge-recipes', (req, res) => {
//   res.render('fridge-recipes')
// })

//gets single recipe based on api id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const singleURL = `http://api.yummly.com/v1/api/recipe/${id}?_app_id=dbc75cfa&_app_key=26ab8720b15d24946a036eac04af1622&q=requirePictures=true`;

  axios
    .get(singleURL)
    .then(response => {
      single = response
      // console.log(single.data);
      res.render('recipe', {user: req.user, recipe: single});
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
