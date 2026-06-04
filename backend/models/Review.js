const { BaseModel } = require('./BaseModel');

class Review extends BaseModel {
  static get tableName() {
    return 'reviews';
  }

  static get columns() {
    return [
      '_id',
      'user',
      'product',
      'rating',
      'comment',
      'createdAt',
      'updatedAt'
    ];
  }
}

module.exports = Review;
