const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const connectDB = require('../config/db');

const ddlQueries = [
  // 1. Users table
  `CREATE TABLE IF NOT EXISTS "users" (
    "_id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT DEFAULT 'user',
    "addresses" TEXT DEFAULT '[]',
    "isBlocked" INTEGER DEFAULT 0,
    "resetPasswordOTP" TEXT,
    "resetPasswordOTPExpires" TEXT,
    "createdAt" TEXT,
    "updatedAt" TEXT
  )`,

  // 2. Categories table
  `CREATE TABLE IF NOT EXISTS "categories" (
    "_id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TEXT,
    "updatedAt" TEXT
  )`,

  // 3. Products table
  `CREATE TABLE IF NOT EXISTS "products" (
    "_id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "images" TEXT DEFAULT '[]',
    "price" REAL DEFAULT 0,
    "stock" INTEGER DEFAULT 0,
    "discount" REAL DEFAULT 0,
    "featured" INTEGER DEFAULT 0,
    "createdAt" TEXT,
    "updatedAt" TEXT
  )`,

  // 4. Orders table
  `CREATE TABLE IF NOT EXISTS "orders" (
    "_id" TEXT PRIMARY KEY,
    "user" TEXT NOT NULL,
    "products" TEXT DEFAULT '[]',
    "totalAmount" REAL DEFAULT 0,
    "discountAmount" REAL DEFAULT 0,
    "taxAmount" REAL DEFAULT 0,
    "shippingCharges" REAL DEFAULT 0,
    "paymentStatus" TEXT DEFAULT 'Pending',
    "orderStatus" TEXT DEFAULT 'Pending',
    "shippingAddress" TEXT DEFAULT '{}',
    "paymentDetails" TEXT DEFAULT '{}',
    "couponApplied" TEXT,
    "createdAt" TEXT,
    "updatedAt" TEXT
  )`,

  // 5. Coupons table
  `CREATE TABLE IF NOT EXISTS "coupons" (
    "_id" TEXT PRIMARY KEY,
    "code" TEXT UNIQUE NOT NULL,
    "discountType" TEXT DEFAULT 'percentage',
    "discountValue" REAL DEFAULT 0,
    "expiryDate" TEXT NOT NULL,
    "active" INTEGER DEFAULT 1,
    "createdAt" TEXT,
    "updatedAt" TEXT
  )`,

  // 6. Reviews table
  `CREATE TABLE IF NOT EXISTS "reviews" (
    "_id" TEXT PRIMARY KEY,
    "user" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TEXT,
    "updatedAt" TEXT
  )`
];

const initDB = async () => {
  console.log('Initializing Turso Database Tables...');
  try {
    const client = await connectDB();
    for (const sql of ddlQueries) {
      console.log(`Executing table creation...`);
      await client.execute(sql);
    }
    console.log('All tables created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

initDB();
