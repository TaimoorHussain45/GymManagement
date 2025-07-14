const express = require('express');
const { body, validationResult } = require('express-validator');
const Class = require('../models/Class');
const User = require('../models/User');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// Get all classes
router.get('/', auth, async (req, res) => {
  try {
    const { date, type, instructor, difficulty } = req.query;
    let filter = { isActive: true };

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    if (type) filter.type = type;
    if (instructor) filter.instructorId = instructor;
    if (difficulty) filter.difficulty = difficulty;

    const classes = await Class.find(filter)
      .populate('instructorId', 'name avatar')
      .populate('enrolled', 'name avatar')
      .sort({ date: 1, time: 1 });

    res.json(classes);
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single class
router.get('/:id', auth, async (req, res) => {
  try {
    const gymClass = await Class.findById(req.params.id)
      .populate('instructorId', 'name avatar bio rating')
      .populate('enrolled', 'name avatar');

    if (!gymClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(gymClass);
  } catch (error) {
    console.error('Get class error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create class (admin/trainer only)
router.post('/', [auth, checkRole(['admin', 'trainer'])], [
  body('name').notEmpty().withMessage('Class name is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('duration').isInt({ min: 15 }).withMessage('Duration must be at least 15 minutes'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('type').isIn(['cardio', 'strength', 'yoga', 'pilates', 'crossfit', 'boxing', 'swimming']).withMessage('Invalid class type'),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be non-negative')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const classData = { ...req.body };
    
    // If trainer is creating, set themselves as instructor
    if (req.userRole === 'trainer') {
      const trainer = await User.findById(req.userId);
      classData.instructorId = req.userId;
      classData.instructor = trainer.name;
    } else {
      // Admin can assign any trainer
      const trainer = await User.findById(classData.instructorId);
      if (!trainer || trainer.role !== 'trainer') {
        return res.status(400).json({ message: 'Invalid trainer assigned' });
      }
      classData.instructor = trainer.name;
    }

    const gymClass = new Class(classData);
    await gymClass.save();

    const populatedClass = await Class.findById(gymClass._id)
      .populate('instructorId', 'name avatar');

    res.status(201).json({
      message: 'Class created successfully',
      class: populatedClass
    });
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Book a class
router.post('/:id/book', auth, async (req, res) => {
  try {
    const gymClass = await Class.findById(req.params.id);
    if (!gymClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if class is full
    if (gymClass.enrolled.length >= gymClass.capacity) {
      return res.status(400).json({ message: 'Class is full' });
    }

    // Check if user is already enrolled
    if (gymClass.enrolled.includes(req.userId)) {
      return res.status(400).json({ message: 'Already enrolled in this class' });
    }

    // Check if class date is in the future
    const classDateTime = new Date(`${gymClass.date.toISOString().split('T')[0]}T${gymClass.time}`);
    if (classDateTime <= new Date()) {
      return res.status(400).json({ message: 'Cannot book past classes' });
    }

    gymClass.enrolled.push(req.userId);
    await gymClass.save();

    const updatedClass = await Class.findById(gymClass._id)
      .populate('instructorId', 'name avatar')
      .populate('enrolled', 'name avatar');

    res.json({
      message: 'Class booked successfully',
      class: updatedClass
    });
  } catch (error) {
    console.error('Book class error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.delete('/:id/book', auth, async (req, res) => {
  try {
    const gymClass = await Class.findById(req.params.id);
    if (!gymClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if user is enrolled
    if (!gymClass.enrolled.includes(req.userId)) {
      return res.status(400).json({ message: 'Not enrolled in this class' });
    }

    // Check if class is starting within 24 hours
    const classDateTime = new Date(`${gymClass.date.toISOString().split('T')[0]}T${gymClass.time}`);
    const twentyFourHoursFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    if (classDateTime <= twentyFourHoursFromNow) {
      return res.status(400).json({ message: 'Cannot cancel booking within 24 hours of class' });
    }

    gymClass.enrolled = gymClass.enrolled.filter(id => !id.equals(req.userId));
    await gymClass.save();

    const updatedClass = await Class.findById(gymClass._id)
      .populate('instructorId', 'name avatar')
      .populate('enrolled', 'name avatar');

    res.json({
      message: 'Booking cancelled successfully',
      class: updatedClass
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookings
router.get('/user/bookings', auth, async (req, res) => {
  try {
    const classes = await Class.find({ 
      enrolled: req.userId,
      isActive: true 
    })
    .populate('instructorId', 'name avatar')
    .sort({ date: 1, time: 1 });

    res.json(classes);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;