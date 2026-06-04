const { BaseModel } = require('./BaseModel');

class Coupon extends BaseModel {
  static get tableName() {
    return 'coupons';
  }

  static get columns() {
    return [
      '_id',
      'code',
      'discountType',
      'discountValue',
      'expiryDate',
      'active',
      'createdAt',
      'updatedAt'
    ];
  }
}

module.exports = Coupon;
