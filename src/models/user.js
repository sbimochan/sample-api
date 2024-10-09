import db from '../db';
import Role from './role';

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
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   *  Relationship with the Role model (many-to-many).
   */
  roles() {
    return this.belongsToMany(Role, 'roles_to_users', 'user_id', 'role_id');
  }
}

export default User;
