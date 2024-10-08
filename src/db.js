import knexJs from 'knex';
import bookshelf from 'bookshelf';

import knexConfig from './knexfile';

import { caseConverter } from './utils/case';

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
const db = bookshelf(knex);

db.plugin(caseConverter);

export default db;
