const { BaseModel, Document } = require('./BaseModel');

class UserDocument extends Document {
  async comparePassword(enteredPassword) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(enteredPassword, this.password);
  }

  async save() {
    const bcrypt = require('bcryptjs');
    if (this.password && !this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    return super.save();
  }
}

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get columns() {
    return [
      '_id',
      'name',
      'email',
      'password',
      'phone',
      'role',
      'addresses',
      'isBlocked',
      'resetPasswordOTP',
      'resetPasswordOTPExpires',
      'createdAt',
      'updatedAt'
    ];
  }

  static get jsonColumns() {
    return ['addresses'];
  }

  static get documentClass() {
    return UserDocument;
  }

  static async create(data) {
    const bcrypt = require('bcryptjs');
    const finalData = { ...data };
    if (finalData.password && !finalData.password.startsWith('$2a$') && !finalData.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      finalData.password = await bcrypt.hash(finalData.password, salt);
    }
    return super.create(finalData);
  }
}

module.exports = User;
