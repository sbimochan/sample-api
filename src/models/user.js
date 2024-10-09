import db from '../db';
import Rent from './rent';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Get hasTimestamps.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * User has many rents.
   */
  rents() {
    return this.hasMany(Rent);
  }
}

export default User;
