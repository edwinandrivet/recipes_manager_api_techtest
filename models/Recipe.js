'use strict';

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('recipe', {
		category: DataTypes.STRING(),
		ingredients: DataTypes.JSONB(),
		preparation: DataTypes.STRING(),

		// We do not want multiple indentical recipes
		title: { type: DataTypes.STRING(), unique: true }
	});
};
