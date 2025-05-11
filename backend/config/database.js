const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'bus_ticket_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Enable logging for debugging
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      connectTimeout: 60000,
      // Enable if you're using SSL
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false
      // }
    },
    retry: {
      max: 3, // Maximum retry attempts
      match: [/Deadlock/i, /Connection lost/i] // Retry on these errors
    }
  }
);

// Test the connection with better error handling
const testConnection = async () => {
  try {
    console.log('Attempting to connect to database...');
    console.log('Database config:', {
      database: process.env.DB_NAME || 'bus_ticket_db',
      user: process.env.DB_USER || 'root',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306
    });

    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database (in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Syncing database models...');
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    if (error.original) {
      console.error('Original error:', error.original.message);
    }
    console.error('Full error:', error);
    // Exit process with failure
    process.exit(1);
  }
};

testConnection();

module.exports = sequelize; 