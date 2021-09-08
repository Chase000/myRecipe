const router = require('koa-router')
const config = require('../../config/app');
const recipeController = require(`../../controller/${config.api.prefix}/recipeController`)

const recipeRouter = new router();

recipeRouter.get('/recipe',recipeController.show);

// useful routers

/** 
 * create a new recipe when click add button at main page.
 * @param id userId
 * @param recipeName
 * @param type
 * @param ingredients
 * @param method
 * @param picture
*/
recipeRouter.post('/recipe/:id',recipeController.insert);

/** 
 * get recipe information when contributor click edit.
 * @param id recipe id
*/
recipeRouter.get('/recipe/:id',recipeController.index);

/** 
 * update recipe information when user edit a recipe.
 * @param id recipeId
 * @param recipeName
 * @param type
 * @param ingredients
 * @param method
 * @param picture
*/
recipeRouter.put('/recipe/:id',recipeController.update);

/** 
 * delete a recipe.
 * @param id recipeId
*/
recipeRouter.delete('/recipe/:id',recipeController.delete);

// get recipe information when click picture rather than edit
recipeRouter.get('/recipeCardDetail/:id',recipeController.recipeCardDetail);

// get like or unlike status when a user see a recipe
recipeRouter.get('/getLikeStatus/:recipeId/:userId',recipeController.getLikeStatus);

//click like button to change like status
recipeRouter.put('/changeLikeStatus/:recipeId/:userId',recipeController.changeLikeStatus);

// get followRecommendation
recipeRouter.get('/followRecommendation/:id',recipeController.followRecommendation);

// get similar recipe
recipeRouter.get('/similarRecipe/:id',recipeController.similarRecipe);

// get all recipes sorted by like number
recipeRouter.get('/likeSortedRecipes',recipeController.likeSortedRecipes);

// search recipe
recipeRouter.get('/search/:items',recipeController.search);

module.exports = recipeRouter;
