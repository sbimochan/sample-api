import _ from 'lodash';

/**
 * Bookshelf plugin to convert snake_case to camelCase and vice versa.
 *
 * @param {Object} bookshelf - Bookshelf instance.
 * @returns {void}
 */
export function caseConverter(bookshelf) {
  bookshelf.Model = bookshelf.Model.extend({
    initialize() {
      this.on('saving', this.convertToSnakeCase);
      this.on('fetched', this.convertToCamelCase);
      this.on('fetched:collection', this.convertCollectionToCamelCase);
    },

    convertToSnakeCase(model) {
      const attrs = model.attributes;

      model.attributes = _.mapKeys(attrs, (_value, key) => _.snakeCase(key));
    },

    convertToCamelCase(model) {
      const attrs = model.attributes;

      model.attributes = _.mapKeys(attrs, (_value, key) => _.camelCase(key));
    },

    convertCollectionToCamelCase(collection) {
      collection.models.forEach((model) => {
        model.attributes = _.mapKeys(model.attributes, (_value, key) => _.camelCase(key));
      });
    }
  });
}
