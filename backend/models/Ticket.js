const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Bus = require('./Bus');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  busId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Bus,
      key: 'id'
    }
  },
  fromCity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  toCity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  seatNumbers: {
    type: DataTypes.STRING, // Store as comma-separated values
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending'
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  bookingDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Define relationships
Ticket.belongsTo(User, { foreignKey: 'userId' });
Ticket.belongsTo(Bus, { foreignKey: 'busId' });

module.exports = Ticket; 