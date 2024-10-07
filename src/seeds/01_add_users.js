const TABLE_NAME = 'users';

import { hashSync } from 'bcryptjs';

/**
 * Delete existing entries and seed values for users.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          username: 'admin',
          full_name: 'Administrator',
          email: 'admin@example.com',
          password: hashSync('admin', 8),
          is_admin: true
        },
        {
          username: 'user',
          full_name: 'Regular User',
          email: 'user@example.com',
          password: hashSync('user', 8)
        }
      ]);
    });
}
