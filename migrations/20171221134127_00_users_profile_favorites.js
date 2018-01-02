exports.up = function(knex, Promise) {


	return knex.schema.createTableIfNotExists('users', function(table) {
		// id(primary), email, password, username,fullname
		table.increments().primary();
		table.string('email').notNullable();
		table.string('user_name').notNullable();
		table.string('password').notNullable();
		table.string('full_name').notNullable();
	})
		.then(function() {
			return knex.schema.createTableIfNotExists('favorite_meals', function(table) {
				//id, id(primary key), dish name, dish photo, dish rating,dish recipe
				table.increments();
				table.integer('favorite_meals_id').references('users.id').onDelete('CASCADE');
				table.string('dish_name').notNullable();
				table.string('dish_photo').notNullable();
				table.float('rating', 2, 2).defaultTo(5);
				table.string('recipe');
			});
		})

		.then(function() {
			return knex.schema.createTableIfNotExists('profiles', function(table) {
				// id, id.references user id), photo-->widget, bio, favorite, contact, paytype, favorite meal
				table.increments();
				table.integer('profiles_id').references('users.id').onDelete('CASCADE');
				table.string('photo');
				table.string('bio');
				table.string('favorite_food');
				table.string('contact_info');
				table.string('payment_type');
				table.string('favorite_recipe');

			});
		});
};
exports.down = function(knex, Promise) {

	return knex.schema.dropTableIfExists('profiles')
		.then(function() {
			return knex.schema.dropTableIfExists('favorite_meals')
				.then(function() {
					return knex.schema.dropTableIfExists('users');
				});
		});

};
