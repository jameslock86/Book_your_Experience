const express = require('express');
const router = express.Router();
const https = require('https');
const axios = require('axios');
<<<<<<< HEAD
const trendingURL = 'http://api.yummly.com/v1/api/recipes?_app_id=dbc75cfa&_app_key=26ab8720b15d24946a036eac04af1622&q=dinner&allowedIngredient[]=rosemary&allowedIngredient[]=butter&allowedIngredient[]=onion&allowedIngredient[]=bacon&allowedIngredient[]=spinach&requirePictures=true'
let trend;
let single;
let fridgeData;
=======
const trendingURL = 'http://api.yummly.com/v1/api/recipes?_app_id=dbc75cfa&_app_key=26ab8720b15d24946a036eac04af1622&q=fried+chicken&requirePictures=true';
var trend;
>>>>>>> f59e95e9eb8d433fe253ebb5d70343986da38889

//gets trending foods list
axios
<<<<<<< HEAD
  .get(trendingURL)
  .then(response => {
    trend = response
    console.log(Object.values(trend.data.matches[0].imageUrlsBySize));
  })
  .catch(error => {
    console.log(error);
  });




=======
	.get(trendingURL)
	.then(response => {
		trend = response;
		//console.log(trend);
	})
	.catch(error => {
		//console.log(error);
	});
>>>>>>> f59e95e9eb8d433fe253ebb5d70343986da38889
var authCheck = (req,res,next) => {
	if(!req.user) {
		//if user is not logged in
		res.redirect('/auth/login');
	} else {
		//if logged in
		next();
	}
};
router.get('/', authCheck, (req, res) => {
	// console.log('look at me ',req.user);
	res.render('profile', {user: req.body.username, foodTrend: trend});
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
      res.sendStatus(500);
    });
});

router.get('/edit-profile', (req, res) => {
	res.render('edit-profile', {user: req.user});
});

<<<<<<< HEAD
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
=======
router.get('/recipe', (req, res) => {
	res.render('recipe', {user: req.user, foodTrend: trend});
>>>>>>> f59e95e9eb8d433fe253ebb5d70343986da38889
});

module.exports = router;
