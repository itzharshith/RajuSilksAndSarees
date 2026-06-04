const { BaseModel } = require('./BaseModel');

class Category extends BaseModel {
  static get tableName() {
    return 'categories';
  }

  static get columns() {
    return [
      '_id',
      'name',
      'image',
      'createdAt',
      'updatedAt'
    ];
  }
}

module.exports = Category;
