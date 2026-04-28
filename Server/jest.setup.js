// Jest global setup (runs before each test file).
// Keep this lightweight: only set required env vars / defaults.

process.env.NODE_ENV = process.env.NODE_ENV || "test";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";

// Dummy Cloudinary credentials so `cloudinary.config(...)` doesn't receive undefineds.
process.env.CLOUD_NAME = process.env.CLOUD_NAME || "test";
process.env.CLOUD_API_KEY = process.env.CLOUD_API_KEY || "test";
process.env.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || "test";

// Use a dedicated local MongoDB database for tests.
// (Avoids mongodb-memory-server which needs to spawn a mongod process.)
process.env.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/servio_test";

