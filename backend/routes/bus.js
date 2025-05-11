const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');
const Ticket = require('../models/Ticket');
const { authenticateToken } = require('../middleware/auth');

// Get all buses
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.findAll();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching buses', error: error.message });
  }
});

// Get bus by ID
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByPk(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bus', error: error.message });
  }
});

// Create a new ticket
router.post('/:id/book', authenticateToken, async (req, res) => {
  try {
    const { fromCity, toCity, departureTime, seatNumbers, totalPrice } = req.body;
    const busId = req.params.id;
    const userId = req.user.id;

    // Create ticket
    const ticket = await Ticket.create({
      userId,
      busId,
      fromCity,
      toCity,
      departureTime,
      seatNumbers,
      totalPrice,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Update bus available seats
    const bus = await Bus.findByPk(busId);
    const seatsBooked = seatNumbers.split(',').length;
    await bus.update({
      availableSeats: bus.availableSeats - seatsBooked
    });

    res.status(201).json({
      message: 'Ticket booked successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: 'Error booking ticket', error: error.message });
  }
});

// Get user's tickets
router.get('/tickets/user', authenticateToken, async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { userId: req.user.id },
      include: [Bus]
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
});

module.exports = router; 