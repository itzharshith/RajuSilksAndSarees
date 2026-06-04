const { BaseModel } = require('./BaseModel');

class Order extends BaseModel {
  static get tableName() {
    return 'orders';
  }

  static get columns() {
    return [
      '_id',
      'user',
      'products',
      'totalAmount',
      'discountAmount',
      'taxAmount',
      'shippingCharges',
      'paymentStatus',
      'orderStatus',
      'shippingAddress',
      'paymentDetails',
      'couponApplied',
      'createdAt',
      'updatedAt'
    ];
  }

  static get jsonColumns() {
    return ['products', 'shippingAddress', 'paymentDetails'];
  }
}

module.exports = Order;
