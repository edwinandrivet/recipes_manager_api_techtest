'use strict';

const Sequelize = require('sequelize');

// In order: database, username, password
const sequelize = new Sequelize('tech_test', 'tech_test', 'TECH', {
	dialect: 'postgres',
	host: 'localhost'
});

const Recipe = sequelize.import("../models/Recipe");

module.exports = [
	{ method: 'GET', path: '/', handler: function (request, reply) { reply('Main page'); } },
	{ method: 'GET', path: '/api/recipes', handler: getAllRecipes },
	{ method: 'GET', path: '/api/recipes/{title}', handler: getRecipeByName },
	{ method: 'GET', path: '/api/recipes/quicksearch/{ingredient}', handler: getRecipesByIngredient },
	{ method: 'POST', path: '/api/recipes', handler: createRecipe },
	{ method: 'DELETE', path: '/api/recipes/{id}', handler: deleteRecipe },
	{ method: 'PUT', path: '/api/recipes/{id}', handler: updateRecipe },
];

function getAllRecipes(request, reply) {
	Recipe.findAll({})
		.then(function success(recipes) {

			if (recipes === null) {
				return reply('Unable to find any recipe.');
			}

			return reply(recipes);
		}, function failure(err) {
			return reply(`${err.name}: ${err.message}`);
		});
}

function getRecipeByName(request, reply) {
	const query = {
		where: {
			title: request.params.title
		}
	};
	// Model.findOne only fails if the argument isn't of the correct type, so we return early if the recipe isn't found.
	Recipe.findOne(query)
		.then(function success(recipe) {

			if (recipe === null) {
				return reply(`Unable to find recipe ${query.where.title}`);
			}

			return reply(recipe);
		}, function failure(err) {
			return reply(`${err.name}: ${err.message}`);
		});
}

function getRecipesByIngredient(request, reply) {
	// Ugly but we need our ingredient value to be a key
	const containing = {};
	containing[request.params.ingredient] = {
		$like: "%"
	};

	Recipe.findAll({
		where: {
			ingredients: containing
		}
	})
		.then(function success(recipes) {

			return reply(recipes);

		}, function failure(err) {
			return reply(`${err.name}: ${err.message}`);
		});
}

function createRecipe(request, reply) {
	const new_recipe = request.payload;

	// We first create the Recipe table in the case it doesn't already exist.
	Recipe.sync()
		.then(function success() {

			Recipe.create(new_recipe)
				.then(function success(recipe) {

					return reply(recipe);
				}, function failure(err) {
					return reply(`${err.name}: ${err.message}`);
				});
		});
}

function deleteRecipe(request, reply) {
	Recipe.findById(request.params.id)
		.then(function success(recipe) {

			// The call only fails if the argument isn't of the correct type, so we return early if the recipe isn't found.
			if (recipe === null) {
				return reply(`Unable to find recipe of id ${request.params.id} to delete.`);
			}

			const query = {
				where: {
					id: recipe.id
				}
			};

			Recipe.destroy(query)
				.then(function success(nb_deleted) {

					return reply(`Deleted ${nb_deleted} row(s).`);

				}, function failure(err) {
					return reply(`${err.name}: ${err.message}`);
				});

		}, function failure(err) {
			return reply(`${err.name}: ${err.message}`);
		});
}

function updateRecipe(request, reply) {
	Recipe.findById(request.params.id)
	.then(function success(recipe) {

		if (recipe === null) {
			return reply(`Unable to find recipe of id ${request.params.id} to update.`);
		}

		const query = {
			where: {
				id: recipe.id
			}
		};
		Recipe.update(request.payload, query)
		.then(function success(affected_recipes) {
			return reply(`Recipes modified: ${affected_recipes}`);
		}, function failure(err) {
			reply(`${err.name}: ${err.message}`);
		});
	}, function failure(err) {
		reply(`${err.name}: ${err.message}`);
	});
}
